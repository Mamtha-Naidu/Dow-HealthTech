import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';

const FAMILY_MEMBERS = ['Akosua Mensah', 'Kofi Asante', 'Ama Boateng', 'Kwame Doe'];
const APPOINTMENT_TYPES = ['General Consultation', 'Annual Physical Exam', 'Medication Review', 'Physical Therapy', 'Preventive Screening', 'Occupational Therapy'];
const TIME_SLOTS = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

const DropdownField = ({ label, value, options, placeholder, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="flex flex-col items-start gap-3 w-full" ref={ref}>
      <label className="font-semibold text-base leading-6 text-[#022145]">{label}</label>
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`flex flex-row items-center w-full h-12 px-4 gap-2.5 bg-white border rounded-[6px] transition-colors ${
            open ? 'border-[#00B77D] ring-1 ring-[#00B77D]' : 'border-[#E5E9EE]'
          }`}
        >
          <span className={`flex-1 text-left font-normal text-sm leading-[21px] ${value ? 'text-[#022145]' : 'text-[#595E65]'}`}>
            {value || placeholder}
          </span>
          <ChevronDown size={24} className={`text-[#292D32] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <ul className="absolute z-20 top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E5E9EE] rounded-[6px] shadow-lg overflow-hidden">
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`flex items-center px-4 py-2.5 text-sm cursor-pointer hover:bg-[rgba(0,183,125,0.08)] transition-colors ${
                  value === opt ? 'text-[#00B77D] font-medium bg-[rgba(0,183,125,0.05)]' : 'text-[#595E65]'
                }`}
              >
                {opt}
                {value === opt && <CheckCircle size={14} className="ml-auto text-[#00B77D]" />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const DateField = ({ label, value, onChange }) => (
  <div className="flex flex-col items-start gap-3 flex-1 min-w-0">
    <label className="font-semibold text-base leading-6 text-[#022145]">{label}</label>
    <div className="flex flex-row items-center w-full h-12 px-4 bg-white border border-[#E5E9EE] rounded-[6px] focus-within:border-[#00B77D] focus-within:ring-1 focus-within:ring-[#00B77D] transition-colors">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full bg-transparent font-normal text-sm leading-[21px] text-[#595E65] focus:outline-none"
      />
    </div>
  </div>
);

const Appointment = () => {
  const [formData, setFormData] = useState({
    familyMember: '',
    appointmentType: '',
    date: '',
    time: '',
    symptoms: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (val) => setFormData((prev) => ({ ...prev, [key]: val }));

  const isValid =
    formData.familyMember &&
    formData.appointmentType &&
    formData.date &&
    formData.time &&
    formData.symptoms.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ familyMember: '', appointmentType: '', date: '', time: '', symptoms: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-start gap-6 w-full">
      {/* Success banner */}
      {submitted && (
        <div className="flex items-center gap-3 w-full px-5 py-3 bg-[#E8FFF3] border border-[#00B77D] rounded-xl">
          <CheckCircle size={20} className="text-[#00B77D] shrink-0" />
          <span className="text-sm font-medium text-[#022145]">Appointment booked successfully!</span>
        </div>
      )}

      {/* Book Appointment Card */}
      <div className="flex flex-col items-start w-full bg-white border border-[#E3E3E3] rounded-2xl p-4 sm:p-8 gap-6">

        {/* Card Header */}
        <div className="flex flex-row items-center w-full gap-6">
          <h2
            className="font-semibold text-[#022145]"
            style={{ fontSize: '20px', lineHeight: '30px', letterSpacing: '-0.02em' }}
          >
            Book Appointment
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-start w-full gap-4">

          {/* Select Family Members */}
          <DropdownField
            label="Select Family Members*"
            value={formData.familyMember}
            options={FAMILY_MEMBERS}
            placeholder="Select"
            onChange={set('familyMember')}
          />

          {/* Type of Appointment */}
          <DropdownField
            label="Type of Appointment*"
            value={formData.appointmentType}
            options={APPOINTMENT_TYPES}
            placeholder="Select"
            onChange={set('appointmentType')}
          />

          {/* Appointment Date + Time (side by side) */}
          <div className="flex flex-col sm:flex-row items-start w-full gap-5">
            <DateField
              label="Appointment Date*"
              value={formData.date}
              onChange={set('date')}
            />
            <div className="flex-1 min-w-0">
              <DropdownField
                label="Appointment Time*"
                value={formData.time}
                options={TIME_SLOTS}
                placeholder="Select"
                onChange={set('time')}
              />
            </div>
          </div>

          {/* Describe your symptoms or reason */}
          <div className="flex flex-col items-start w-full gap-3">
            <label className="font-semibold text-base leading-6 text-[#022145] w-full">
              Describe your symptoms or reason*
            </label>
            <div className={`flex flex-row items-start w-full bg-white border rounded-[6px] p-4 gap-4 min-h-[92px] transition-colors focus-within:border-[#00B77D] focus-within:ring-1 focus-within:ring-[#00B77D] ${
              formData.symptoms ? 'border-[#E5E9EE]' : 'border-[#E5E9EE]'
            }`}>
              <textarea
                className="flex-1 bg-transparent font-normal text-sm leading-[21px] text-[#022145] placeholder-[#595E65] focus:outline-none resize-none"
                placeholder="Describe your symptoms or reason for the appointment..."
                rows={3}
                value={formData.symptoms}
                onChange={(e) => set('symptoms')(e.target.value)}
              />
            </div>
          </div>

          {/* Divider + Submit */}
          <div className="flex flex-col items-start w-full pt-4 gap-4">
            <div className="w-full h-px bg-[#D9D9D9]" />
            <div className="flex flex-col justify-center items-end w-full gap-2">
              <button
                type="submit"
                disabled={!isValid}
                className={`flex flex-row justify-center items-center w-full sm:w-[192px] rounded-[6px] text-white font-semibold text-sm leading-6 transition-all ${
                  isValid
                    ? 'bg-[#00B77D] hover:bg-[#009d6b] cursor-pointer'
                    : 'bg-[#A1A5B7] cursor-not-allowed'
                }`}
                style={{ height: '48px', padding: '12px 16px', gap: '10px' }}
              >
                Book Appointment
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Appointment;
