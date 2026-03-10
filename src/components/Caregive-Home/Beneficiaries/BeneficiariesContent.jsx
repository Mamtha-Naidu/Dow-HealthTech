import React, { useState } from 'react';
import { 
  Users, 
  Home, 
  Calendar, 
  AlertTriangle,
  ChevronDown,
  Plus,
  FileText,
  CheckCircle,
  AlertCircle,
  AlertOctagon,
  Pill,
  BarChart2,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { AddFamilyMemberModal } from '../../ui/FamilyMemberForm';
import HealthTrends from './HealthTrends';
import MedicalRecords from './MedicalRecords';
import MedicationList from './MedicationList';

const BeneficiariesContent = () => {
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedLocation, setSelectedLocation] = useState('All Location');
  const [selectedAge, setSelectedAge] = useState('All Ages');
  const [searchName, setSearchName] = useState('');
  const [activeSidebarItem, setActiveSidebarItem] = useState('all-beneficiaries');
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  // Handle saving new family member
  const handleSaveNewMember = async (memberData) => {
    // In the future, this will call the API to save the member
    console.log('Saving new family member:', memberData);
    // For now, just log it - API integration can be added later
    // await caregiverService.addBeneficiary(memberData);
  };

  // Sample beneficiaries data
  const beneficiariesData = [
    {
      id: 1,
      initials: 'MA',
      name: 'Mama Akosua',
      relationship: 'Mother',
      location: 'Accra, Greater Accra',
      tags: [
        { label: 'Hypertension', type: 'danger' },
        { label: 'Diabetes', type: 'danger' },
        { label: 'Home Visits', type: 'info' }
      ],
      status: { label: 'Needs Follow Up', type: 'warning' },
      age: '72 Years',
      mobility: 'Need Some Assistance',
      language: 'Twi, English',
      lastVisit: 'Yesterday - Blood pressure check (145/90 mmHg)'
    },
    {
      id: 2,
      initials: 'FA',
      name: 'Father Akosua',
      relationship: 'Father',
      location: 'Accra, Greater Accra',
      tags: [
        { label: 'Hypertension', type: 'danger' },
        { label: 'Diabetes', type: 'danger' },
        { label: 'Home Visits', type: 'info' }
      ],
      status: { label: 'Healthy', type: 'success' },
      age: '72 Years',
      mobility: 'Need Some Assistance',
      language: 'Twi, English',
      lastVisit: 'Yesterday - Blood pressure check (145/90 mmHg)'
    }
  ];

  const sidebarMenuItems = [
    { id: 'menu-section', label: 'Manage', type: 'header' },
    { id: 'all-beneficiaries', label: 'All Beneficiaries', icon: Users, active: true },
    { id: 'add-new', label: 'Add New Member', icon: Plus },
    { id: 'status-section', label: 'STATUS', type: 'header' },
    { id: 'verified', label: 'Verified', icon: CheckCircle, iconColor: '#3FB185' },
    { id: 'pending', label: 'Pending Review', icon: AlertCircle, iconColor: '#F1950A' },
    { id: 'needs-attention', label: 'Needs Attention', icon: AlertOctagon, iconColor: '#F64144' },
    { id: 'records-section', label: 'REPORT', type: 'header' },
    { id: 'health-trends', label: 'Health Trends', icon: Activity },
    { id: 'medical-records', label: 'Medical Record', icon: FileText },
    { id: 'medication-list', label: 'Medication List', icon: Pill }
  ];

  const getTagStyles = (type) => {
    switch (type) {
      case 'danger':
        return 'bg-[#EE445D]/10 text-[#EE445D]';
      case 'info':
        return 'bg-[#006EEF]/10 text-[#006EEF]';
      case 'warning':
        return 'bg-[#F1950A]/10 text-[#F1950A] border border-[#FAEFDF]';
      case 'success':
        return 'bg-[#E8FFF3] text-[#50CD89] border border-[#E7F8EF]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col items-start px-4 sm:px-6 lg:px-14 pb-12 gap-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        {/* Content Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#022145]">
            Family Members
          </h1>
          <p className="text-sm text-[#022145]">
            Manage and monitor your family's health in Ghana
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-[#00B77D] rounded-md text-[#00B77D] font-semibold text-sm sm:text-base hover:bg-[#00B77D]/5 transition-colors">
            <BarChart2 size={20} className="text-[#00B77D]" />
            <span>Generate Analysis</span>
          </button>
          <button 
            onClick={() => setIsAddMemberModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-[#00B77D] rounded-md text-white font-semibold text-sm sm:text-base hover:bg-[#00B77D]/90 transition-colors"
          >
            <Plus size={20} className="text-white" />
            <span>Add New Member</span>
          </button>
        </div>
      </div>

      {/* Add Family Member Modal */}
      <AddFamilyMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSave={handleSaveNewMember}
        title="Add New Family Member"
      />

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Sidebar */}
        <div className="w-full lg:w-[329px] flex-shrink-0">
          <div className="flex flex-col bg-white border border-[#E3E3E3] rounded-xl py-6 gap-6">
            {sidebarMenuItems.map((item, index) => {
              if (item.type === 'header') {
                return (
                  <div key={item.id} className={`px-6 ${index > 0 ? 'pt-4' : ''}`}>
                    <span className="text-base font-semibold tracking-wider text-[#A1A5B7]">
                      {item.label}
                    </span>
                  </div>
                );
              }

              const isActive = activeSidebarItem === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSidebarItem(item.id);
                    if (item.id === 'add-new') {
                      setIsAddMemberModalOpen(true);
                    }
                  }}
                  className={`flex items-center gap-4 px-6 py-3 transition-colors ${
                    isActive 
                      ? 'bg-[#00B77D]/10 border-l-[3px] border-[#00B77D] text-[#00B77D]' 
                      : 'text-[#022145] hover:bg-gray-50'
                  }`}
                >
                  <Icon 
                    size={24} 
                    className={isActive ? 'text-[#00B77D]' : ''}
                    style={{ color: item.iconColor || (isActive ? '#00B77D' : '#022145') }}
                  />
                  <span className={`text-base font-medium ${isActive ? 'text-[#00B77D]' : 'text-[#022145]'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Conditional Content Based on Sidebar Selection */}
          {activeSidebarItem === 'health-trends' ? (
            <HealthTrends 
              beneficiaries={beneficiariesData.map(b => ({ id: b.id, name: b.name }))}
              onBeneficiaryChange={(member) => console.log('Selected member:', member)}
            />
          ) : activeSidebarItem === 'medical-records' ? (
            <MedicalRecords 
              beneficiaries={beneficiariesData.map(b => ({ id: b.id, name: b.name }))}
              onBeneficiaryChange={(member) => console.log('Selected member:', member)}
            />
          ) : activeSidebarItem === 'medication-list' ? (
            <MedicationList 
              beneficiaries={beneficiariesData.map(b => ({ id: b.id, name: b.name }))}
              onBeneficiaryChange={(member) => console.log('Selected member:', member)}
            />
          ) : (
          <>
          {/* Alert Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 w-full bg-[#FFF5F8] border border-[#FAE8EC] rounded-lg">
            <AlertTriangle size={28} className="text-[#F1416C] flex-shrink-0" />
            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 className="text-base font-bold text-[#F1416C]">Attention Required</h3>
              <p className="text-sm font-medium text-[#F1416C]">
                Your mother's blood pressure reading from yesterday requires follow-up. A nurse will visit today at 2:00 PM.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {/* Family Members Under Care */}
            <div className="flex flex-col p-5 sm:p-6 gap-3 bg-white border border-[#E3E3E3] rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#222126]">Family Members Under Care</span>
                <div className="flex items-center justify-center w-10 h-10 bg-[#006EEF]/10 rounded-md">
                  <Users size={20} className="text-[#006EEF]" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-[28px] font-bold text-[#006EEF]">
                  {beneficiariesData.length}
                </span>
              </div>
            </div>

            {/* Care Facilities */}
            <div className="flex flex-col p-5 sm:p-6 gap-3 bg-white rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#222126]">Care Facilities</span>
                <div className="flex items-center justify-center w-10 h-10 bg-[#3FB185]/10 rounded-md">
                  <Home size={20} className="text-[#3FB185]" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-[28px] font-bold text-[#3FB185]">
                  2
                </span>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="flex flex-col p-5 sm:p-6 gap-3 bg-white rounded-xl sm:col-span-2 lg:col-span-1">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#222126]">Upcoming Appointments</span>
                <div className="flex items-center justify-center w-10 h-10 bg-[#F1950A]/10 rounded-md">
                  <Calendar size={20} className="text-[#F1950A]" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-[28px] font-bold text-[#F1950A]">
                  5
                </span>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex flex-col p-4 sm:p-6 gap-4 bg-white border border-[#E3E3E3] rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* All Statuses */}
              <div className="flex flex-col gap-3">
                <label className="text-base font-semibold tracking-wider text-[#022145]">All Statuses</label>
                <div className="flex items-center justify-between px-4 py-3 border border-[#E3E3E3] rounded-lg cursor-pointer hover:border-[#00B77D] transition-colors">
                  <span className="text-base text-[#1B1B28]">{selectedStatus}</span>
                  <ChevronDown size={20} className="text-[#0A0A0A]" />
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-3">
                <label className="text-base font-semibold tracking-wider text-[#022145]">Location</label>
                <div className="flex items-center justify-between px-4 py-3 border border-[#E3E3E3] rounded-lg cursor-pointer hover:border-[#00B77D] transition-colors">
                  <span className="text-base text-[#1B1B28]">{selectedLocation}</span>
                  <ChevronDown size={20} className="text-[#0A0A0A]" />
                </div>
              </div>

              {/* Age Range */}
              <div className="flex flex-col gap-3">
                <label className="text-base font-semibold tracking-wider text-[#022145]">Age Range</label>
                <div className="flex items-center justify-between px-4 py-3 border border-[#E3E3E3] rounded-lg cursor-pointer hover:border-[#00B77D] transition-colors">
                  <span className="text-base text-[#1B1B28]">{selectedAge}</span>
                  <ChevronDown size={20} className="text-[#0A0A0A]" />
                </div>
              </div>

              {/* Search */}
              <div className="flex flex-col gap-3">
                <label className="text-base font-semibold tracking-wider text-[#022145]">Search</label>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="px-4 py-3 border border-[#E3E3E3] rounded-lg focus:outline-none focus:border-[#00B77D] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Beneficiary Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {beneficiariesData.map((beneficiary) => (
              <div key={beneficiary.id} className="flex flex-col p-6 gap-4 bg-white border border-[#E3E3E3] rounded-xl">
                {/* Header */}
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex items-center justify-center w-[52px] h-[52px] bg-[#006EEF]/10 rounded-full flex-shrink-0">
                    <span className="text-lg font-semibold text-[#006EEF]">{beneficiary.initials}</span>
                  </div>
                  
                  {/* Info */}
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold text-[#022145]">{beneficiary.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-[#022145]/50">
                        <span>{beneficiary.relationship}</span>
                        <span className="w-1 h-1 bg-[#022145] rounded-full"></span>
                        <span>{beneficiary.location}</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {beneficiary.tags.map((tag, idx) => (
                        <span key={idx} className={`px-3 py-0.5 text-xs font-medium rounded-full ${getTagStyles(tag.type)}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-3 py-2 text-xs font-bold rounded-full whitespace-nowrap ${getTagStyles(beneficiary.status.type)}`}>
                    {beneficiary.status.label}
                  </span>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#E3E3E3]"></div>

                {/* Details */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base text-[#022145]/65">Age</span>
                    <span className="text-base font-medium text-[#022145]">{beneficiary.age}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base text-[#022145]/65">Mobility</span>
                    <span className="text-base font-medium text-[#022145]">{beneficiary.mobility}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base text-[#022145]/65">Language</span>
                    <span className="text-base font-medium text-[#022145]">{beneficiary.language}</span>
                  </div>
                </div>

                {/* Last Visit Banner */}
                <div className="flex flex-col gap-2 p-4 bg-[#006EEF]/10 border-l-4 border-[#006EEF] rounded-r-xl">
                  <span className="text-base font-bold text-[#006EEF]">Last Visit</span>
                  <span className="text-sm font-medium text-[#022145]">{beneficiary.lastVisit}</span>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#E3E3E3]"></div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex items-center justify-center py-3 px-4 bg-[#00B77D] rounded-md text-white font-semibold text-sm sm:text-base hover:bg-[#00B77D]/90 transition-colors">
                    View Details
                  </button>
                  <button className="flex items-center justify-center py-3 px-4 border border-[#00B77D] rounded-md text-[#00B77D] font-semibold text-sm sm:text-base hover:bg-[#00B77D]/5 transition-colors">
                    Schedule
                  </button>
                  <button className="flex items-center justify-center py-3 px-4 border border-[#00B77D] rounded-md text-[#00B77D] font-semibold text-sm sm:text-base hover:bg-[#00B77D]/5 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeneficiariesContent;
