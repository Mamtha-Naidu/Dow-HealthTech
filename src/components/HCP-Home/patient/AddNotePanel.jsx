import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Info, Activity } from 'lucide-react';

const AddNotePanel = ({ patient, chart, onClose, onSave, initialData }) => {
  const isEdit = !!initialData;

  const [date,    setDate]    = useState(initialData?.datetime?.split(' - ')[0] || '');
  const [time,    setTime]    = useState(initialData?.datetime?.split(' - ')[1] || '');
  const [title,   setTitle]   = useState(initialData?.title   || '');
  const [details, setDetails] = useState(initialData?.details || '');

  useEffect(() => {
    setDate(initialData?.datetime?.split(' - ')[0] || '');
    setTime(initialData?.datetime?.split(' - ')[1] || '');
    setTitle(initialData?.title   || '');
    setDetails(initialData?.details || '');
  }, [initialData]);

  const initials = patient.name.split(' ').map(n => n[0]).join('').slice(0, 3);
  const age = patient.dob
    ? `${new Date().getFullYear() - new Date(patient.dob).getFullYear()} yr`
    : '—';

  const handleSave = () => {
    onSave?.({ date, time, title, details });
  };

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50"
      style={{ background: 'rgba(0,0,0,0.25)' }}
      onClick={onClose}
    >
      {/* Panel */}
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
        <div className="flex items-center justify-between" style={{ height: 24 }}>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 24,
              lineHeight: '24px',
              letterSpacing: '-0.01em',
              color: '#022145',
            }}
          >
            {isEdit ? 'Edit Note' : 'Add New Note'}
          </span>
          <button
            onClick={onClose}
            className="flex items-center justify-center cursor-pointer hover:opacity-60 transition-opacity"
            style={{ width: 24, height: 24 }}
          >
            <X size={24} color="#000000" />
          </button>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col gap-6 flex-1">

          {/* Info banner */}
          <div
            className="flex items-center gap-3"
            style={{
              padding: '12px 16px',
              background: 'rgba(0,110,239,0.1)',
              border: '1px solid #D3E6FC',
              borderRadius: 8,
              minHeight: 57,
            }}
          >
            <Info size={24} color="#0D7DC3" className="shrink-0" />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                lineHeight: '20px',
                color: '#0D7DC3',
                flex: 1,
              }}
            >
              You can make changes within 24 hours after submission. After that, this entry is locked.
            </span>
          </div>

          {/* ── Form container ── */}
          <div className="flex flex-col gap-4 flex-1">

            {/* Patient section */}
            <div className="flex flex-col gap-3">
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: '24px',
                  letterSpacing: '-0.02em',
                  color: '#022145',
                }}
              >
                Patient
              </span>

              {/* Patient info card */}
              <div
                className="flex flex-col justify-center"
                style={{
                  padding: 16,
                  background: '#FFFFFF',
                  border: '1px solid #E1EBF5',
                  borderRadius: 12,
                  minHeight: 113,
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="shrink-0 rounded-full flex items-center justify-center"
                    style={{ width: 56, height: 56, background: '#CFE5F3' }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: 16.33,
                        lineHeight: '24px',
                        letterSpacing: '-0.06em',
                        color: '#0B68A2',
                        textAlign: 'center',
                      }}
                    >
                      {initials}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-2 flex-1">
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#293034' }}>
                      {patient.name}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Gender */}
                      <div className="flex items-center gap-1">
                        <Activity size={16} color="#677883" />
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12, lineHeight: '21px', color: '#292D32' }}>
                          {patient.gender || 'N/A'}
                        </span>
                      </div>

                      {/* Separator dot */}
                      <div className="rounded-full" style={{ width: 8, height: 8, background: '#E5E9EB' }} />

                      {/* Age */}
                      <div className="flex items-center gap-1">
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, lineHeight: '21px', letterSpacing: '-0.02em', color: '#0D7DC3' }}>
                          {age}
                        </span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12, lineHeight: '21px', color: '#293034' }}>
                          old
                        </span>
                      </div>
                    </div>

                    {/* MRN */}
                    <span style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 700, fontSize: 14, lineHeight: '24px', color: '#022145' }}>
                      MRN: {chart.mrn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Date + Time row */}
            <div className="flex items-start gap-4">
              {/* Date */}
              <div className="flex flex-col gap-3 flex-1">
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                  Date*
                </span>
                <div
                  className="flex items-center gap-3"
                  style={{ padding: '10px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8, height: 56 }}
                >
                  <Calendar size={24} color="#595E65" className="shrink-0" />
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    readOnly={false}
                    className="flex-1 outline-none bg-transparent"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#022145' }}
                  />
                </div>
              </div>

              {/* Time */}
              <div className="flex flex-col gap-3 flex-1">
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                  Time*
                </span>
                <div
                  className="flex items-center gap-3"
                  style={{ padding: '10px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8, height: 56 }}
                >
                  <Clock size={24} color="#595E65" className="shrink-0" />
                  <input
                    type="text"
                    placeholder="HH:MM AM/PM"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    readOnly={false}
                    className="flex-1 outline-none bg-transparent"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#022145' }}
                  />
                </div>
              </div>
            </div>

            {/* Title field */}
            <div className="flex flex-col gap-3">
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                Title*
              </span>
              <div
                className="flex items-center"
                style={{ padding: '10px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8, height: 56 }}
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  readOnly={false}
                  className="flex-1 outline-none bg-transparent"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: title ? '#022145' : '#888B9A' }}
                />
              </div>
            </div>

            {/* Note Details textarea */}
            <div className="flex flex-col gap-3">
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                Note Details*
              </span>
              <div
                style={{ padding: '12px 16px', background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8, height: 155 }}
              >
                <textarea
                  placeholder="Details"
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  readOnly={false}
                  className="w-full h-full outline-none bg-transparent resize-none"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: details ? '#022145' : '#888B9A' }}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-4" style={{ height: 48 }}>
              <button
                onClick={onClose}
                className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                style={{ width: 120, height: 48, background: '#E5E9EB', borderRadius: 6 }}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#022145' }}>
                  Cancel
                </span>
              </button>

              {(
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ width: 120, height: 48, background: '#0D7DC3', borderRadius: 6 }}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#FFFFFF' }}>
                    {isEdit ? 'Update' : 'Save'}
                  </span>
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNotePanel;
