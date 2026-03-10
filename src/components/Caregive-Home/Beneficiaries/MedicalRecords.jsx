import React, { useState } from 'react';
import { 
  ChevronDown, 
  Search,
  FileText,
  Eye
} from 'lucide-react';

// Patient Selector Component
const PatientSelector = ({ selectedPatient, patients, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
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

// Filter Dropdown Component
const FilterDropdown = ({ label, value, options }) => {
  return (
    <div className="flex flex-col gap-3 flex-1 min-w-[200px]">
      <label className="text-base font-medium tracking-wider text-[#022145]">{label}</label>
      <div className="flex items-center justify-between px-4 py-3 bg-white border border-[#E3E3E3] rounded-lg cursor-pointer hover:border-[#00B77D] transition-colors">
        <span className="text-base text-[#1B1B28]">{value}</span>
        <ChevronDown size={20} className="text-[#0A0A0A]" />
      </div>
    </div>
  );
};

// Search Input Component
const SearchInput = ({ placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-3 flex-1 min-w-[200px]">
      <label className="text-base font-medium tracking-wider text-[#022145]">Search</label>
      <div className="flex items-center px-4 py-3 bg-white border border-[#E3E3E3] rounded-lg">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 outline-none text-base text-[#1B1B28] placeholder:text-[#1B1B28]/50"
        />
      </div>
    </div>
  );
};

// Patient Info Card Component
const PatientInfoCard = ({ patient }) => {
  return (
    <div className="flex flex-col p-6 gap-6 bg-white border border-[#E0E0E0] rounded-xl">
      {/* Patient Header */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 bg-[#E0DCFF] rounded-full flex-shrink-0">
          <span className="text-lg font-bold text-[#1B00E9] tracking-tight">{patient.initials}</span>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[#022145]">{patient.name}</h3>
          <div className="flex items-center gap-2 text-sm text-[#022145]">
            <span>{patient.age}</span>
            <span className="w-1.5 h-1.5 bg-[#D9D9D9] rounded-full"></span>
            <span>{patient.gender}</span>
            <span className="w-1.5 h-1.5 bg-[#D9D9D9] rounded-full"></span>
            <span>Patient ID: {patient.patientId}</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value={patient.stats.totalRecords} label="Total Records" color="blue" />
        <StatCard value={patient.stats.labResults} label="Lab Results" color="orange" />
        <StatCard value={patient.stats.visits} label="Visits" color="green" />
        <StatCard value={patient.stats.lastUpdated} label="Last Updated" color="green" />
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ value, label, color }) => {
  const colorClasses = {
    blue: 'bg-[#4485FE]/10 text-[#4485FE]',
    orange: 'bg-[#FBF4EA] text-[#F1950A]',
    green: 'bg-[#E5F9F3] text-[#00B77D]'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 gap-1 rounded-xl ${colorClasses[color].split(' ')[0]}`}>
      <span className={`text-2xl font-bold ${colorClasses[color].split(' ')[1]}`}>{value}</span>
      <span className="text-sm font-medium text-[#222126]">{label}</span>
    </div>
  );
};

// Healthcare Team Section
const HealthcareTeamSection = ({ team }) => {
  return (
    <div className="flex flex-col p-6 gap-4 bg-white border border-[#E0E0E0] rounded-xl">
      <h3 className="text-xl font-medium text-[#222126]">Healthcare Team</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {team.map((member, idx) => (
          <TeamMemberCard key={idx} member={member} />
        ))}
      </div>
    </div>
  );
};

// Team Member Card
const TeamMemberCard = ({ member }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl">
      <div className="flex items-center justify-center w-16 h-16 bg-[#E0DCFF] rounded-full flex-shrink-0">
        <span className="text-lg font-bold text-[#1B00E9] tracking-tight">{member.initials}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-base font-semibold text-[#022145]">{member.name}</h4>
        <div className="flex items-center gap-2 text-sm text-[#022145]">
          <span>{member.role}</span>
          <span className="w-1.5 h-1.5 bg-[#D9D9D9] rounded-full"></span>
          <span>{member.phone}</span>
        </div>
      </div>
    </div>
  );
};

// Data Table Component
const DataTable = ({ title, headers, rows, renderRow }) => {
  return (
    <div className="flex flex-col p-6 gap-4 bg-white border border-[#E0E0E0] rounded-xl">
      <h3 className="text-xl font-medium text-[#222126]">{title}</h3>
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#DCDFE3]">
              {headers.map((header, idx) => (
                <th 
                  key={idx}
                  className="px-4 py-4 text-left text-sm font-semibold text-[#9E9E9E] uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => renderRow(row, idx))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    'Pending Results': 'bg-[#F1950A]/10 border-[#FAEFDF] text-[#F1950A]',
    'Normal': 'bg-[#E8FFF3] border-[#E7F8EF] text-[#50CD89]',
    'Done': 'bg-[#E8FFF3] border-[#E7F8EF] text-[#50CD89]',
    'Pending': 'bg-[#F1950A]/10 border-[#FAEFDF] text-[#F1950A]',
    'Urgent': 'bg-[#EE445D]/10 border-[#FAE8EC] text-[#EE445D]',
    'Active': 'bg-[#E8FFF3] border-[#E7F8EF] text-[#50CD89]'
  };

  return (
    <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full border ${statusStyles[status] || statusStyles['Normal']}`}>
      {status}
    </span>
  );
};

// Action Button Component
const ActionButton = () => {
  return (
    <button className="flex items-center justify-center w-9 h-9 bg-[#DDCCFA] rounded-lg hover:bg-[#DDCCFA]/80 transition-colors">
      <Eye size={16} className="text-[#5600E8]" />
    </button>
  );
};

// Documents Section
const DocumentsSection = ({ documents }) => {
  return (
    <div className="flex flex-col p-6 gap-4 bg-white border border-[#E0E0E0] rounded-xl">
      <h3 className="text-xl font-medium text-[#222126]">Documents</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {documents.map((doc, idx) => (
          <DocumentCard key={idx} document={doc} />
        ))}
      </div>
    </div>
  );
};

// Document Card
const DocumentCard = ({ document }) => {
  return (
    <div className="flex items-center gap-4 p-6 border border-[#E0E0E0] rounded-xl">
      <div className="flex items-center justify-center w-16 h-16 bg-[#E0DCFF] rounded-full flex-shrink-0">
        <FileText size={32} className="text-[#7F02ED]" />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <h4 className="text-base font-semibold text-[#022145]">{document.title}</h4>
        <p className="text-sm text-[#022145]">{document.description}</p>
        <span className="text-xs text-[#022145]/50">{document.updated}</span>
      </div>
    </div>
  );
};

// Main MedicalRecords Component
const MedicalRecords = ({ 
  beneficiaries = [],
  onBeneficiaryChange = () => {}
}) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [timePeriod, setTimePeriod] = useState('Last 30 days');
  const [recordType, setRecordType] = useState('All Record');
  const [provider, setProvider] = useState('All Providers');
  const [searchQuery, setSearchQuery] = useState('');

  // Default patient data
  const defaultPatient = {
    id: 1,
    name: 'Mama Akosua',
    initials: 'KA',
    age: '72 years old',
    gender: 'Female',
    patientId: 'VCG-2024-001',
    stats: {
      totalRecords: '12 Files',
      labResults: '08',
      visits: '15',
      lastUpdated: 'July 15'
    }
  };

  // Healthcare team data
  const healthcareTeam = [
    {
      name: 'Nurse Sarah Mensah',
      initials: 'NS',
      role: 'Primary Care Nurse',
      phone: '+233 24 123 4567'
    },
    {
      name: 'Dr. Kwame Asante',
      initials: 'KA',
      role: 'Family Physician',
      phone: '+233 24 123 4567'
    }
  ];

  // Recent activities data
  const recentActivities = [
    { date: 'Jun 28, 5:00 PM', member: 'Mama Akosua', activity: 'Physical Therapy', details: 'Auntie Ama completed exercises' },
    { date: 'Jun 29, 3:30 PM', member: 'Mama Akosua', activity: 'Medication Reminder', details: 'Uncle Ato took morning medication' },
    { date: 'Jun 30, 10:00 AM', member: 'Mama Akosua', activity: 'Blood Pressure Check', details: 'BP: 145/95, HR: 92, Temp: 37.1°C' }
  ];

  // Lab results data
  const labResults = [
    { date: 'Jun 28, 5:00 PM', test: 'Comprehensive Blood Panel', provider: 'Ghana Medical Laboratory', status: 'Pending Results' },
    { date: 'Jun 29, 3:30 PM', test: 'HbA1c Test', provider: 'Ghana Medical Laboratory', status: 'Normal' },
    { date: 'Jun 30, 10:00 AM', test: 'Lipid Panel', provider: 'Ghana Medical Laboratory', status: 'Pending' }
  ];

  // Home visits data
  const homeVisits = [
    { date: 'Jun 28, 5:00 PM', activity: 'Blood Pressure Follow-up', provider: 'Nurse Sarah Mensah', status: 'Urgent' },
    { date: 'Jun 29, 3:30 PM', activity: 'Routine Health Assessment', provider: 'Nurse Sarah Mensah', status: 'Done' },
    { date: 'Jun 30, 10:00 AM', activity: 'Diabetes Management Review', provider: 'Nurse Sarah Mensah', status: 'Done' }
  ];

  // Medications data
  const medications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: '3x daily', doctor: 'Dr. Kwame Asante', notes: 'Blood pressure medication', status: 'Active' },
    { name: 'Metformin', dosage: '500mg', frequency: '2x daily', doctor: 'Dr. Kwame Asante', notes: 'Diabetes medication', status: 'Active' },
    { name: 'Daily Multivitamin', dosage: '55 mcg', frequency: 'As Needed', doctor: 'Dr. Kwame Asante', notes: 'General health supplement', status: 'Active' }
  ];

  // Documents data
  const documents = [
    { title: 'Comprehensive Care Plan', description: 'Primary Care Nurse', updated: 'Updated July 1, 2025' },
    { title: 'Emergency Contact Information', description: 'Emergency protocols and contact details', updated: 'Updated June 15, 2025' }
  ];

  const currentPatient = selectedPatient || defaultPatient;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Patient Selector Card */}
      <div className="flex flex-col p-6 gap-3 bg-white border border-[#E0E0E0] rounded-xl relative">
        <label className="text-base font-medium tracking-wider text-[#022145]">
          Select Family Member
        </label>
        <div className="flex items-center justify-between px-4 py-3 bg-white border border-[#E3E3E3] rounded-lg cursor-pointer hover:border-[#00B77D] transition-colors">
          <span className="text-base text-[#1B1B28]">{currentPatient.name}</span>
          <ChevronDown size={20} className="text-[#0A0A0A]" />
        </div>
      </div>

      {/* Filters Card */}
      <div className="flex flex-col sm:flex-row p-6 gap-4 bg-white border border-[#E0E0E0] rounded-xl">
        <FilterDropdown label="Time Period" value={timePeriod} />
        <FilterDropdown label="Record Type" value={recordType} />
        <FilterDropdown label="Provider" value={provider} />
        <SearchInput placeholder="Search records" value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Patient Info Card */}
      <PatientInfoCard patient={currentPatient} />

      {/* Healthcare Team Section */}
      <HealthcareTeamSection team={healthcareTeam} />

      {/* Recent Activities Table */}
      <DataTable
        title="Recent Activities"
        headers={['Date & Time', 'Members', 'Activity', 'Details']}
        rows={recentActivities}
        renderRow={(row, idx) => (
          <tr key={idx} className={idx % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.date}</td>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.member}</td>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.activity}</td>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.details}</td>
          </tr>
        )}
      />

      {/* Lab Results Table */}
      <DataTable
        title="Lab Results & Diagnostic Tests"
        headers={['Date & Time', 'Activity', 'Provider', 'Status', 'Action']}
        rows={labResults}
        renderRow={(row, idx) => (
          <tr key={idx} className={idx % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.date}</td>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.test}</td>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.provider}</td>
            <td className="px-4 py-4"><StatusBadge status={row.status} /></td>
            <td className="px-4 py-4"><ActionButton /></td>
          </tr>
        )}
      />

      {/* Home Visits Table */}
      <DataTable
        title="Home Visits & Consultations"
        headers={['Date & Time', 'Activity', 'Provider', 'Status', 'Action']}
        rows={homeVisits}
        renderRow={(row, idx) => (
          <tr key={idx} className={idx % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.date}</td>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.activity}</td>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.provider}</td>
            <td className="px-4 py-4"><StatusBadge status={row.status} /></td>
            <td className="px-4 py-4"><ActionButton /></td>
          </tr>
        )}
      />

      {/* Medications Table */}
      <DataTable
        title="Medications"
        headers={['Medication Name', 'Dosage', 'Frequency', 'Prescribing Doctor', 'Notes', 'Status']}
        rows={medications}
        renderRow={(row, idx) => (
          <tr key={idx} className={idx % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.name}</td>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.dosage}</td>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.frequency}</td>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.doctor}</td>
            <td className="px-4 py-4 text-sm font-medium text-[#1B1B28]">{row.notes}</td>
            <td className="px-4 py-4"><StatusBadge status={row.status} /></td>
          </tr>
        )}
      />

      {/* Documents Section */}
      <DocumentsSection documents={documents} />
    </div>
  );
};

export default MedicalRecords;

// Export sub-components for reusability
export {
  PatientSelector,
  FilterDropdown,
  SearchInput,
  PatientInfoCard,
  StatCard,
  HealthcareTeamSection,
  TeamMemberCard,
  DataTable,
  StatusBadge,
  ActionButton,
  DocumentsSection,
  DocumentCard
};
