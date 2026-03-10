import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';

/*  Constants  */
const FAMILY_MEMBERS = ['Akosua Mensah', 'Kofi Asante', 'Ama Boateng', 'Kwame Doe'];
const SERVICE_OPTIONS = [
  'Personal Care & Hygiene Assistance',
  'Medication Administration',
  'Wound Dressing & Care',
  'Mobility Assistance',
  'Meal Preparation & Nutrition',
  'Companionship & Social Care',
  'Post-Hospital Recovery Care',
  'Palliative & End-of-Life Care',
];
const TIME_SLOTS = [
  '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM',
];

/*  DropdownField  */
function DropdownField({ label, required, options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="font-semibold text-base leading-6 text-[#022145]">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <div ref={ref} className="relative w-full">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full h-12 flex items-center justify-between px-4 bg-white border border-[#E5E9EE] rounded-[6px] focus:outline-none"
        >
          <span className={`text-sm leading-[21px] ${value ? 'text-[#022145]' : 'text-[#595E65]'}`}>
            {value || placeholder}
          </span>
          <ChevronDown
            size={24}
            className={`text-[#292D32] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open && (
          <ul className="absolute z-50 w-full mt-1 bg-white border border-[#E5E9EE] rounded-[6px] shadow-lg max-h-52 overflow-y-auto">
            {options.map(opt => (
              <li
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className="flex items-center justify-between px-4 py-3 hover:bg-[rgba(0,183,125,0.06)] cursor-pointer text-sm text-[#022145]"
              >
                {opt}
                {value === opt && <CheckCircle size={16} className="text-[#00B77D]" />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/*  DateField  */
function DateField({ label, required, value, onChange }) {
  return (
    <div className="flex flex-col gap-3 flex-1 min-w-0">
      <label className="font-semibold text-base leading-6 text-[#022145]">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <div className="h-12 flex items-center gap-4 px-4 bg-white border border-[#E5E9EE] rounded-[6px]">
        <input
          type="date"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 w-full bg-transparent text-sm text-[#022145] focus:outline-none"
        />
      </div>
    </div>
  );
}

/*  HomeCare  */
export default function HomeCare() {
  const [formData, setFormData] = useState({
    familyMember: '',
    service: '',
    date: '',
    time: '',
    symptoms: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const isValid =
    formData.familyMember &&
    formData.service &&
    formData.date &&
    formData.time &&
    formData.symptoms.trim();

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ familyMember: '', service: '', date: '', time: '', symptoms: '' });
    }, 3000);
  };

  return (
    <div
      className="flex flex-col gap-6 w-full bg-white rounded-2xl p-4 sm:p-8"
      style={{ border: '1px solid #E3E3E3' }}
    >
      {/* Success banner */}
      {submitted && (
        <div className="flex items-center gap-3 px-4 py-3 bg-[rgba(0,183,125,0.1)] border border-[#00B77D] rounded-[6px]">
          <CheckCircle size={20} className="text-[#00B77D] flex-shrink-0" />
          <span className="text-sm font-medium text-[#00B77D]">Home care visit scheduled successfully!</span>
        </div>
      )}

      {/* Section title */}
      <h2
        className="font-semibold text-xl leading-[30px] text-[#022145]"
        style={{ letterSpacing: '-0.02em' }}
      >
        Home Care
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

        {/* Select Family Members */}
        <DropdownField
          label="Select Family Members"
          required
          options={FAMILY_MEMBERS}
          value={formData.familyMember}
          onChange={v => set('familyMember', v)}
          placeholder="Select"
        />

        {/* Select Services */}
        <DropdownField
          label="Select Services"
          required
          options={SERVICE_OPTIONS}
          value={formData.service}
          onChange={v => set('service', v)}
          placeholder="e.g. Personal Care, Medication Administration, Wound Care"
        />

        {/* Appointment Date + Appointment Time */}
        <div className="flex flex-col sm:flex-row items-start gap-5 w-full">
          <DateField
            label="Appointment Date"
            required
            value={formData.date}
            onChange={v => set('date', v)}
          />
          <div className="flex-1 min-w-0">
            <DropdownField
              label="Appointment Time"
              required
              options={TIME_SLOTS}
              value={formData.time}
              onChange={v => set('time', v)}
              placeholder="e.g. 07:30 AM"
            />
          </div>
        </div>

        {/* Describe symptoms */}
        <div className="flex flex-col gap-3 w-full">
          <label className="font-semibold text-base leading-6 text-[#022145]">
            Describe your symptoms or reason
          </label>
          <div
            className="flex items-start px-4 py-4 bg-white border border-[#E5E9EE] rounded-[6px]"
            style={{ minHeight: '92px' }}
          >
            <textarea
              value={formData.symptoms}
              onChange={e => set('symptoms', e.target.value)}
              placeholder="Describe your symptoms or reason for the appointment..."
              rows={3}
              className="flex-1 bg-transparent text-sm text-[#022145] placeholder-[#595E65] focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Divider + Submit */}
        <div className="flex flex-col gap-4 pt-2">
          <div className="w-full h-px bg-[#D9D9D9]" />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isValid}
              className="h-12 w-full sm:w-[186px] flex items-center justify-center rounded-[6px] font-semibold text-sm text-white transition-opacity"
              style={{
                background: isValid ? '#00B77D' : '#A1A5B7',
                cursor: isValid ? 'pointer' : 'not-allowed',
              }}
            >
              Schedule Home Care
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}