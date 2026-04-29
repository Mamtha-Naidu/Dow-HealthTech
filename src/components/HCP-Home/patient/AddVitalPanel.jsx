import React, { useState } from 'react';
import { X, Calendar, Clock, Info } from 'lucide-react';

/* ── Field row: label + input + unit + clear ─────── */
const VitalField = ({ label, value, unit, onChange, onClear, placeholder = '' }) => (
  <div className="flex flex-col" style={{ gap: '16px', width: '604px' }}>
    <span
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '18px',
        lineHeight: '27px',
        letterSpacing: '-0.02em',
        color: '#022145',
      }}
    >
      {label}
    </span>
    <div className="flex items-center" style={{ gap: '12px', height: '40px' }}>
      {/* Value input */}
      <div
        className="flex items-center justify-center px-4"
        style={{
          width: '72px',
          height: '40px',
          border: '1px solid #E1EBF5',
          borderRadius: '6px',
          boxSizing: 'border-box',
        }}
      >
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full outline-none bg-transparent text-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '24px',
            color: '#292D32',
          }}
        />
      </div>
      {/* Unit label */}
      <span
        style={{
          flex: 1,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '24px',
          color: '#292D32',
        }}
      >
        {unit}
      </span>
      {/* Clear button */}
      <button
        onClick={onClear}
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        style={{
          padding: '12px 16px',
          width: '88px',
          height: '40px',
          background: '#E5E9EB',
          borderRadius: '56px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '24px',
          color: '#292D32',
          whiteSpace: 'nowrap',
        }}
      >
        Clear
      </button>
    </div>
  </div>
);

/* ── Blood Pressure field (two inputs + slash) ─────── */
const BPField = ({ systolic, diastolic, onChangeSystolic, onChangeDiastolic, onClear }) => (
  <div className="flex flex-col" style={{ gap: '16px', width: '604px' }}>
    <span
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '18px',
        lineHeight: '27px',
        letterSpacing: '-0.02em',
        color: '#022145',
      }}
    >
      Blood Pressure
    </span>
    <div className="flex items-center" style={{ gap: '12px', height: '40px' }}>
      {/* Systolic / Diastolic inputs */}
      <div
        className="flex items-center"
        style={{ border: '1px solid #E1EBF5', boxSizing: 'border-box' }}
      >
        <div
          className="flex items-center justify-center px-4"
          style={{ width: '72px', height: '40px', border: '1px solid #D5D5D5', borderRadius: '6px' }}
        >
          <input
            type="text"
            value={systolic}
            onChange={e => onChangeSystolic(e.target.value)}
            placeholder="120"
            className="w-full outline-none bg-transparent text-center"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: '#292D32' }}
          />
        </div>
        <span style={{ padding: '0 6px', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '20px', color: '#A4A3A3' }}>/</span>
        <div
          className="flex items-center justify-center px-4"
          style={{ width: '72px', height: '40px', border: '1px solid #D5D5D5', borderRadius: '6px' }}
        >
          <input
            type="text"
            value={diastolic}
            onChange={e => onChangeDiastolic(e.target.value)}
            placeholder="80"
            className="w-full outline-none bg-transparent text-center"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: '#292D32' }}
          />
        </div>
      </div>
      {/* Unit */}
      <span style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: '#292D32' }}>
        mmHg
      </span>
      {/* Clear */}
      <button
        onClick={onClear}
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        style={{
          padding: '12px 16px',
          width: '88px',
          height: '40px',
          background: '#E5E9EB',
          borderRadius: '56px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          color: '#292D32',
        }}
      >
        Clear
      </button>
    </div>
  </div>
);

/* ── AddVitalPanel ───────────────────────────────── */
const AddVitalPanel = ({ patient, onClose, onSave, initialData }) => {
  const isEdit = !!initialData;

  // Parse bp string "120/90" into parts
  const parseBP = (bp = '') => { const [s = '', d = ''] = bp.split('/'); return { s, d }; };
  const { s: initSys, d: initDia } = parseBP(initialData?.bp);

  const [date,       setDate]       = useState(initialData?.date    || '');
  const [time,       setTime]       = useState(initialData?.time    || '');
  const [systolic,   setSystolic]   = useState(initSys);
  const [diastolic,  setDiastolic]  = useState(initDia);
  const [pulse,      setPulse]      = useState(initialData?.hr      || '');
  const [temp,       setTemp]       = useState(initialData?.temp    || '');
  const [respRate,   setRespRate]   = useState(initialData?.respRate|| '');
  const [spo2,       setSpo2]       = useState(initialData?.spo2    || '');
  const [pain,       setPain]       = useState(initialData?.pain    || '');

  const initials = patient
    ? patient.name.split(' ').map(n => n[0]).join('').slice(0, 3)
    : 'A.W';
  const age = patient?.dob
    ? `${new Date().getFullYear() - new Date(patient.dob).getFullYear()} yrs`
    : '—';

  const handleSave = () => {
    onSave?.({ date, time, systolic, diastolic, pulse, temp, respRate, spo2, pain });
  };

  return (
    /* ── Overlay ── */
    <div
      className="fixed inset-0 z-50"
      style={{ background: 'rgba(0,0,0,0.3)' }}
      onClick={onClose}
    >
      {/* ── Side Peek panel ── */}
      <div
        className="absolute top-0 right-0 overflow-y-auto"
        style={{
          width: '684px',
          height: '100vh',
          background: '#FFFFFF',
          border: '1px solid #EBEBEB',
          boxShadow: '0px 7px 29px rgba(100, 100, 111, 0.2)',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          boxSizing: 'border-box',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Title row ── */}
        <div className="flex items-center justify-between" style={{ width: '604px' }}>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '24px',
              letterSpacing: '-0.01em',
              color: '#022145',
            }}
          >
            {isEdit ? 'Edit Vital' : 'Add New Vital'}
          </span>
          <button
            onClick={onClose}
            className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
            style={{ width: '24px', height: '24px' }}
          >
            <X size={20} color="#000000" />
          </button>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col items-end" style={{ gap: '24px', width: '604px', flex: 1 }}>

          {/* Info banner */}
          <div
            className="flex items-center"
            style={{
              width: '604px',
              padding: '12px 16px',
              gap: '10px',
              background: 'rgba(0, 110, 239, 0.1)',
              border: '1px solid #D3E6FC',
              borderRadius: '8px',
              boxSizing: 'border-box',
            }}
          >
            <Info size={24} color="#0D7DC3" className="shrink-0" />
            <span
              style={{
                flex: 1,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '14px',
                color: '#0D7DC3',
              }}
            >
              You can make changes within 24 hours after submission. After that, this entry is locked.
            </span>
          </div>

          {/* ── Form Container ── */}
          <div className="flex flex-col items-end" style={{ gap: '16px', width: '604px', flex: 1 }}>

            {/* Patient info */}
            <div className="flex flex-col" style={{ gap: '12px', width: '604px' }}>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '-0.02em',
                  color: '#022145',
                }}
              >
                Patient
              </span>
              <div
                style={{
                  width: '604px',
                  padding: '16px',
                  background: '#FFFFFF',
                  border: '1px solid #E1EBF5',
                  borderRadius: '12px',
                  boxSizing: 'border-box',
                }}
              >
                <div className="flex items-center" style={{ gap: '12px' }}>
                  {/* Avatar */}
                  <div
                    className="flex items-center justify-center shrink-0 rounded-full"
                    style={{ width: '56px', height: '56px', background: '#CFE5F3' }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '16px',
                        letterSpacing: '-0.06em',
                        color: '#0B68A2',
                      }}
                    >
                      {initials}
                    </span>
                  </div>
                  {/* Details */}
                  <div className="flex flex-col" style={{ gap: '8px', flex: 1 }}>
                    <div className="flex flex-col" style={{ gap: '4px' }}>
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          fontSize: '16px',
                          lineHeight: '24px',
                          color: '#293034',
                        }}
                      >
                        {patient?.name || 'Patient Name'}
                      </span>
                      {/* Demographics row */}
                      <div className="flex items-center" style={{ gap: '8px' }}>
                        <div className="flex items-center" style={{ gap: '4px' }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="6" cy="10" r="4" stroke="#0D7DC3" strokeWidth="1.5"/>
                            <path d="M10.5 5.5L13 3M13 3H11M13 3V5" stroke="#0D7DC3" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#292D32' }}>
                            {patient?.gender || 'Male'}
                          </span>
                        </div>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E5E9EB' }} />
                        <div className="flex items-center" style={{ gap: '4px' }}>
                          <span
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: 600,
                              fontSize: '12px',
                              letterSpacing: '-0.02em',
                              color: '#0D7DC3',
                            }}
                          >
                            {age}
                          </span>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#293034' }}>old</span>
                        </div>
                      </div>
                    </div>
                    {/* MRN */}
                    <span
                      style={{
                        fontFamily: 'Manrope, Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '14px',
                        lineHeight: '24px',
                        color: '#022145',
                      }}
                    >
                      MRN: {patient?.mrn || '—'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time row */}
            <div className="flex items-start" style={{ gap: '16px', width: '604px' }}>
              {/* Date */}
              <div className="flex flex-col" style={{ gap: '12px', flex: 1 }}>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '-0.02em',
                    color: '#022145',
                  }}
                >
                  Date*
                </span>
                <div
                  className="flex items-center"
                  style={{
                    padding: '10px 16px',
                    gap: '12px',
                    height: '56px',
                    background: '#FFFFFF',
                    border: '1px solid #E1EBF5',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                  }}
                >
                  <Calendar size={24} color="#595E65" className="shrink-0" />
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="flex-1 outline-none bg-transparent"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#022145',
                    }}
                  />
                </div>
              </div>
              {/* Time */}
              <div className="flex flex-col" style={{ gap: '12px', flex: 1 }}>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '-0.02em',
                    color: '#022145',
                  }}
                >
                  Time*
                </span>
                <div
                  className="flex items-center"
                  style={{
                    padding: '10px 16px',
                    gap: '12px',
                    height: '56px',
                    background: '#FFFFFF',
                    border: '1px solid #E1EBF5',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                  }}
                >
                  <Clock size={24} color="#595E65" className="shrink-0" />
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="flex-1 outline-none bg-transparent"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#022145',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Vital fields */}
            <BPField
              systolic={systolic}
              diastolic={diastolic}
              onChangeSystolic={setSystolic}
              onChangeDiastolic={setDiastolic}
              onClear={() => { setSystolic(''); setDiastolic(''); }}
            />
            <VitalField
              label="Pulse"
              value={pulse}
              unit="bpm"
              onChange={setPulse}
              onClear={() => setPulse('')}
              placeholder="72"
            />
            <VitalField
              label="Temperature"
              value={temp}
              unit="°F"
              onChange={setTemp}
              onClear={() => setTemp('')}
              placeholder="98.6"
            />
            <VitalField
              label="Respiratory Rate"
              value={respRate}
              unit="breaths/min"
              onChange={setRespRate}
              onClear={() => setRespRate('')}
              placeholder="16"
            />
            <VitalField
              label="SpO2"
              value={spo2}
              unit="%"
              onChange={setSpo2}
              onClear={() => setSpo2('')}
              placeholder="98"
            />
            <VitalField
              label="Pain Level (0-10)"
              value={pain}
              unit=""
              onChange={setPain}
              onClear={() => setPain('')}
              placeholder="0"
            />

            {/* Action buttons */}
            <div
              className="flex items-center justify-end"
              style={{ gap: '16px', width: '604px', height: '48px' }}
            >
              {/* Cancel */}
              <button
                onClick={onClose}
                className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  padding: '12px 16px',
                  width: '120px',
                  height: '48px',
                  background: '#E5E9EB',
                  borderRadius: '6px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#022145',
                }}
              >
                Cancel
              </button>
              {/* Save */}
              <button
                onClick={handleSave}
                className="flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                style={{
                  padding: '12px 16px',
                  width: '120px',
                  height: '48px',
                  background: '#0D7DC3',
                  borderRadius: '6px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#FFFFFF',
                }}
              >
                {isEdit ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVitalPanel;
