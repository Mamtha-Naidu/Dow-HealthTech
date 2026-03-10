import React, { useState } from 'react';
import {
  BarChart2,
  Heart,
  TrendingUp,
  Clock,
  ChevronDown,
  Droplets,
  Thermometer,
  Activity,
  CheckCircle,
  X
} from 'lucide-react';

import Overview from './Overview';
import Vitals from './Vitals';
import Trends from './Trends';
import AlertsSection from './Alerts';

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

export const AlertCard = ({ type, title, description, memberName, extraInfo, timestamp, onDismiss }) => {
  const typeStyles = {
    critical: {
      bg: 'bg-[#FFF5F8]',
      border: 'border-l-4 border-[#F1416C]',
      titleColor: 'text-[#F1416C]'
    },
    warning: {
      bg: 'bg-[#FBF4EA]',
      border: 'border-l-4 border-[#F1950A]',
      titleColor: 'text-[#F1950A]'
    },
    success: {
      bg: 'bg-[#E5F9F3]',
      border: 'border-l-4 border-[#00B77D]',
      titleColor: 'text-[#00B77D]'
    }
  };

  const styles = typeStyles[type] || typeStyles.warning;

  return (
    <div className={`flex flex-col justify-center items-start p-4 pr-4 pl-6 gap-4 ${styles.bg} ${styles.border} rounded-xl flex-1 min-w-[280px]`}>
      <div className="flex flex-col justify-center items-start gap-3 w-full">
        <div className="flex flex-row justify-between items-center gap-2 w-full">
          <h4 className={`font-bold text-base leading-6 ${styles.titleColor}`}>{title}</h4>
          <button onClick={onDismiss} className="cursor-pointer">
            <X className="w-6 h-6 text-[#022145]" />
          </button>
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <p className="font-normal text-sm leading-6 text-[#022145]">{description}</p>
          <span className="font-medium text-xs leading-[14px] text-[#022145] opacity-40">{timestamp}</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <span className="font-medium text-xs leading-[21px] text-[#767676]">{memberName}</span>
        <div className="w-[5px] h-[5px] bg-[#767676] rounded-full" />
        <span className="font-medium text-xs leading-[21px] text-[#767676]">{extraInfo}</span>
      </div>
    </div>
  );
};

export const QuickStatCard = ({ title, value, unit, status, statusText, icon: Icon, iconBgColor, valueColor, hasBorder = true }) => {
  const statusColors = {
    good: 'bg-[rgba(0,183,125,0.1)] text-[#00B77D]',
    warning: 'bg-[rgba(238,68,93,0.1)] text-[#EE445D]',
    normal: 'bg-[rgba(0,183,125,0.1)] text-[#00B77D]'
  };

  return (
    <div className={`flex flex-col items-start p-6 gap-3 bg-white ${hasBorder ? 'border border-[#E3E3E3]' : ''} rounded-xl flex-1`}>
      <div className="flex flex-row justify-between items-center w-full">
        <p className="font-medium text-base text-[#222126] leading-6">{title}</p>
        <div className={`flex items-center justify-center w-10 h-10 rounded-md ${iconBgColor}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
      <span className={`font-bold text-2xl leading-9 ${valueColor}`}>
        {value} <span className="text-base font-normal">{unit}</span>
      </span>
      {statusText && (
        <span className={`font-medium text-xs leading-[18px] tracking-wide px-3 py-0.5 rounded-full ${statusColors[status]}`}>
          {statusText}
        </span>
      )}
    </div>
  );
};

export const ActivityTable = ({ title, data, columns }) => (
  <div className="flex flex-col justify-end items-start p-6 gap-4 bg-white border border-[#E0E0E0] rounded-xl w-full">
    <div className="flex flex-row items-center gap-3 w-full">
      <h3 className="font-medium text-xl leading-[30px] text-[#222126]">{title}</h3>
    </div>
    <div className="flex flex-col items-start w-full">
      <div className="flex flex-row items-center w-full border-b border-[#DCDFE3]">
        {columns.map((col, idx) => (
          <div key={idx} className="flex flex-row items-center py-4 px-6 gap-2 flex-1">
            <span className="font-semibold text-sm leading-[20px] tracking-[1.25px] uppercase text-[#9E9E9E]">
              {col.header}
            </span>
          </div>
        ))}
      </div>
      {data.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`flex flex-row items-center w-full ${rowIdx % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}`}
        >
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-row items-center py-4 px-6 gap-2.5 flex-1">
              <span className="font-medium text-sm leading-[20px] tracking-[0.25px] text-[#1B1B28]">
                {row[col.key]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const ExtendedStatCard = ({ title, value, unit, statusText, icon: Icon, iconBgColor, valueColor, statusColor }) => (
  <div className="flex flex-col items-start p-6 gap-3 bg-white border border-[#E3E3E3] rounded-xl flex-1">
    <div className="flex flex-row justify-between items-center w-full gap-4">
      <p className="font-medium text-base text-[#222126] leading-6 max-w-[160px]">{title}</p>
      <div className={`flex items-center justify-center w-10 h-10 rounded-md ${iconBgColor}`}>
        <Icon className="w-8 h-8" />
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <span className={`font-bold text-2xl leading-9 ${valueColor}`}>
        {value} <span className="text-base font-normal">{unit}</span>
      </span>
      {statusText && (
        <span className={`font-medium text-[10px] leading-[18px] tracking-wide ${statusColor}`}>
          {statusText}
        </span>
      )}
    </div>
  </div>
);

const SidebarNavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <div
    className={`
      box-border flex flex-row items-center px-6 gap-4 w-[329px] h-[56px] cursor-pointer transition-all
      ${isActive
        ? 'bg-[rgba(0,183,125,0.1)] border-l-[3px] border-[#00B77D]'
        : 'hover:bg-gray-50'
      }
    `}
    onClick={onClick}
  >
    {isActive ? (
      <Icon className="w-6 h-6 text-[#00B77D] fill-[#00B77D]" />
    ) : (
      <Icon className="w-6 h-6 text-[#292D32]" strokeWidth={1.5} />
    )}
    <span
      className={`
        font-inter font-medium text-base leading-[23px] flex items-center
        ${isActive ? 'text-[#00B77D]' : 'text-[#022145]'}
      `}
    >
      {label}
    </span>
  </div>
);

const SidebarNav = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'overview', icon: BarChart2, label: 'Overview' },
    { id: 'vitals', icon: Heart, label: 'Vitals' },
    { id: 'trends', icon: TrendingUp, label: 'Trends' },
    { id: 'alerts', icon: Clock, label: 'Alerts' }
  ];

  return (
    <div
      className="
        flex flex-col items-start py-6 gap-6
        w-[329px] min-h-[850px]
        bg-white border border-[#E3E3E3] rounded-xl
        flex-none order-0 flex-grow-0
      "
    >
      <div
        className="
          box-border flex flex-col justify-center items-start
          gap-4 w-[329px]
          bg-white rounded-t-xl
          flex-none order-0 self-stretch flex-grow-0
        "
      >
        <div
          className="
            flex flex-row items-center px-6 gap-2.5
            w-[329px] h-[23px]
            flex-none order-0 self-stretch flex-grow-0
          "
        >
          <span
            className="
              w-[281px] h-[23px]
              font-inter font-semibold text-base leading-[23px]
              flex items-center tracking-[0.04em] uppercase
              text-[#A1A5B7]
              flex-none order-0 flex-grow
            "
          >
            Health Categories
          </span>
        </div>
        <div
          className="
            flex flex-col items-start gap-2.5
            w-[329px]
            flex-none order-1 self-stretch flex-grow-0
          "
        >
          {navItems.map((item) => (
            <SidebarNavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeSection === item.id}
              onClick={() => onSectionChange(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main HealthMonitoring Component
// ---------------------------------------------------------------------------

const HealthMonitoring = ({
  beneficiary = null,
  healthData = null,
  onBeneficiaryChange = null,
  beneficiaries = []
}) => {
  const [activeSection, setActiveSection] = useState('vitals');
  const [selectedMember, setSelectedMember] = useState(beneficiary);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Blood Pressure Alert',
      description: 'Blood pressure reading of 145/90 mmHg requires immediate follow-up',
      memberName: 'Mama Akosua',
      extraInfo: 'Next visit: Today 2:00 PM',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Medication Reminder',
      description: 'Evening medication schedule needs verification',
      memberName: 'Uncle Ato',
      extraInfo: 'Arthritis medication',
      timestamp: '2 hours ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'Health Check Complete',
      description: 'Routine wellness checkup completed successfully',
      memberName: 'Auntie Ama',
      extraInfo: 'All vitals normal',
      timestamp: '2 hours ago'
    }
  ]);

  const quickStats = [
    {
      title: 'Blood Pressure',
      value: '145/90',
      unit: 'mmHg',
      status: 'warning',
      statusText: 'Elevated',
      icon: Heart,
      iconBgColor: 'bg-[rgba(238,68,93,0.1)]',
      valueColor: 'text-[#EE445D]'
    },
    {
      title: 'Heart Rate',
      value: '72',
      unit: 'BPM',
      status: 'good',
      statusText: 'Normal',
      icon: Activity,
      iconBgColor: 'bg-[rgba(63,177,133,0.1)]',
      valueColor: 'text-[#00B77D]'
    },
    {
      title: 'Temperature',
      value: '98.1',
      unit: '°F',
      status: 'good',
      statusText: 'Normal',
      icon: Thermometer,
      iconBgColor: 'bg-[rgba(63,177,133,0.1)]',
      valueColor: 'text-[#00B77D]'
    },
    {
      title: 'Blood Sugar',
      value: '180',
      unit: 'mg/dL',
      status: 'warning',
      statusText: 'Elevated',
      icon: Droplets,
      iconBgColor: 'bg-[rgba(238,68,93,0.1)]',
      valueColor: 'text-[#EE445D]'
    }
  ];

  const dismissAlert = (id) => setAlerts(alerts.filter((a) => a.id !== id));

  return (
    <div className="flex flex-row items-start px-14 gap-6 w-full">
      {/* Sidebar Navigation */}
      <SidebarNav activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <div className="flex flex-col items-start gap-6 flex-1 rounded-xl">
        {/* Beneficiary Selector - Always visible */}
        <div className="flex flex-col gap-3 w-full">
          <label className="font-medium text-base leading-6 text-[#022145] tracking-wide">
            Select Beneficiary for Health Trends
          </label>
          <div className="flex flex-row justify-between items-center px-4 py-2.5 bg-white border border-[#E3E3E3] rounded-lg cursor-pointer">
            <div className="flex flex-row items-center gap-2">
              <span className="text-base text-[#1B1B28]">
                {selectedMember?.name || 'Mama Akosua'}
              </span>
            </div>
            <ChevronDown className="w-5 h-5 text-[#0A0A0A]" />
          </div>
        </div>

        {activeSection === 'overview' && (
          <Overview
            alerts={alerts}
            dismissAlert={dismissAlert}
            quickStats={quickStats}
          />
        )}

        {activeSection === 'vitals' && (
          <Vitals quickStats={quickStats} />
        )}

        {activeSection === 'trends' && (
          <Trends />
        )}

        {activeSection === 'alerts' && (
          <AlertsSection
            alerts={alerts}
            dismissAlert={dismissAlert}
          />
        )}
      </div>
    </div>
  );
};

export default HealthMonitoring;
