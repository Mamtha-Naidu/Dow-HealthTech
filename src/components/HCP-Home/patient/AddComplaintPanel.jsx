import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Info, Activity } from 'lucide-react';

const AddComplaintPanel = ({ patient, chart, onClose, onSave, initialData }) => {
  const isEdit = !!initialData;

  // datetime stored as "DD/MM/YYYY - HH:MM AM"; convert to/from input-compatible values
  const parseDate = (dt) => {
    const part = dt?.split(' - ')[0] || '';
    if (!part) return '';
    const [d, m, y] = part.split('/');
    return (y && m && d) ? `${y}-${m}-${d}` : '';
  };
  const parseTime = (dt) => {
    const part = dt?.split(' - ')[1] || '';
    if (!part) return '';
    // convert "10:00 AM" → "10:00", "01:00 PM" → "13:00"
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
  const [title,   setTitle]   = useState(initialData?.title   || '');
  const [details, setDetails] = useState(initialData?.details || '');

  useEffect(() => {
    setDate(parseDate(initialData?.datetime));
    setTime(parseTime(initialData?.datetime));
    setTitle(initialData?.title   || '');
    setDetails(initialData?.details || '');
  }, [initialData]);

  const initials = patient.name.split(' ').map(n => n[0]).join('').slice(0, 3);
  const age = patient.dob
    ? `${new Date().getFullYear() - new Date(patient.dob).getFullYear()} yr`
    : '—';

  const handleSave = () => {
    // Format date YYYY-MM-DD → DD/MM/YYYY
    const [y, m, d] = (date || '').split('-');
    const displayDate = (y && m && d) ? `${d}/${m}/${y}` : date;
    // Format time HH:MM → HH:MM AM/PM
    let displayTime = time;
    if (time) {
      const [hStr, mStr] = time.split(':');
      let h = parseInt(hStr, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      if (h > 12) h -= 12;
      if (h === 0) h = 12;
      displayTime = `${String(h).padStart(2, '0')}:${mStr} ${ampm}`;
    }
    onSave?.({ date: displayDate, time: displayTime, title, details });
  };

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50"
      style={{ background: 'rgba(0,0,0,0.25)' }}
      onClick={onClose}
    >
      {/* Panel — 684px side peek */}
      <div
        className="absolute top-0 right-0 overflow-y-auto"
        style={{
          width: 684,
          height: '100vh',
          background: '#FFFFFF',
          border: '1px solid #EBEBEB',
          boxShadow: '0px 7px 29px rgba(100,100,111,0.2)',
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          boxSizing: 'border-box',
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* ── Title row ── */}
        <div className="flex items-center justify-between" style={{ minHeight: 24 }}>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 24,
            lineHeight: '24px', letterSpacing: '-0.01em', color: '#022145',
          }}>
            {isEdit ? 'Edit Complaint' : 'Add New Complaint'}
          </span>
          <button onClick={onClose} className="cursor-pointer hover:opacity-70 transition-opacity">
            <X size={24} color="#000000" />
          </button>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col gap-6 flex-1">

          {/* Info banner */}
          <div
            className="flex items-center gap-2.5"
            style={{
              padding: '12px 16px',
              background: 'rgba(0,110,239,0.1)',
              border: '1px solid #D3E6FC',
              borderRadius: 8,
            }}
          >
            <Info size={24} color="#0D7DC3" className="shrink-0" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, lineHeight: '14px', color: '#0D7DC3' }}>
              You can make changes within 24 hours after submission. After that, this entry is locked.
            </span>
          </div>

          {/* Form container */}
          <div className="flex flex-col gap-4">

            {/* Patient section label */}
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
              Patient
            </span>

            {/* Patient card */}
            <div
              className="flex flex-col justify-center"
              style={{ padding: 16, background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 12 }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center"
                  style={{ background: '#CFE5F3' }}
                >
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16.33,
                    lineHeight: '24px', letterSpacing: '-0.06em', color: '#0B68A2',
                  }}>
                    {initials}
                  </span>
                </div>

                {/* Details */}
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
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, lineHeight: '21px', letterSpacing: '-0.02em', color: '#0D7DC3' }}>
                        {age}
                      </span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12, lineHeight: '21px', color: '#293034' }}>
                        old
                      </span>
                    </div>
                    <span style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 700, fontSize: 14, lineHeight: '24px', color: '#022145' }}>
                      MRN: {chart.mrn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Date + Time row */}
            <div className="flex gap-4">
              {/* Date */}
              <div className="flex flex-col gap-3 flex-1">
                <label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                  Date*
                </label>
                <div
                  className="flex items-center gap-3"
                  style={{ padding: '10px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8, height: 56 }}
                >
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

              {/* Time */}
              <div className="flex flex-col gap-3 flex-1">
                <label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                  Time*
                </label>
                <div
                  className="flex items-center gap-3"
                  style={{ padding: '10px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8, height: 56 }}
                >
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

            {/* Title field */}
            <div className="flex flex-col gap-3">
              <label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                Title*
              </label>
              <div
                className="flex items-center"
                style={{ padding: '10px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8, height: 56 }}
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="flex-1 outline-none bg-transparent"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#022145' }}
                />
              </div>
            </div>

            {/* Complaint Details field */}
            <div className="flex flex-col gap-3">
              <label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                Complaint Details*
              </label>
              <div
                style={{ padding: '12px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8 }}
              >
                <textarea
                  placeholder="Details"
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  className="w-full outline-none bg-transparent resize-none"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#022145', height: 155 }}
                />
              </div>
            </div>

          </div>{/* /Form container */}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-4" style={{ height: 48 }}>
            {/* Cancel */}
            <button
              onClick={onClose}
              className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              style={{ padding: '12px 16px', background: '#E5E9EB', borderRadius: 6, height: 48, minWidth: 120 }}
            >
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#022145' }}>
                Cancel
              </span>
            </button>

            {/* Save / Update */}
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

        </div>{/* /Content */}
      </div>{/* /Panel */}
    </div>
  );
};

export default AddComplaintPanel;
