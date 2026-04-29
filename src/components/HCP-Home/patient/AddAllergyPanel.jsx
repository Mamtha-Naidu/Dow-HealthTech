import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Activity, ChevronDown } from 'lucide-react';

const ALLERGY_OPTIONS = [
  'Peanut', 'Penicillin', 'Seafood', 'Dust', 'Lactose',
  'Pollen', 'Latex', 'Mold', 'Bee Sting', 'Aspirin', 'Other',
];

const AddAllergyPanel = ({ patient, chart, onClose, onSave, initialData }) => {
  const isEdit = !!initialData;

  // datetime stored as "DD/MM/YYYY - HH:MM AM"
  const parseDate = (dt) => {
    const part = dt?.split(' - ')[0] || '';
    if (!part) return '';
    const [d, m, y] = part.split('/');
    return (y && m && d) ? `${y}-${m}-${d}` : '';
  };
  const parseTime = (dt) => {
    const part = dt?.split(' - ')[1] || '';
    if (!part) return '';
    const match = part.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return part.substring(0, 5);
    let h = parseInt(match[1], 10);
    const mins = match[2];
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${mins}`;
  };

  const [date,    setDate]    = useState(parseDate(initialData?.datetime));
  const [time,    setTime]    = useState(parseTime(initialData?.datetime));
  const [allergy, setAllergy] = useState(initialData?.allergy  || '');
  const [details, setDetails] = useState(initialData?.details  || '');
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    setDate(parseDate(initialData?.datetime));
    setTime(parseTime(initialData?.datetime));
    setAllergy(initialData?.allergy  || '');
    setDetails(initialData?.details  || '');
  }, [initialData]);

  const initials = patient.name.split(' ').map(n => n[0]).join('').slice(0, 3);
  const age = patient.dob
    ? `${new Date().getFullYear() - new Date(patient.dob).getFullYear()} yr`
    : '—';

  const handleSave = () => {
    const [y, m, d] = (date || '').split('-');
    const displayDate = (y && m && d) ? `${d}/${m}/${y}` : date;
    let displayTime = time;
    if (time) {
      const [hStr, mStr] = time.split(':');
      let h = parseInt(hStr, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      if (h > 12) h -= 12;
      if (h === 0) h = 12;
      displayTime = `${String(h).padStart(2, '0')}:${mStr} ${ampm}`;
    }
    onSave?.({ date: displayDate, time: displayTime, allergy, details });
  };

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ background: 'rgba(0,0,0,0.25)' }}
      onClick={onClose}
    >
      <div
        className="absolute top-0 right-0 overflow-y-auto"
        style={{
          width: 684, height: '100vh',
          background: '#FFFFFF', border: '1px solid #EBEBEB',
          boxShadow: '0px 7px 29px rgba(100,100,111,0.2)',
          padding: 40, display: 'flex', flexDirection: 'column',
          gap: 32, boxSizing: 'border-box',
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* Title row */}
        <div className="flex items-center justify-between" style={{ minHeight: 24 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 24, lineHeight: '24px', letterSpacing: '-0.01em', color: '#022145' }}>
            {isEdit ? 'Edit Allergy' : 'Add New Allergy'}
          </span>
          <button onClick={onClose} className="cursor-pointer hover:opacity-70 transition-opacity">
            <X size={24} color="#000000" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 flex-1">

          {/* Form container */}
          <div className="flex flex-col gap-4">

            {/* Patient label */}
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
              Patient
            </span>

            {/* Patient card */}
            <div
              className="flex flex-col justify-center"
              style={{ padding: 16, background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 12 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center" style={{ background: '#CFE5F3' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16.33, lineHeight: '24px', letterSpacing: '-0.06em', color: '#0B68A2' }}>
                    {initials}
                  </span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#293034' }}>
                    {patient.name}
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Activity size={16} color="#677883" />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12, lineHeight: '21px', color: '#292D32' }}>
                        {patient.gender || 'N/A'}
                      </span>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{ background: '#E5E9EB' }} />
                    <div className="flex items-center gap-1">
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, lineHeight: '21px', letterSpacing: '-0.02em', color: '#0D7DC3' }}>{age}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12, lineHeight: '21px', color: '#293034' }}>old</span>
                    </div>
                    <span style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 700, fontSize: 14, lineHeight: '24px', color: '#022145' }}>
                      MRN: {chart.mrn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Date + Time */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>Date*</label>
                <div className="flex items-center gap-3" style={{ padding: '10px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8, height: 56 }}>
                  <Calendar size={24} color="#595E65" className="shrink-0" />
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="flex-1 outline-none bg-transparent cursor-pointer"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: date ? '#022145' : '#888B9A' }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>Time*</label>
                <div className="flex items-center gap-3" style={{ padding: '10px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8, height: 56 }}>
                  <Clock size={24} color="#595E65" className="shrink-0" />
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="flex-1 outline-none bg-transparent cursor-pointer"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: time ? '#022145' : '#888B9A' }}
                  />
                </div>
              </div>
            </div>

            {/* Select Allergies dropdown */}
            <div className="flex flex-col gap-3">
              <label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                Select Allergies*
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropOpen(o => !o)}
                  className="w-full flex items-center justify-between cursor-pointer"
                  style={{ padding: '10px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8, height: 56 }}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: allergy ? '#022145' : '#888B9A' }}>
                    {allergy || 'Select an allergy'}
                  </span>
                  <ChevronDown size={24} color="#292D32" className={`transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropOpen && (
                  <div
                    className="absolute left-0 right-0 z-10 overflow-y-auto"
                    style={{ top: 60, background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8, boxShadow: '0px 4px 16px rgba(0,0,0,0.1)', maxHeight: 220 }}
                  >
                    {ALLERGY_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { setAllergy(opt); setDropOpen(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-[#F6F6F6] transition-colors cursor-pointer"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: opt === allergy ? '#0D7DC3' : '#022145' }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Allergy Details textarea */}
            <div className="flex flex-col gap-3">
              <label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                Allergies Details*
              </label>
              <div style={{ padding: '12px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8 }}>
                <textarea
                  placeholder="Details"
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  className="w-full outline-none bg-transparent resize-none"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#022145', height: 155 }}
                />
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-4" style={{ height: 48 }}>
            <button
              onClick={onClose}
              className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              style={{ padding: '12px 16px', background: '#E5E9EB', borderRadius: 6, height: 48, minWidth: 120 }}
            >
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#022145' }}>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
              style={{ padding: '12px 16px', background: '#0D7DC3', borderRadius: 6, height: 48, minWidth: 120 }}
            >
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#FFFFFF' }}>
                {isEdit ? 'Update' : 'Save'}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddAllergyPanel;
