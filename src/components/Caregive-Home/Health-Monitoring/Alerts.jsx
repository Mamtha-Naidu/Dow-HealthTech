import React from 'react';
import { MoreVertical } from 'lucide-react';

// ─── Static data ────────────────────────────────────────────────────────────

const yesterdayAlerts = [
  {
    id: 'y1',
    type: 'warning',
    title: 'Medication Reminder',
    description: 'Evening medication schedule needs verification',
    memberName: 'Uncle Ato',
    extraInfo: 'Arthritis medication',
    timestamp: 'Yesterday, 8:00 PM'
  },
  {
    id: 'y2',
    type: 'success',
    title: 'Health Check Complete',
    description: 'Routine wellness checkup completed successfully',
    memberName: 'Auntie Ama',
    extraInfo: 'All vitals normal',
    timestamp: 'Yesterday, 2:00 PM'
  }
];

const tableData = [
  {
    id: 1,
    alertType: 'Fall Alert',
    recipient: 'Alan Bisho',
    description: 'Slipped near bathroom',
    severity: 'High',
    severityColor: 'text-[#F64144]',
    severityBg: 'bg-[rgba(246,65,68,0.1)]',
    status: 'Unresolved',
    actionRequired: 'Assess injury, log note'
  },
  {
    id: 2,
    alertType: 'High BP Detected',
    recipient: 'Linda Gomez',
    description: '145/95 – above threshold',
    severity: 'Medium',
    severityColor: 'text-[#F1950A]',
    severityBg: 'bg-[rgba(241,149,10,0.1)]',
    status: 'Resolved',
    actionRequired: 'Continue monitoring'
  },
  {
    id: 3,
    alertType: 'Missed Medication',
    recipient: 'Mary Johnson',
    description: 'Missed 06:00 AM insulin dose',
    severity: 'High',
    severityColor: 'text-[#F64144]',
    severityBg: 'bg-[rgba(246,65,68,0.1)]',
    status: 'Unresolved',
    actionRequired: 'Reschedule immediately'
  },
  {
    id: 4,
    alertType: 'Vitals Not Updated',
    recipient: 'Alan Bishop',
    description: 'No vitals recorded in last 12 hours',
    severity: 'Medium',
    severityColor: 'text-[#F1950A]',
    severityBg: 'bg-[rgba(241,149,10,0.1)]',
    status: 'Unresolved',
    actionRequired: 'Take vitals ASAP'
  }
];

// ─── Alert Card ──────────────────────────────────────────────────────────────

const typeStyles = {
  critical: { bg: 'bg-[#FFF5F8]', titleColor: 'text-[#F1416C]' },
  warning:  { bg: 'bg-[#FBF4EA]', titleColor: 'text-[#F1950A]' },
  success:  { bg: 'bg-[#E5F9F3]', titleColor: 'text-[#00B77D]' }
};

const AlertCard = ({ type, title, description, memberName, extraInfo, timestamp }) => {
  const { bg, titleColor } = typeStyles[type] || typeStyles.warning;
  return (
    <div className={`flex flex-col justify-center items-start p-4 gap-4 ${bg} rounded-xl w-full`}>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-2 w-full">
          <h4 className={`font-bold text-base leading-6 ${titleColor}`}>{title}</h4>
          <div className="flex flex-col gap-2">
            <p className="font-normal text-sm leading-6 text-[#022145]">{description}</p>
            <span className="font-medium text-xs leading-[14px] text-[#022145] opacity-40">{timestamp}</span>
          </div>
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

// ─── Date Group ──────────────────────────────────────────────────────────────

const AlertGroup = ({ label, lastUpdated, items }) => (
  <div className="flex flex-col gap-4 w-full">
    <div className="flex flex-row justify-between items-center w-full">
      <span className="font-normal text-lg leading-[27px] text-[#022145]">{label}</span>
      <span className="font-normal text-sm leading-[27px] text-[#999999]">{lastUpdated}</span>
    </div>
    <div className="flex flex-col gap-4 w-full">
      {items.map((alert) => (
        <AlertCard key={alert.id} {...alert} />
      ))}
    </div>
  </div>
);

// ─── Alerts Table ────────────────────────────────────────────────────────────

const tableColumns = [
  { header: 'Alert Type',      key: 'alertType' },
  { header: 'Recipient',       key: 'recipient' },
  { header: 'Description',     key: 'description' },
  { header: 'Severity',        key: 'severity' },
  { header: 'Status',          key: 'status' },
  { header: 'Action Required', key: 'actionRequired' },
  { header: 'Action',          key: '__action' }
];

const AlertsTable = () => (
  <div className="flex flex-col gap-4 bg-white border border-[#E0E0E0] rounded-xl w-full overflow-x-auto">
    {/* Table header */}
    <div className="flex flex-row items-center w-full border-b border-[#DCDFE3] min-w-max">
      {tableColumns.map((col, idx) => (
        <div key={idx} className={`flex flex-row items-center py-4 px-4 gap-2 ${col.key === '__action' ? 'w-[120px]' : 'flex-1 min-w-[130px]'}`}>
          <span className="font-semibold text-xs leading-5 tracking-[1.25px] uppercase text-[#9E9E9E] whitespace-nowrap">
            {col.header}
          </span>
        </div>
      ))}
    </div>

    {/* Rows */}
    {tableData.map((row, rowIdx) => (
      <div
        key={row.id}
        className={`flex flex-row items-center w-full min-w-max ${rowIdx % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}`}
      >
        {tableColumns.map((col) => {
          if (col.key === '__action') {
            return (
              <div key={col.key} className="flex flex-row items-center py-4 px-4 gap-2 w-[120px]">
                <button className="text-[#022145] hover:opacity-70 transition-opacity">
                  <MoreVertical className="w-6 h-6" />
                </button>
              </div>
            );
          }
          if (col.key === 'severity') {
            return (
              <div key={col.key} className="flex flex-row items-center py-4 px-4 flex-1 min-w-[130px]">
                <span className={`font-medium text-sm leading-5 tracking-[0.25px] px-4 py-1 rounded-full ${row.severityBg} ${row.severityColor}`}>
                  {row[col.key]}
                </span>
              </div>
            );
          }
          return (
            <div key={col.key} className="flex flex-row items-center py-4 px-4 flex-1 min-w-[130px]">
              <span className="font-medium text-sm leading-5 tracking-[0.25px] text-[#1B1B28]">
                {row[col.key]}
              </span>
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

// ─── Main Alerts Component ────────────────────────────────────────────────────

const Alerts = ({ alerts, dismissAlert }) => (
  <div className="flex flex-col gap-6 w-full">
    {/* Main panel */}
    <div className="flex flex-col justify-end items-start p-8 gap-6 bg-white border border-[#E0E0E0] rounded-xl w-full">
      {/* Today */}
      {alerts.length > 0 && (
        <AlertGroup
          label="Today"
          lastUpdated="Last updated today 10.00 AM"
          items={alerts}
        />
      )}

      {/* Yesterday */}
      <AlertGroup
        label="Yesterday"
        lastUpdated="Last updated Yesterday 10.00 AM"
        items={yesterdayAlerts}
      />
    </div>

    {/* Alerts Table */}
    <AlertsTable />
  </div>
);

export default Alerts;
