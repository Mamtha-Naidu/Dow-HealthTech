import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const EMPTY = {
  legalName:        '',
  dob:              '',
  placeOfBirth:     '',
  motherMaidenName: '',
  sex:              '',
  nationalId:       '',
  phone:            '',
  visitDate:        '',
  status:           'Ready to Proceed',
};

const SEX_OPTIONS = ['Male', 'Female', 'Intersex'];

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_HEADERS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

/** Parse "DD/MM/YYYY" → Date | null */
const parseDate = (str) => {
  if (!str) return null;
  const parts = str.split('/').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  const [d, m, y] = parts;
  return new Date(y, m - 1, d);
};

/** Format Date → "DD/MM/YYYY" */
const fmtDate = (dt) =>
  `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}`;

/**
 * AddPatientPanel — right-side slide-in drawer for adding / editing a patient.
 *
 * Props:
 *   open    — boolean
 *   onClose — () => void
 *   onSave  — (patient: object) => void
 *   patient — object | null   (pass a patient to open in edit mode)
 */
const AddPatientPanel = ({ open, onClose, onSave, patient }) => {
  const [form,        setForm]        = useState(EMPTY);
  const [errors,      setErrors]      = useState({});
  const [calOpen,     setCalOpen]     = useState(false);
  const [calViewDate, setCalViewDate] = useState(new Date());
  const calRef = useRef(null);

  const isEdit = Boolean(patient);

  /* Populate / reset form whenever the target patient or open flag changes */
  useEffect(() => {
    if (open && patient) {
      const phoneRaw = (patient.phone || '').replace(/^\+1\s?/, '');
      setForm({
        legalName:        patient.name                || '',
        dob:              patient.dob                 || '',
        placeOfBirth:     patient.address             || '',
        motherMaidenName: patient.motherMaidenName    || '',
        sex:              patient.gender              || '',
        nationalId:       patient.nationalId          || '',
        phone:            phoneRaw,
        visitDate:        patient.visitDate           || '',
        status:           patient.status              || 'Ready to Proceed',
      });
      const parsed = parseDate(patient.dob);
      if (parsed) setCalViewDate(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
    } else if (open) {
      setForm(EMPTY);
      setCalViewDate(new Date());
    }
    setErrors({});
    setCalOpen(false);
  }, [patient, open]);

  /* Close calendar on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (calRef.current && !calRef.current.contains(e.target)) setCalOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Lock body scroll while panel is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const set = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.legalName.trim())        e.legalName        = 'Legal name is required.';
    if (!form.dob.trim())              e.dob              = 'Date of birth is required.';
    if (!form.placeOfBirth.trim())     e.placeOfBirth     = 'Place of birth is required.';
    if (!form.motherMaidenName.trim()) e.motherMaidenName = "Mother's maiden name is required.";
    if (!form.sex)                     e.sex              = 'Please select a sex.';
    if (!form.nationalId.trim() && !form.phone.trim())
      e.identifier = 'At least one identifier (National ID or Phone) is required.';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({
      id:        isEdit ? patient.id : `PT-${String(Date.now()).slice(-4)}`,
      name:      form.legalName,
      dob:       form.dob,
      gender:    form.sex,
      phone:     form.phone ? `+1 ${form.phone}` : '',
      address:   form.placeOfBirth,
      visitDate: form.visitDate || (isEdit ? patient.visitDate : '') || '',
      status:    form.status,
    });
    setForm(EMPTY);
    setErrors({});
    setCalOpen(false);
    onClose();
  };

  const handleClose = () => {
    setForm(EMPTY);
    setErrors({});
    setCalOpen(false);
    onClose();
  };

  /* ── Calendar calculations ── */
  const selectedDate  = parseDate(form.dob);
  const calYear       = calViewDate.getFullYear();
  const calMonth      = calViewDate.getMonth();
  const firstWeekDay  = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth   = new Date(calYear, calMonth + 1, 0).getDate();

  const prevMonth = () => setCalViewDate(new Date(calYear, calMonth - 1, 1));
  const nextMonth = () => setCalViewDate(new Date(calYear, calMonth + 1, 1));

  const selectDay = (day) => {
    set('dob', fmtDate(new Date(calYear, calMonth, day)));
    setCalOpen(false);
  };

  /* ── Shared styles ── */
  const inputCls = (key) =>
    `w-full border rounded-md px-3 py-2.5 text-[14px] text-[#1B1B28] outline-none placeholder-[#BDBDBD] transition-colors focus:border-[#0D7DC3] ${
      errors[key] ? 'border-red-400 bg-red-50' : 'border-[#E0E0E0] bg-white'
    }`;

  const labelCls = 'text-[13px] font-semibold text-[#022145] mb-1.5 block';

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={handleClose} />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 z-50 flex flex-col bg-white overflow-y-auto"
        style={{
          width:     'min(684px, 100vw)',
          height:    '100vh',
          padding:   40,
          gap:       32,
          border:    '1px solid #EBEBEB',
          boxShadow: '0px 7px 29px rgba(100, 100, 111, 0.2)',
        }}
      >
        {/* ── Header ── */}
        <div className="flex justify-between items-center flex-none">
          <h2 className="text-[20px] font-bold text-[#022145]">
            {isEdit ? 'Edit Patient' : 'Add New Patient'}
          </h2>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-[#292D32]" />
          </button>
        </div>

        {/* ── Form ── */}
        <div className="flex flex-col gap-5 flex-1">

          {/* Legal Name */}
          <div>
            <label className={labelCls}>
              Legal Name<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              value={form.legalName}
              placeholder="Type here.."
              onChange={e => set('legalName', e.target.value)}
              className={inputCls('legalName')}
            />
            {errors.legalName && <p className="text-xs text-red-500 mt-1">{errors.legalName}</p>}
          </div>

          {/* Date Of Birth + Place of Birth — side by side */}
          <div className="grid grid-cols-2 gap-4">

            {/* Date of Birth with calendar picker */}
            <div>
              <label className={labelCls}>
                Date Of Birth<span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative" ref={calRef}>
                {/* Trigger input */}
                <div
                  onClick={() => setCalOpen(v => !v)}
                  className={`flex items-center border rounded-md cursor-pointer transition-colors ${
                    errors.dob
                      ? 'border-red-400 bg-red-50'
                      : calOpen
                        ? 'border-[#0D7DC3] bg-white'
                        : 'border-[#E0E0E0] bg-white hover:border-[#0D7DC3]'
                  }`}
                >
                  <span className={`flex-1 px-3 py-2.5 text-[14px] select-none ${form.dob ? 'text-[#1B1B28]' : 'text-[#BDBDBD]'}`}>
                    {form.dob || 'DD/MM/YYYY'}
                  </span>
                  <span className="px-3 py-2.5 text-[#9E9E9E]">
                    <Calendar size={15} />
                  </span>
                </div>

                {/* Calendar dropdown */}
                {calOpen && (
                  <div
                    className="absolute top-full left-0 mt-1.5 z-[200] bg-white border border-[#E0E0E0] rounded-xl shadow-xl p-4"
                    style={{ width: 272 }}
                    onMouseDown={e => e.stopPropagation()}
                  >
                    {/* Month / year navigation */}
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <ChevronLeft size={15} className="text-[#374151]" />
                      </button>
                      <span className="text-[14px] font-semibold text-[#022145]">
                        {MONTHS[calMonth]} {calYear}
                      </span>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <ChevronRight size={15} className="text-[#374151]" />
                      </button>
                    </div>

                    {/* Day-of-week headers */}
                    <div className="grid grid-cols-7 mb-1">
                      {DAY_HEADERS.map(d => (
                        <div key={d} className="text-center text-[11px] font-semibold text-[#9E9E9E] py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-y-0.5">
                      {Array.from({ length: firstWeekDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const isSel =
                          selectedDate &&
                          selectedDate.getFullYear() === calYear &&
                          selectedDate.getMonth()    === calMonth &&
                          selectedDate.getDate()     === day;
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => selectDay(day)}
                            className={`h-8 flex items-center justify-center text-[13px] rounded-full transition-colors ${
                              isSel
                                ? 'bg-[#0D7DC3] text-white font-semibold'
                                : 'text-[#374151] hover:bg-[#0D7DC3]/10 hover:text-[#0D7DC3]'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob}</p>}
            </div>

            {/* Place of Birth */}
            <div>
              <label className={labelCls}>
                Place of Birth<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                value={form.placeOfBirth}
                placeholder="Type here.."
                onChange={e => set('placeOfBirth', e.target.value)}
                className={inputCls('placeOfBirth')}
              />
              {errors.placeOfBirth && <p className="text-xs text-red-500 mt-1">{errors.placeOfBirth}</p>}
            </div>
          </div>

          {/* Mother's Maiden Name */}
          <div>
            <label className={labelCls}>
              Mother's Maiden Name<span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              value={form.motherMaidenName}
              placeholder="Type here.."
              onChange={e => set('motherMaidenName', e.target.value)}
              className={inputCls('motherMaidenName')}
            />
            {errors.motherMaidenName && <p className="text-xs text-red-500 mt-1">{errors.motherMaidenName}</p>}
          </div>

          {/* Sex (Biological) — checkboxes */}
          <div>
            <label className={labelCls}>
              Sex (Biological)<span className="text-red-500 ml-0.5">*</span>
            </label>
            <div className="flex items-center gap-6">
              {SEX_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={() => set('sex', opt)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      form.sex === opt
                        ? 'border-[#0D7DC3] bg-[#0D7DC3]'
                        : 'border-[#C4C4C4] bg-white'
                    }`}
                  >
                    {form.sex === opt && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span onClick={() => set('sex', opt)} className="text-[14px] text-[#374151]">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
            {errors.sex && <p className="text-xs text-red-500 mt-1">{errors.sex}</p>}
          </div>

          {/* Identifier note */}
          <div>
            <p className="text-[13px] font-medium text-[#022145]">
              One Identifier Required ID or Phone number
            </p>
            {errors.identifier && <p className="text-xs text-red-500 mt-1">{errors.identifier}</p>}
          </div>

          {/* National ID */}
          <div>
            <label className={labelCls}>National ID</label>
            <input
              type="text"
              value={form.nationalId}
              placeholder="Type here.."
              onChange={e => set('nationalId', e.target.value)}
              className={inputCls('nationalId')}
            />
          </div>

          {/* Phone Number with +1 prefix */}
          <div>
            <label className={labelCls}>Phone Number</label>
            <div className={`flex items-center border rounded-md overflow-hidden transition-colors focus-within:border-[#0D7DC3] ${
              errors.identifier ? 'border-red-400 bg-red-50' : 'border-[#E0E0E0]'
            }`}>
              <span className="px-3 py-2.5 text-[14px] text-[#374151] bg-[#F5F5F5] border-r border-[#E0E0E0] select-none whitespace-nowrap">
                +1
              </span>
              <input
                type="tel"
                value={form.phone}
                placeholder="Type here.."
                onChange={e => set('phone', e.target.value)}
                className="flex-1 px-3 py-2.5 text-[14px] text-[#1B1B28] bg-white outline-none placeholder-[#BDBDBD]"
              />
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div className="flex justify-end gap-3 flex-none pt-4 border-t border-[#EBEBEB]">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-lg border border-[#E0E0E0] text-[14px] font-medium text-[#374151] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2.5 rounded-lg bg-[#0D7DC3] text-white text-[14px] font-semibold hover:bg-[#0b6fad] transition-colors"
          >
            {isEdit ? 'Save Changes' : 'Add Patient'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPatientPanel;
