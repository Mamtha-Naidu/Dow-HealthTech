import React, { useState } from 'react';
import { 
  ChevronDown, 
  X,
  Pill
} from 'lucide-react';

// Patient Selector Component
const PatientSelector = ({ selectedPatient, patients, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 w-full relative">
      <label className="text-base font-medium tracking-wider text-[#022145]">
        Select Family Member
      </label>
      <div 
        className="flex items-center justify-between px-4 py-3 bg-white border border-[#E3E3E3] rounded-lg cursor-pointer hover:border-[#00B77D] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base text-[#1B1B28]">{selectedPatient?.name || 'Select member'}</span>
        <ChevronDown size={20} className="text-[#0A0A0A]" />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-[#E3E3E3] rounded-lg shadow-lg z-10 mt-1">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="px-4 py-3 hover:bg-[#00B77D]/10 cursor-pointer"
              onClick={() => {
                onChange(patient);
                setIsOpen(false);
              }}
            >
              {patient.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Medication Reminder Banner Component
const MedicationReminderBanner = ({ title, message, subInfo, onDismiss }) => {
  return (
    <div className="flex flex-col p-4 sm:p-6 gap-4 bg-[#FBF4EA] border-l-4 border-[#F1950A] rounded-xl">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-[#F1950A]">{title}</span>
          {onDismiss && (
            <button 
              onClick={onDismiss}
              className="text-[#022145] hover:opacity-70 transition-opacity cursor-pointer"
            >
              <X size={24} />
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-[#022145]">{message}</p>
          {subInfo && (
            <span className="text-xs text-[#022145]/40">{subInfo}</span>
          )}
        </div>
      </div>
      {subInfo && (
        <div className="flex items-center gap-2 text-xs text-[#767676]">
          <span>{subInfo.split(' • ')[0]}</span>
          <span className="w-1.5 h-1.5 bg-[#767676] rounded-full"></span>
          <span>{subInfo.split(' • ')[1]}</span>
        </div>
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-[#E8FFF3] border-[#E7F8EF] text-[#50CD89]';
      case 'paused':
        return 'bg-[#FFF5F8] border-[#FAE8EC] text-[#F1416C]';
      case 'completed':
        return 'bg-[#E8F4FF] border-[#D3E6FC] text-[#006EEF]';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-600';
    }
  };

  return (
    <span className={`px-3 py-2 text-xs font-bold rounded-full border ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

// Medication Table Component
const MedicationTable = ({ medications }) => {
  const columns = [
    { key: 'name', label: 'MEDICATION NAME', width: 'w-[200px]' },
    { key: 'dosage', label: 'DOSAGE', width: 'w-[110px]' },
    { key: 'frequency', label: 'FREQUENCY', width: 'flex-1' },
    { key: 'doctor', label: 'PRESCRIBING DOCTOR', width: 'w-[210px]' },
    { key: 'notes', label: 'NOTES', width: 'flex-1' },
    { key: 'status', label: 'STATUS', width: 'w-[100px]' },
  ];

  return (
    <div className="flex flex-col bg-white border border-[#E0E0E0] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#DCDFE3]">
        <h3 className="text-xl font-medium text-[#222126]">Medications</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="flex items-center border-b border-[#DCDFE3] min-w-[900px]">
          {columns.map((col) => (
            <div 
              key={col.key} 
              className={`px-4 py-4 ${col.width}`}
            >
              <span className="text-sm font-semibold tracking-wider uppercase text-[#9E9E9E]">
                {col.label}
              </span>
            </div>
          ))}
        </div>

        {/* Table Body */}
        {medications.map((medication, index) => (
          <div 
            key={medication.id || index} 
            className={`flex items-center min-w-[900px] ${index % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}`}
          >
            <div className="px-4 py-4 w-[200px]">
              <span className="text-sm font-medium text-[#1B1B28]">{medication.name}</span>
            </div>
            <div className="px-4 py-4 w-[110px]">
              <span className="text-sm font-medium text-[#1B1B28]">{medication.dosage}</span>
            </div>
            <div className="px-4 py-4 flex-1">
              <span className="text-sm font-medium text-[#1B1B28]">{medication.frequency}</span>
            </div>
            <div className="px-4 py-4 w-[210px]">
              <span className="text-sm font-medium text-[#1B1B28]">{medication.doctor}</span>
            </div>
            <div className="px-4 py-4 flex-1">
              <span className="text-sm font-medium text-[#1B1B28]">{medication.notes}</span>
            </div>
            <div className="px-4 py-4 w-[100px]">
              <StatusBadge status={medication.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main MedicationList Component
const MedicationList = ({ beneficiaries = [], onBeneficiaryChange }) => {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(
    beneficiaries.length > 0 ? beneficiaries[0] : null
  );
  const [showReminder, setShowReminder] = useState(true);

  // Sample medications data
  const medicationsData = [
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: '3x daily',
      doctor: 'Dr. Kwame Asante',
      notes: 'Blood pressure medication',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: '2x daily',
      doctor: 'Dr. Kwame Asante',
      notes: 'Diabetes medication',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Daily Multivitamin',
      dosage: '55 mcg',
      frequency: 'As Needed',
      doctor: 'Dr. Kwame Asante',
      notes: 'General health supplement',
      status: 'Active'
    }
  ];

  const handleBeneficiaryChange = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    if (onBeneficiaryChange) {
      onBeneficiaryChange(beneficiary);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Patient Selector Card */}
      <div className="flex flex-col p-6 gap-3 bg-white border border-[#E0E0E0] rounded-xl">
        <div className="relative">
          <PatientSelector
            selectedPatient={selectedBeneficiary}
            patients={beneficiaries}
            onChange={handleBeneficiaryChange}
          />
        </div>
      </div>

      {/* Medication Reminder Banner */}
      {showReminder && (
        <MedicationReminderBanner
          title="Medication Reminder"
          message="Evening medication schedule needs verification"
          subInfo="2 hours ago"
          onDismiss={() => setShowReminder(false)}
        />
      )}

      {/* Reminder Info Row */}
      {showReminder && (
        <div className="flex items-center gap-2 px-6 text-sm text-[#767676]">
          <span>Mama Akosua</span>
          <span className="w-1.5 h-1.5 bg-[#767676] rounded-full"></span>
          <span>Hypertension</span>
        </div>
      )}

      {/* Medications Table */}
      <MedicationTable medications={medicationsData} />
    </div>
  );
};

export default MedicationList;
