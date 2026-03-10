import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';

/* ── Constants ───────────────────────────────────────────────── */
const REMINDER_TYPES = ['Medication', 'Appointment', 'Check-up', 'Custom'];
const FREQUENCY_OPTIONS = ['Once', 'Daily', 'Weekly', 'Custom'];
const MEMBERS = ['Akosua Mensah', 'Kofi Asante', 'Ama Boateng', 'Kwame Doe'];
const TIME_SLOTS = [
  '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM',
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM',
];
const NOTIFICATION_OPTIONS = ['Email', 'SMS', 'In-app', 'WhatsApp'];

/* ── DropdownField ───────────────────────────────────────────── */
function DropdownField({ label, required, options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
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

/* ── DateField ───────────────────────────────────────────────── */
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

/* ── NotificationCheckbox ────────────────────────────────────── */
function NotificationCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span
        onClick={onChange}
        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer"
        style={
          checked
            ? { background: '#5600E8' }
            : { border: '1px solid #9E9E9E' }
        }
      >
        {checked && (
          <span className="block w-[6px] h-[6px] rounded-full bg-white" />
        )}
      </span>
      <span className="text-base font-medium leading-[160%] text-[#051D3B]">{label}</span>
    </label>
  );
}

/* ── ServiceHours (Reminders form) ──────────────────────────── */
export default function ServiceHours() {
  const [formData, setFormData] = useState({
    reminderTitle: '',
    reminderType: '',
    date: '',
    time: '',
    repeatFrequency: '',
    endRepetition: '',
    notes: '',
    notificationMethods: [],
    assignTo: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const toggleNotification = method => {
    setFormData(prev => ({
      ...prev,
      notificationMethods: prev.notificationMethods.includes(method)
        ? prev.notificationMethods.filter(m => m !== method)
        : [...prev.notificationMethods, method],
    }));
  };

  const isValid =
    formData.reminderTitle.trim() &&
    formData.reminderType &&
    formData.date &&
    formData.time &&
    formData.repeatFrequency &&
    formData.notificationMethods.length > 0 &&
    formData.assignTo;

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        reminderTitle: '',
        reminderType: '',
        date: '',
        time: '',
        repeatFrequency: '',
        endRepetition: '',
        notes: '',
        notificationMethods: [],
        assignTo: '',
      });
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
          <span className="text-sm font-medium text-[#00B77D]">
            Reminder saved successfully!
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-6">
        <h2
          className="font-semibold text-xl leading-[30px]"
          style={{ letterSpacing: '-0.02em', color: '#022145' }}
        >
          Reminders
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

        {/* Reminder Title */}
        <div className="flex flex-col gap-3 w-full">
          <label className="font-semibold text-base leading-6 text-[#022145]">
            Reminder Title<span className="text-red-500">*</span>
          </label>
          <div className="h-12 flex items-center px-4 bg-white border border-[#E5E9EE] rounded-[6px]">
            <input
              type="text"
              value={formData.reminderTitle}
              onChange={e => set('reminderTitle', e.target.value)}
              placeholder="e.g. Take Blood Pressure Medication"
              className="flex-1 bg-transparent text-sm text-[#022145] placeholder-[#595E65] focus:outline-none"
            />
          </div>
        </div>

        {/* Type of Reminder */}
        <DropdownField
          label="Type of Reminder"
          required
          options={REMINDER_TYPES}
          value={formData.reminderType}
          onChange={v => set('reminderType', v)}
          placeholder="Medication / Appointment / Check-up / Custom"
        />

        {/* Select Date + Select Time */}
        <div className="flex flex-col sm:flex-row items-start gap-5 w-full">
          <DateField
            label="Select Date"
            required
            value={formData.date}
            onChange={v => set('date', v)}
          />
          <div className="flex-1 min-w-0">
            <DropdownField
              label="Select Time"
              required
              options={TIME_SLOTS}
              value={formData.time}
              onChange={v => set('time', v)}
              placeholder="e.g. 07:30 AM"
            />
          </div>
        </div>

        {/* Repeat Frequency */}
        <DropdownField
          label="Repeat Frequency"
          required
          options={FREQUENCY_OPTIONS}
          value={formData.repeatFrequency}
          onChange={v => set('repeatFrequency', v)}
          placeholder="Once / Daily / Weekly / Custom"
        />

        {/* End Repetition */}
        <DateField
          label="End Repetition"
          value={formData.endRepetition}
          onChange={v => set('endRepetition', v)}
        />

        {/* Notes */}
        <div className="flex flex-col gap-3 w-full">
          <label className="font-semibold text-base leading-6 text-[#022145]">
            Notes
          </label>
          <div
            className="flex items-start px-4 py-4 bg-white border border-[#E5E9EE] rounded-[6px]"
            style={{ minHeight: '92px' }}
          >
            <textarea
              value={formData.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
              className="flex-1 bg-transparent text-sm text-[#022145] placeholder-[#595E65] focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* How to receive reminder */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-base text-[#051D3B]" style={{ lineHeight: '160%' }}>
            How to receive reminder<span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap items-center gap-4 py-[10px]">
            {NOTIFICATION_OPTIONS.map(opt => (
              <NotificationCheckbox
                key={opt}
                label={opt}
                checked={formData.notificationMethods.includes(opt)}
                onChange={() => toggleNotification(opt)}
              />
            ))}
          </div>
          <span className="text-sm text-[#595E65]">Select at least one</span>
        </div>

        {/* Assign to member */}
        <DropdownField
          label="Assign to member"
          required
          options={MEMBERS}
          value={formData.assignTo}
          onChange={v => set('assignTo', v)}
          placeholder="e.g. Jane Doe"
        />

        {/* Divider + Submit */}
        <div className="flex flex-col gap-4 pt-4 w-full">
          <div className="w-full h-px bg-[#D9D9D9]" />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isValid}
              className="h-12 px-4 w-full sm:w-[131px] flex items-center justify-center rounded-[6px] font-semibold text-sm text-white transition-opacity"
              style={{
                background: isValid ? '#00B77D' : '#A1A5B7',
                cursor: isValid ? 'pointer' : 'not-allowed',
              }}
            >
              Save Reminder
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
