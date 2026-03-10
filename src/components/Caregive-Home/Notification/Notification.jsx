import React, { useState } from 'react';
import { Bell, Trash2, MoreHorizontal, X } from 'lucide-react';

/* ── Data ─────────────────────────────────────────────────────── */
const TODAY_NOTIFICATIONS = [
  {
    title: "It's time to assist Mary in taking her medication.",
    desc: 'Mary requires Metformin 500mg with her morning meal. Timely intake is critical for blood sugar control.',
    time: '09:30 AM',
  },
  {
    title: 'Blood pressure reading recorded for Linda Gomez.',
    desc: 'BP reading of 145/95 has been logged. This is above the recommended threshold — review required.',
    time: '10:15 AM',
  },
  {
    title: 'Upcoming physiotherapy session for Alan Bishop.',
    desc: 'Alan has a scheduled physical therapy session today at 3:00 PM. Please confirm attendance.',
    time: '11:00 AM',
  },
];

const YESTERDAY_NOTIFICATIONS = [
  {
    title: 'Medication reminder: Evening dose for Mary Johnson.',
    desc: 'Mary requires Metformin 500mg with her evening meal. Ensure timely administration.',
    time: '06:00 PM',
  },
  {
    title: 'Vitals check completed for Alan Bishop.',
    desc: 'All vitals recorded within normal range. BP: 118/76, HR: 72bpm, Temp: 36.8°C.',
    time: '08:45 PM',
  },
];

const ALERT_ROWS = [
  {
    type: 'Fall Alert',
    recipient: 'Alan Bishop',
    description: 'Slipped near bathroom',
    severity: 'High',
    severityColor: '#F64144',
    severityBg: 'rgba(246,65,68,0.1)',
    status: 'Unresolved',
    action: 'Assess injury, log note',
  },
  {
    type: 'High BP Detected',
    recipient: 'Linda Gomez',
    description: '145/95 – above threshold',
    severity: 'Medium',
    severityColor: '#F1950A',
    severityBg: 'rgba(241,149,10,0.1)',
    status: 'Resolved',
    action: 'Continue monitoring',
  },
  {
    type: 'Missed Medication',
    recipient: 'Mary Johnson',
    description: 'Missed 06:00 AM insulin dose',
    severity: 'High',
    severityColor: '#F64144',
    severityBg: 'rgba(246,65,68,0.1)',
    status: 'Unresolved',
    action: 'Reschedule immediately',
  },
  {
    type: 'Vitals Not Updated',
    recipient: 'Alan Bishop',
    description: 'No vitals recorded in last 12 hours',
    severity: 'Medium',
    severityColor: '#F1950A',
    severityBg: 'rgba(241,149,10,0.1)',
    status: 'Unresolved',
    action: 'Take vitals ASAP',
  },
];

/* ── NotificationRow ──────────────────────────────────────────── */
function NotificationRow({ title, desc, time, last }) {
  return (
    <div
      className="flex items-start gap-4 py-3"
      style={{ borderBottom: last ? 'none' : '1px solid #E3E3E3' }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full"
        style={{ background: '#F5F5F5', border: '1px solid #E3E3E3' }}
      >
        <Bell size={20} style={{ color: '#022145' }} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold leading-6" style={{ color: '#000000' }}>
            {title}
          </span>
          <p className="text-sm leading-6" style={{ color: '#999999' }}>
            {desc}
          </p>
        </div>
        <span className="text-xs leading-6" style={{ color: '#999999' }}>{time}</span>
      </div>
    </div>
  );
}

/* ── SectionHeader ────────────────────────────────────────────── */
function SectionHeader({ label, updatedText }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-lg font-normal" style={{ color: '#022145' }}>{label}</span>
      <span className="text-sm" style={{ color: '#999999' }}>{updatedText}</span>
    </div>
  );
}

/* ── Notification (full page) ─────────────────────────────────── */
export default function Notification({ onClose }) {
  const [activeTab, setActiveTab] = useState('notifications');

  return (
    <div className="flex flex-col gap-12 px-4 sm:px-6 lg:px-14 pb-12">
      {/* Main card */}
      <div
        className="flex flex-col gap-6 p-4 sm:p-8 lg:p-12"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
          borderRadius: '12px',
        }}
      >
        {/* Top bar: Title + Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-medium" style={{ lineHeight: '48px', color: '#222126' }}>
            Notifications
          </h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {/* Mark All as Read */}
            <button
              className="flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm sm:text-base cursor-pointer transition-opacity hover:opacity-80 whitespace-nowrap"
              style={{
                height: '40px',
                border: '1px solid #00B77D',
                color: '#00B77D',
                letterSpacing: '0.01em',
                background: 'transparent',
              }}
            >
              Mark All as Read
            </button>
            {/* Delete All */}
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm sm:text-base text-white cursor-pointer transition-opacity hover:opacity-80 whitespace-nowrap"
              style={{
                height: '40px',
                background: '#F64144',
                border: 'none',
                letterSpacing: '0.01em',
              }}
            >
              <Trash2 size={18} className="flex-shrink-0" />
              Delete All
            </button>
            {/* Close */}
            {onClose && (
              <button
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <X size={22} style={{ color: '#022145' }} />
              </button>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div
          className="flex items-center"
          style={{ borderBottom: '1px solid #DCDFE3' }}
        >
          {/* NOTIFICATIONS tab */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="flex items-center gap-2 px-6 py-4 cursor-pointer"
            style={{
              borderBottom: activeTab === 'notifications' ? '2px solid #00B77D' : '2px solid transparent',
              marginBottom: '-1px',
            }}
          >
            <span
              className="font-semibold text-lg tracking-[1.25px] uppercase"
              style={{ color: activeTab === 'notifications' ? '#00B77D' : '#9E9E9E' }}
            >
              Notifications
            </span>
            <span
              className="flex items-center justify-center w-6 h-6 rounded"
              style={{
                background: activeTab === 'notifications' ? '#00B77D' : '#E9E9E9',
                fontSize: '12px',
                fontWeight: 700,
                color: activeTab === 'notifications' ? '#FFFFFF' : '#B3B3B3',
                letterSpacing: '0.01em',
              }}
            >
              {TODAY_NOTIFICATIONS.length}
            </span>
          </button>

          {/* ALERT tab */}
          <button
            onClick={() => setActiveTab('alerts')}
            className="flex items-center gap-2 px-6 py-4 cursor-pointer"
            style={{
              borderBottom: activeTab === 'alerts' ? '2px solid #00B77D' : '2px solid transparent',
              marginBottom: '-1px',
            }}
          >
            <span
              className="font-semibold text-lg tracking-[1.25px] uppercase"
              style={{ color: activeTab === 'alerts' ? '#00B77D' : '#9E9E9E' }}
            >
              Alert
            </span>
            <span
              className="flex items-center justify-center w-6 h-6 rounded"
              style={{
                background: activeTab === 'alerts' ? '#00B77D' : '#E9E9E9',
                fontSize: '12px',
                fontWeight: 700,
                color: activeTab === 'alerts' ? '#FFFFFF' : '#B3B3B3',
                letterSpacing: '0.01em',
              }}
            >
              {ALERT_ROWS.length}
            </span>
          </button>
        </div>

        {/* ── NOTIFICATIONS tab content ── */}
        {activeTab === 'notifications' && (
          <div className="flex flex-col gap-6">
            {/* TODAY section */}
            <div className="flex flex-col gap-6">
              <SectionHeader label="Today" updatedText="Last updated today 10:00 AM" />
              <div className="flex flex-col">
                {TODAY_NOTIFICATIONS.map((n, i) => (
                  <NotificationRow
                    key={i}
                    title={n.title}
                    desc={n.desc}
                    time={n.time}
                    last={i === TODAY_NOTIFICATIONS.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* YESTERDAY section */}
            <div className="flex flex-col gap-6">
              <SectionHeader label="Yesterday" updatedText="Last updated yesterday 10:00 AM" />
              <div className="flex flex-col">
                {YESTERDAY_NOTIFICATIONS.map((n, i) => (
                  <NotificationRow
                    key={i}
                    title={n.title}
                    desc={n.desc}
                    time={n.time}
                    last={i === YESTERDAY_NOTIFICATIONS.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ALERTS tab content ── */}
        {activeTab === 'alerts' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #DCDFE3' }}>
                  {['Alert Type', 'Recipient', 'Description', 'Severity', 'Status', 'Action Required', 'Action'].map(
                    (col) => (
                      <th
                        key={col}
                        className="text-left px-4 py-4 text-sm font-semibold uppercase tracking-[1.25px]"
                        style={{ color: '#9E9E9E' }}
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {ALERT_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    style={{ background: i % 2 === 1 ? '#F6F6F6' : '#FFFFFF' }}
                  >
                    <td className="px-4 py-4 text-sm font-medium" style={{ color: '#1B1B28' }}>
                      {row.type}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium" style={{ color: '#1B1B28' }}>
                      {row.recipient}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium" style={{ color: '#1B1B28' }}>
                      {row.description}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="inline-flex items-center justify-center px-4 py-1 rounded-full text-sm font-medium"
                        style={{
                          background: row.severityBg,
                          color: row.severityColor,
                        }}
                      >
                        {row.severity}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium" style={{ color: '#1B1B28' }}>
                      {row.status}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium" style={{ color: '#1B1B28' }}>
                      {row.action}
                    </td>
                    <td className="px-4 py-4">
                      <button className="cursor-pointer hover:opacity-70">
                        <MoreHorizontal size={20} style={{ color: '#1B1B28' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
