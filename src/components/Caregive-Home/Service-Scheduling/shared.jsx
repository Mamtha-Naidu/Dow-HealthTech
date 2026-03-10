/**
 * shared.jsx
 * Shared constants, form-field components, and layout helpers
 * used across all Service-Scheduling sub-components.
 */
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';

// ---------------------------------------------------------------------------
// Shared Data Constants
// ---------------------------------------------------------------------------
export const FAMILY_MEMBERS = [
  'Akosua Mensah',
  'Kofi Asante',
  'Ama Boateng',
  'Kwame Doe',
];

export const TIME_SLOTS = [
  '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM',
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM',
];

// ---------------------------------------------------------------------------
// DropdownField
// A labelled select-style dropdown with keyboard-aware outside-click close.
// Props:
//   label      – field label text
//   required   – appends a red asterisk when true
//   options    – string[]
//   value      – currently selected option
//   onChange   – (value: string) => void
//   placeholder – shown when no value is selected
//   className  – extra class on the root wrapper
// ---------------------------------------------------------------------------
export function DropdownField({
  label,
  required,
  options,
  value,
  onChange,
  placeholder = 'Select',
  className = '',
}) {
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
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      <label className="font-semibold text-base leading-6 text-[#022145]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div ref={ref} className="relative w-full">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`w-full h-12 flex items-center justify-between px-4 bg-white border rounded-[6px] focus:outline-none transition-colors ${
            open
              ? 'border-[#00B77D] ring-1 ring-[#00B77D]'
              : 'border-[#E5E9EE]'
          }`}
        >
          <span
            className={`text-sm leading-[21px] ${
              value ? 'text-[#022145]' : 'text-[#595E65]'
            }`}
          >
            {value || placeholder}
          </span>
          <ChevronDown
            size={24}
            className={`text-[#292D32] flex-shrink-0 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open && (
          <ul className="absolute z-50 w-full mt-1 bg-white border border-[#E5E9EE] rounded-[6px] shadow-lg max-h-52 overflow-y-auto">
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer text-sm hover:bg-[rgba(0,183,125,0.06)] transition-colors ${
                  value === opt
                    ? 'text-[#00B77D] font-medium bg-[rgba(0,183,125,0.05)]'
                    : 'text-[#022145]'
                }`}
              >
                {opt}
                {value === opt && (
                  <CheckCircle size={16} className="text-[#00B77D] flex-shrink-0" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DateField
// A labelled date-input that stretches to fill its container.
// Props:
//   label     – field label text
//   required  – appends red asterisk when true
//   value     – ISO date string (YYYY-MM-DD)
//   onChange  – (value: string) => void
//   className – extra class on root wrapper (e.g. "flex-1 min-w-0")
// ---------------------------------------------------------------------------
export function DateField({
  label,
  required,
  value,
  onChange,
  className = 'flex-1 min-w-0',
}) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <label className="font-semibold text-base leading-6 text-[#022145]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="h-12 flex items-center px-4 bg-white border border-[#E5E9EE] rounded-[6px] focus-within:border-[#00B77D] focus-within:ring-1 focus-within:ring-[#00B77D] transition-colors">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 w-full bg-transparent text-sm text-[#022145] focus:outline-none"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TextareaField
// A labelled, auto-growing textarea with consistent border/focus styles.
// Props:
//   label       – field label text
//   required    – appends red asterisk when true
//   value       – textarea value
//   onChange    – (value: string) => void
//   placeholder – placeholder text
//   rows        – number of visible rows (default 3)
//   minHeight   – CSS min-height override (default '92px')
// ---------------------------------------------------------------------------
export function TextareaField({
  label,
  required,
  value,
  onChange,
  placeholder = '',
  rows = 3,
  minHeight = '92px',
}) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="font-semibold text-base leading-6 text-[#022145]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className="flex items-start px-4 py-4 bg-white border border-[#E5E9EE] rounded-[6px] focus-within:border-[#00B77D] focus-within:ring-1 focus-within:ring-[#00B77D] transition-colors"
        style={{ minHeight }}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="flex-1 w-full bg-transparent text-sm text-[#022145] placeholder-[#595E65] focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SuccessBanner
// Green confirmation strip shown after successful form submission.
// Props:
//   message – text to display
// ---------------------------------------------------------------------------
export function SuccessBanner({ message }) {
  return (
    <div className="flex items-center gap-3 w-full px-5 py-3 bg-[rgba(0,183,125,0.1)] border border-[#00B77D] rounded-xl">
      <CheckCircle size={20} className="text-[#00B77D] flex-shrink-0" />
      <span className="text-sm font-medium text-[#00B77D]">{message}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FormCard
// White rounded card that wraps a form section.
// Props:
//   children  – form content
//   className – extra tailwind classes
// ---------------------------------------------------------------------------
export function FormCard({ children, className = '' }) {
  return (
    <div
      className={`flex flex-col gap-6 w-full bg-white rounded-2xl p-4 sm:p-8 ${className}`}
      style={{ border: '1px solid #E3E3E3' }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FormFooter
// Horizontal rule + right-aligned submit button at the bottom of a form.
// Props:
//   isValid   – enables/disables the button
//   label     – button text
//   btnClass  – extra class for width override (e.g. "sm:w-[186px]")
// ---------------------------------------------------------------------------
export function FormFooter({ isValid, label, btnClass = 'sm:w-[186px]' }) {
  return (
    <div className="flex flex-col gap-4 pt-4 w-full">
      <div className="w-full h-px bg-[#D9D9D9]" />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isValid}
          className={`h-12 w-full ${btnClass} flex items-center justify-center rounded-[6px] font-semibold text-sm text-white transition-opacity`}
          style={{
            background: isValid ? '#00B77D' : '#A1A5B7',
            cursor: isValid ? 'pointer' : 'not-allowed',
          }}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
