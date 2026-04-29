import React, { useState } from 'react';
import { X, Calendar, Clock, Info } from 'lucide-react';

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

/* ── AddTreatmentPanel ───────────────────────────── */
const AddTreatmentPanel = ({ patient, chart, onClose, onSave, initialData }) => {
  const isEdit   = !!initialData;
  const initials = patient.name.split(' ').map(n => n[0]).join('').slice(0, 3);
  const age      = patient.dob
    ? `${new Date().getFullYear() - new Date(patient.dob).getFullYear()} yr`
    : '—';

  const [date, setDate] = useState(() => {
    if (!initialData?.datetime) return '';
    return parseDate(initialData.datetime);
  });
  const [time, setTime] = useState(() => {
    if (!initialData?.datetime) return '';
    const m = initialData.datetime.match(/- (.+)$/);
    return m ? parseTime(m[1].trim()) : '';
  });
  const [treatmentName,  setTreatmentName]  = useState(initialData?.treatmentName  || '');
  const [treatmentNotes, setTreatmentNotes] = useState(initialData?.treatmentNotes || '');
  const [followUpPlan,   setFollowUpPlan]   = useState(initialData?.followUpPlan   || '');

  const handleSave = () => {
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

    onSave({
      ...(initialData || {}),
      datetime,
      treatmentName,
      treatmentNotes,
      followUpPlan,
    });
  };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="absolute top-0 right-0 flex flex-col gap-8 overflow-y-auto"
        style={{
          width: '684px',
          height: '100vh',
          background: '#FFFFFF',
          border: '1px solid #EBEBEB',
          boxShadow: '0px 7px 29px rgba(100,100,111,0.2)',
          padding: '40px',
          boxSizing: 'border-box',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Title row ── */}
        <div className="flex items-center justify-between" style={{ height: '24px' }}>
          <span
            className="text-[24px] font-semibold text-[#022145]"
            style={{ letterSpacing: '-0.01em' }}
          >
            {isEdit ? 'Edit Treatment' : 'Add New Treatment'}
          </span>
          <button onClick={onClose} className="cursor-pointer hover:opacity-70 transition-opacity">
            <X size={24} color="#000" />
          </button>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col gap-6" style={{ flex: 1 }}>

          {/* Info banner */}
          <div
            className="flex items-center gap-3 px-4"
            style={{
              height: '57px',
              background: 'rgba(0,110,239,0.1)',
              border: '1px solid #D3E6FC',
              borderRadius: '8px',
            }}
          >
            <Info size={24} color="#006EEF" className="shrink-0" />
            <span className="text-[14px] font-medium text-[#0D7DC3] flex-1">
              You can make changes within 24 hours after submission. After that, this entry is locked.
            </span>
          </div>

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

          {/* Treatment Name */}
          <div className="flex flex-col gap-3">
            <span
              className="text-[16px] font-semibold text-[#022145]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Treatment Name*
            </span>
            <div
              className="flex items-center px-4"
              style={{
                height: '56px',
                background: '#FFFFFF',
                border: '1px solid #E1EBF5',
                borderRadius: '8px',
              }}
            >
              <input
                value={treatmentName}
                onChange={e => setTreatmentName(e.target.value)}
                placeholder="Type here..."
                className="flex-1 text-[16px] outline-none bg-transparent"
                style={{ color: '#022145' }}
              />
            </div>
          </div>

          {/* Treatment Notes */}
          <div className="flex flex-col gap-3">
            <span
              className="text-[16px] font-semibold text-[#022145]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Treatment Notes*
            </span>
            <textarea
              value={treatmentNotes}
              onChange={e => setTreatmentNotes(e.target.value)}
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

          {/* Follow-Up Plan */}
          <div className="flex flex-col gap-3">
            <span
              className="text-[16px] font-semibold text-[#022145]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Follow-Up Plan*
            </span>
            <textarea
              value={followUpPlan}
              onChange={e => setFollowUpPlan(e.target.value)}
              placeholder="Type here"
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
            <button
              onClick={onClose}
              className="flex items-center justify-center px-4 h-12 cursor-pointer hover:opacity-80 transition-opacity"
              style={{ background: '#E5E9EB', minWidth: '120px', borderRadius: '6px' }}
            >
              <span className="text-[16px] font-semibold text-[#022145]">Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center px-4 h-12 cursor-pointer hover:opacity-90 transition-opacity"
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

export default AddTreatmentPanel;
