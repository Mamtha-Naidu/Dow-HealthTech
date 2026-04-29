import React, { useState } from 'react';
import { X, Calendar, Clock, ChevronDown } from 'lucide-react';

/* ── Options ─────────────────────────────────────── */
const ORDER_TYPE_OPTIONS = ['Labs', 'Imaging', 'Pharmacy', 'Procedure', 'Referral'];

const ORDER_OPTIONS = {
  Labs:      ['Complete Blood Count (CBC)', 'Basic Metabolic Panel', 'Liquid Panel', 'Urinalysis', 'Lipid Panel', 'Thyroid Panel'],
  Imaging:   ['X-Ray', 'MRI', 'CT Scan', 'Ultrasound', 'Echocardiogram', 'PET Scan'],
  Pharmacy:  ['Prescription Refill', 'New Prescription', 'OTC Medication', 'IV Medication'],
  Procedure: ['Biopsy', 'IV Insertion', 'Wound Care', 'ECG', 'Lumbar Puncture'],
  Referral:  ['Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Oncology'],
};

const PRIORITY_OPTIONS = ['Routine', 'STAT', 'Timed'];

/* ── Helpers ─────────────────────────────────────── */
// "DD/MM/YYYY" → "YYYY-MM-DD"
const parseDate = (str) => {
  if (!str) return '';
  const m = str.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
};

// "HH:MM AM/PM" → "HH:MM" (24h)
const parseTime = (str) => {
  if (!str) return '';
  const m = str.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return '';
  let h = parseInt(m[1]);
  const min = m[2];
  const ap  = m[3].toUpperCase();
  if (ap === 'PM' && h < 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${min}`;
};

/* ── AddOrderPanel ───────────────────────────────── */
const AddOrderPanel = ({ patient, chart, onClose, onSave, initialData }) => {
  const isEdit   = !!initialData;
  const initials = patient.name.split(' ').map(n => n[0]).join('').slice(0, 3);
  const age      = patient.dob
    ? `${new Date().getFullYear() - new Date(patient.dob).getFullYear()} yr`
    : '—';

  /* ── Form state ── */
  const [date, setDate] = useState(() => {
    if (!initialData?.datetime) return '';
    return parseDate(initialData.datetime);
  });
  const [time, setTime] = useState(() => {
    if (!initialData?.datetime) return '';
    const m = initialData.datetime.match(/- (.+)$/);
    return m ? parseTime(m[1].trim()) : '';
  });
  const [orderType,     setOrderType]     = useState(initialData?.orderType  || '');
  const [orderTypeOpen, setOrderTypeOpen] = useState(false);
  const [order,         setOrder]         = useState(initialData?.order      || '');
  const [orderOpen,     setOrderOpen]     = useState(false);
  const [priority,      setPriority]      = useState(initialData?.priority   || 'Routine');
  const [comment,       setComment]       = useState(initialData?.comment    || '');

  const availableOrders = orderType ? (ORDER_OPTIONS[orderType] || []) : [];

  /* ── Save helper ── */
  const buildPayload = (statusOverride) => {
    let formattedDate = '';
    if (date) {
      const [y, mo, d] = date.split('-');
      formattedDate = `${d}/${mo}/${y}`;
    }
    let formattedTime = '';
    if (time) {
      const [h, m] = time.split(':').map(Number);
      const ap  = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      formattedTime = `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ap}`;
    }
    const datetime = formattedDate && formattedTime
      ? `${formattedDate} - ${formattedTime}`
      : formattedDate || '';

    return {
      ...(initialData || {}),
      datetime,
      orderType,
      order,
      priority,
      comment,
      status: statusOverride || initialData?.status || 'Submitted',
    };
  };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="absolute top-0 right-0 flex flex-col gap-8 overflow-y-auto"
        style={{
          width: '684px',
          minHeight: '100vh',
          background: '#FFFFFF',
          border: '1px solid #EBEBEB',
          boxShadow: '0px 7px 29px rgba(100,100,111,0.2)',
          padding: '40px',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Title row ── */}
        <div className="flex items-center justify-between" style={{ height: '24px' }}>
          <span
            className="text-[24px] font-semibold text-[#022145]"
            style={{ letterSpacing: '-0.01em' }}
          >
            {isEdit ? 'View Order' : 'Add New Order'}
          </span>
          <button onClick={onClose} className="cursor-pointer hover:opacity-70 transition-opacity">
            <X size={24} color="#000" />
          </button>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col gap-6" style={{ flex: 1 }}>

          {/* Patient card */}
          <div className="flex flex-col gap-3">
            <span
              className="text-[16px] font-semibold text-[#022145]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Patient
            </span>
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E1EBF5',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center"
                  style={{ background: '#CFE5F3' }}
                >
                  <span
                    className="text-[16px] font-bold text-[#0B68A2]"
                    style={{ letterSpacing: '-0.06em' }}
                  >
                    {initials}
                  </span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-[16px] font-semibold text-[#293034]">{patient.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#292D32]">{patient.gender || 'N/A'}</span>
                      <div className="w-2 h-2 rounded-full" style={{ background: '#E5E9EB' }} />
                      <span
                        className="text-[12px] font-semibold text-[#0D7DC3]"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {age}
                      </span>
                      <span className="text-[12px] text-[#293034]">old</span>
                    </div>
                  </div>
                  <span
                    className="text-[14px] font-bold text-[#022145]"
                    style={{ fontFamily: 'Manrope, Inter, sans-serif' }}
                  >
                    MRN: {chart.mrn}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Date + Time */}
          <div className="flex items-start gap-4">
            {/* Date */}
            <div className="flex flex-col gap-3 flex-1">
              <span
                className="text-[16px] font-semibold text-[#022145]"
                style={{ letterSpacing: '-0.02em' }}
              >
                Date*
              </span>
              <div
                className="flex items-center gap-3 px-4"
                style={{
                  height: '56px',
                  background: '#FFFFFF',
                  border: '1px solid #E1EBF5',
                  borderRadius: '8px',
                }}
              >
                <Calendar size={24} color="#595E65" className="shrink-0" />
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="flex-1 text-[16px] outline-none bg-transparent"
                  style={{ color: '#022145' }}
                />
              </div>
            </div>

            {/* Time */}
            <div className="flex flex-col gap-3 flex-1">
              <span
                className="text-[16px] font-semibold text-[#022145]"
                style={{ letterSpacing: '-0.02em' }}
              >
                Time*
              </span>
              <div
                className="flex items-center gap-3 px-4"
                style={{
                  height: '56px',
                  background: '#FFFFFF',
                  border: '1px solid #E1EBF5',
                  borderRadius: '8px',
                }}
              >
                <Clock size={24} color="#595E65" className="shrink-0" />
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="flex-1 text-[16px] outline-none bg-transparent"
                  style={{ color: '#022145' }}
                />
              </div>
            </div>
          </div>

          {/* Order Type dropdown */}
          <div className="flex flex-col gap-3" style={{ position: 'relative' }}>
            <span
              className="text-[16px] font-semibold text-[#022145]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Order Type*
            </span>
            <button
              className="flex items-center justify-between px-4 w-full cursor-pointer"
              style={{
                height: '56px',
                background: '#FFFFFF',
                border: '1px solid #E1EBF5',
                borderRadius: '8px',
              }}
              onClick={() => setOrderTypeOpen(o => !o)}
            >
              <span
                className="text-[16px]"
                style={{ color: orderType ? '#022145' : '#888B9A' }}
              >
                {orderType || 'Select here'}
              </span>
              <ChevronDown
                size={24}
                color="#292D32"
                style={{
                  transform: orderTypeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  flexShrink: 0,
                }}
              />
            </button>
            {orderTypeOpen && (
              <div
                className="absolute left-0 right-0 bg-white rounded-lg shadow-lg overflow-y-auto"
                style={{
                  top: '95px',
                  maxHeight: '220px',
                  border: '1px solid #E1EBF5',
                  zIndex: 20,
                }}
              >
                {ORDER_TYPE_OPTIONS.map(opt => (
                  <div
                    key={opt}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-50 text-[16px]"
                    style={{
                      color: orderType === opt ? '#0D7DC3' : '#022145',
                      fontWeight: orderType === opt ? 600 : 400,
                    }}
                    onClick={() => {
                      setOrderType(opt);
                      setOrder('');
                      setOrderTypeOpen(false);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Select Order dropdown */}
          <div className="flex flex-col gap-3" style={{ position: 'relative' }}>
            <span
              className="text-[16px] font-semibold text-[#022145]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Select Order*
            </span>
            <button
              className="flex items-center justify-between px-4 w-full cursor-pointer"
              style={{
                height: '56px',
                background: '#FFFFFF',
                border: '1px solid #E1EBF5',
                borderRadius: '8px',
                opacity: !orderType ? 0.6 : 1,
              }}
              onClick={() => orderType && setOrderOpen(o => !o)}
            >
              <span
                className="text-[16px]"
                style={{ color: order ? '#022145' : '#888B9A' }}
              >
                {order || 'Select here'}
              </span>
              <ChevronDown
                size={24}
                color="#292D32"
                style={{
                  transform: orderOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  flexShrink: 0,
                }}
              />
            </button>
            {orderOpen && availableOrders.length > 0 && (
              <div
                className="absolute left-0 right-0 bg-white rounded-lg shadow-lg overflow-y-auto"
                style={{
                  top: '95px',
                  maxHeight: '220px',
                  border: '1px solid #E1EBF5',
                  zIndex: 20,
                }}
              >
                {availableOrders.map(opt => (
                  <div
                    key={opt}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-50 text-[16px]"
                    style={{
                      color: order === opt ? '#0D7DC3' : '#022145',
                      fontWeight: order === opt ? 600 : 400,
                    }}
                    onClick={() => { setOrder(opt); setOrderOpen(false); }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Priority toggle */}
          <div className="flex flex-col gap-4">
            <span
              className="text-[16px] font-semibold text-[#022145]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Priority:
            </span>
            <div className="flex items-center gap-2">
              {PRIORITY_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setPriority(opt)}
                  className="flex-1 flex items-center justify-center h-12 cursor-pointer transition-colors"
                  style={{
                    background: priority === opt ? '#0D7DC3' : '#FFFFFF',
                    border: priority === opt ? 'none' : '1px solid #E1EBF5',
                    color: priority === opt ? '#FFFFFF' : '#554F4F',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: priority === opt ? 600 : 500,
                    borderRadius: '6px',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Comment textarea */}
          <div className="flex flex-col gap-3">
            <span
              className="text-[16px] font-semibold text-[#022145]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Add Comment (Optional)
            </span>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Details"
              className="w-full resize-none outline-none text-[16px] p-3"
              style={{
                height: '155px',
                background: '#FFFFFF',
                border: '1px solid #E1EBF5',
                borderRadius: '8px',
                color: '#022145',
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4" style={{ height: '48px' }}>
            {/* Cancel */}
            <button
              onClick={onClose}
              className="flex items-center justify-center px-4 h-12 rounded-md cursor-pointer hover:opacity-80 transition-opacity"
              style={{ background: '#E5E9EB', minWidth: '120px', borderRadius: '6px' }}
            >
              <span className="text-[16px] font-semibold text-[#022145]">Cancel</span>
            </button>

            {/* Save as Draft */}
            <button
              onClick={() => onSave(buildPayload('Draft'))}
              className="flex items-center justify-center px-4 h-12 rounded-md cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                border: '1px solid #0D7DC3',
                minWidth: '135px',
                borderRadius: '6px',
                background: '#FFFFFF',
              }}
            >
              <span className="text-[16px] font-semibold text-[#0D7DC3]">Save as Draft</span>
            </button>

            {/* Save */}
            <button
              onClick={() => onSave(buildPayload('Submitted'))}
              className="flex items-center justify-center px-4 h-12 rounded-md cursor-pointer hover:opacity-80 transition-opacity"
              style={{ background: '#0D7DC3', minWidth: '120px', borderRadius: '6px' }}
            >
              <span className="text-[16px] font-semibold text-white">Save</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddOrderPanel;
