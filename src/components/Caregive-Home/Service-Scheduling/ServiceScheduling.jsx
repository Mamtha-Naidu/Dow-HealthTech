import React, { useState } from 'react';
import {
  Calendar,
  CalendarDays,
  RefreshCcw,
  Timer,
  Stethoscope,
  Activity,
  Home
} from 'lucide-react';

import Scheduling from './Scheduling';
import Appointment from './Appointment';
import RecurringServices from './RecurringServices';
import ServiceHours from './ServiceHours';
import MedicalServices from './MedicalServices';
import Rehabilitation from './Rehabilitation';
import HomeCare from './HomeCare';

// ---------------------------------------------------------------------------
// Sidebar nav item
// ---------------------------------------------------------------------------
const SidebarNavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-row items-center px-6 gap-4 w-full h-14 transition-colors ${
      isActive
        ? 'bg-[rgba(0,183,125,0.1)] border-l-[3px] border-[#00B77D]'
        : 'hover:bg-gray-50'
    }`}
  >
    <Icon
      size={24}
      className={isActive ? 'text-[#00B77D]' : 'text-[#022145]'}
    />
    <span
      className={`font-medium text-base leading-[23px] ${
        isActive ? 'text-[#00B77D]' : 'text-[#022145]'
      }`}
    >
      {label}
    </span>
  </button>
);

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------
const SidebarNav = ({ activeSection, onSelect }) => {
  const schedulingItems = [
    { id: 'scheduling', label: 'Scheduling', icon: Calendar },
    { id: 'appointment', label: 'Appointment', icon: CalendarDays },
    { id: 'recurring', label: 'Recurring Services', icon: RefreshCcw },
    { id: 'reminders', label: 'Reminders', icon: Timer },
  ];

  const serviceTypeItems = [
    { id: 'medical', label: 'Medical Services', icon: Stethoscope },
    { id: 'rehab', label: 'Physical Therapy', icon: Activity },
    { id: 'homecare', label: 'Home Health', icon: Home },
  ];

  const allItems = [...schedulingItems, ...serviceTypeItems];

  return (
    <>
      {/* ── Mobile: horizontal scroll tab strip (< lg) ── */}
      <div className="lg:hidden w-full overflow-x-auto pb-1">
        <div className="flex items-center gap-2 min-w-max">
          {allItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium transition-colors whitespace-nowrap ${
                activeSection === item.id
                  ? 'bg-[#00B77D] border-[#00B77D] text-white'
                  : 'bg-white border-[#E3E3E3] text-[#022145] hover:border-[#00B77D]'
              }`}
            >
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Desktop: vertical sidebar (lg+) ── */}
      <div className="hidden lg:flex flex-col items-start py-6 gap-6 w-[329px] bg-white border border-[#E3E3E3] rounded-xl flex-shrink-0 self-start">
        {/* Group 1 */}
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-row items-center px-6 py-0 gap-2.5 w-full h-[23px] mb-3">
            <span className="font-semibold text-base leading-[23px] tracking-[0.04em] text-[#A1A5B7]">
              Scheduling
            </span>
          </div>
          <div className="flex flex-col items-start w-full gap-0">
            {schedulingItems.map((item) => (
              <SidebarNavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={activeSection === item.id}
                onClick={() => onSelect(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Group 2 */}
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-row items-center px-6 py-0 gap-2.5 w-full h-[23px] mb-3">
            <span className="font-semibold text-base leading-[23px] tracking-[0.04em] text-[#A1A5B7]">
              Service Types
            </span>
          </div>
          <div className="flex flex-col items-start w-full gap-0">
            {serviceTypeItems.map((item) => (
              <SidebarNavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={activeSection === item.id}
                onClick={() => onSelect(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
const ServiceScheduling = () => {
  const [activeSection, setActiveSection] = useState('scheduling');

  const renderSection = () => {
    switch (activeSection) {
      case 'scheduling':
        return <Scheduling />;
      case 'appointment':
        return <Appointment />;
      case 'recurring':
        return <RecurringServices />;
      case 'reminders':
        return <ServiceHours />;
      case 'medical':
        return <MedicalServices />;
      case 'rehab':
        return <Rehabilitation />;
      case 'homecare':
        return <HomeCare />;
      default:
        return <Scheduling />;
    }
  };

  return (
    <div className="flex flex-col items-start px-4 sm:px-6 lg:px-14 pb-12 gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-1 w-full">
        <h1 className="font-bold text-[28px] leading-[42px] text-[#022145]">
          Services &amp; Scheduling
        </h1>
        <p className="font-normal text-sm leading-6 text-[#022145]">
          Book healthcare services and manage appointments for your family
        </p>
      </div>

      {/* Content area */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        {/* Sidebar */}
        <SidebarNav activeSection={activeSection} onSelect={setActiveSection} />

        {/* Main Section */}
        <div className="flex flex-col gap-6 flex-1 min-w-0 w-full">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default ServiceScheduling;
