import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';

const FAMILY_MEMBERS = ['Akosua Mensah', 'Kofi Asante', 'Ama Boateng', 'Kwame Doe'];

const SERVICE_OPTIONS = [
  'Mobility Assessment',
  'Exercise Therapy',
  'Pain Management',
  'Musculoskeletal Rehabilitation',
  'Neurological Rehabilitation',
  'Post-Surgical Rehabilitation',
  'Sports Injury Recovery',
  'Occupational Therapy',
  'Balance & Coordination Training',
];

const TIME_SLOTS = [
  '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM',
];

function DropdownField({ label, options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold text-base" style={{ color: '#022145', lineHeight: '24px' }}>
        {label}
      </label>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 rounded-md border text-sm"
          style={{ border: '1px solid #E5E9EE', height: '48px', background: '#FFFFFF' }}
        >
          <span style={{ color: value ? '#022145' : '#595E65' }}>{value || placeholder || 'Select'}</span>
          <ChevronDown
            size={20}
            style={{
              color: '#292D32',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
        {open && (
          <ul
            className="absolute z-50 w-full bg-white rounded-md shadow-lg mt-1 max-h-52 overflow-y-auto"
            style={{ border: '1px solid #E5E9EE' }}
          >
            {options.map((opt) => (
              <li
                key={opt}
                onMouseDown={() => { onChange(opt); setOpen(false); }}
                className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-gray-50 text-sm"
                style={{ color: '#022145' }}
              >
                {opt}
                {value === opt && <CheckCircle size={16} style={{ color: '#00B77D' }} />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function DateField({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-3 flex-1">
      <label className="font-semibold text-base" style={{ color: '#022145', lineHeight: '24px' }}>
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 rounded-md border text-sm"
        style={{ border: '1px solid #E5E9EE', height: '48px', color: value ? '#022145' : '#595E65' }}
      />
    </div>
  );
}

export default function Rehabilitation() {
  const [formData, setFormData] = useState({
    familyMember: '',
    service: '',
    date: '',
    time: '',
    symptoms: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (val) => setFormData((prev) => ({ ...prev, [field]: val }));

  const isValid =
    formData.familyMember &&
    formData.service &&
    formData.date &&
    formData.time &&
    formData.symptoms.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ familyMember: '', service: '', date: '', time: '', symptoms: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      {submitted && (
        <div
          className="px-4 py-3 rounded-md text-sm font-medium"
          style={{ background: 'rgba(0,183,125,0.1)', color: '#00B77D', border: '1px solid #00B77D' }}
        >
          Physical therapy session scheduled successfully!
        </div>
      )}

      <div className="p-4 sm:p-8 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E3E3E3' }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h2
            className="font-semibold text-xl"
            style={{ color: '#022145', letterSpacing: '-0.02em', lineHeight: '30px' }}
          >
            Physical Therapy
          </h2>

          <div className="flex flex-col gap-4">
            <DropdownField
              label="Select Family Members*"
              options={FAMILY_MEMBERS}
              value={formData.familyMember}
              onChange={set('familyMember')}
              placeholder="Select"
            />

            <DropdownField
              label="Select Services*"
              options={SERVICE_OPTIONS}
              value={formData.service}
              onChange={set('service')}
              placeholder="e.g. Mobility Assessment, Exercise Therapy, Pain Management"
            />

            <div className="flex flex-col sm:flex-row gap-5">
              <DateField
                label="Appointment Date*"
                value={formData.date}
                onChange={set('date')}
              />
              <div className="flex flex-col gap-3 flex-1">
                <DropdownField
                  label="Appointment Time*"
                  options={TIME_SLOTS}
                  value={formData.time}
                  onChange={set('time')}
                  placeholder="e.g. 07:30 AM"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-semibold text-base" style={{ color: '#022145', lineHeight: '24px' }}>
                Describe your symptoms or reason
              </label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => set('symptoms')(e.target.value)}
                className="w-full px-4 py-4 rounded-md border text-sm resize-none"
                style={{ border: '1px solid #E5E9EE', color: '#595E65', height: '92px' }}
                placeholder="Describe your symptoms or reason for the session"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div style={{ width: '100%', height: '1px', background: '#D9D9D9' }} />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isValid}
                className="w-full sm:w-[186px]"
                style={{
                  height: '48px',
                  background: isValid ? '#00B77D' : '#A1A5B7',
                  borderRadius: '6px',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '24px',
                  cursor: isValid ? 'pointer' : 'not-allowed',
                  border: 'none',
                }}
              >
                Schedule Physical Therapy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}