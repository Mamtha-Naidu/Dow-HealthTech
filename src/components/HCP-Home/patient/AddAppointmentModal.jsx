import React, { useState } from 'react';
import { X } from 'lucide-react';

const EMPTY = { name: '', title: '', date: '', start: '', end: '', details: '' };

const FIELDS = [
  { label: 'Patient Name',       key: 'name',    type: 'text', placeholder: 'e.g. John Doe',       required: true  },
  { label: 'Appointment Title',  key: 'title',   type: 'text', placeholder: 'e.g. General Check-up', required: true  },
  { label: 'Date',               key: 'date',    type: 'date', placeholder: '',                     required: true  },
  { label: 'Start Time',         key: 'start',   type: 'time', placeholder: '',                     required: true  },
  { label: 'End Time',           key: 'end',     type: 'time', placeholder: '',                     required: true  },
  { label: 'Details (optional)', key: 'details', type: 'text', placeholder: 'Additional notes...',  required: false },
];

/**
 * Shared "Add Appointment" modal used by HCPHome and CalendarView.
 *
 * Props:
 *   open    — boolean: whether the modal is visible
 *   onClose — () => void: called when the user cancels or closes
 *   onSave  — (appt: object) => void: called with the new appointment
 *             { id, name, title, date, start, end, details }
 */
const AddAppointmentModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState(EMPTY);

  if (!open) return null;

  const canSave = form.name && form.date && form.start && form.end;

  const handleSave = () => {
    if (!canSave) return;
    onSave({ ...form, id: Date.now(), title: form.title || 'Appointment' });
    setForm(EMPTY);
    onClose();
  };

  const handleClose = () => {
    setForm(EMPTY);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#EDEDED]">
          <h2 className="text-lg font-semibold text-[#022145]">New Appointment</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-[#292D32]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {FIELDS.map(({ label, key, type, placeholder, required }) => (
            <label key={key} className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#022145]">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
              </span>
              <input
                type={type}
                value={form[key]}
                placeholder={placeholder}
                onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                className="border border-[#EDEDED] rounded-lg px-3 py-2.5 text-sm text-[#1B1B28] focus:outline-none focus:border-[#0D7DC3] transition-colors placeholder-[#BDBDBD]"
              />
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#EDEDED]">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-lg border border-[#EDEDED] text-sm font-semibold text-[#292D32] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="px-5 py-2.5 rounded-lg bg-[#0D7DC3] text-white text-sm font-semibold hover:bg-[#0b6fad] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save Appointment
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddAppointmentModal;
