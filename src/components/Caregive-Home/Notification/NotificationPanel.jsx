import React from 'react';
import { Bell, X } from 'lucide-react';

const NOTIFICATIONS = [
  {
    title: 'Blood Pressure Alert',
    desc: "Mary Johnson's blood pressure reading is above normal. Immediate follow-up recommended.",
    time: '5 min ago',
    unread: true,
    color: '#F1416C',
    bg: 'rgba(241,65,108,0.08)',
  },
  {
    title: 'Appointment Reminder',
    desc: 'Alan Bishop has a physiotherapy session scheduled for today at 3:00 PM.',
    time: '1 hr ago',
    unread: true,
    color: '#006EEF',
    bg: 'rgba(0,110,239,0.08)',
  },
  {
    title: 'Medication Taken',
    desc: 'Linda Gomez successfully took her evening medication at 8:00 PM.',
    time: '3 hrs ago',
    unread: true,
    color: '#00B77D',
    bg: 'rgba(0,183,125,0.08)',
  },
  {
    title: 'New Report Available',
    desc: "Alan Bishop's monthly health summary report is ready for review.",
    time: 'Yesterday',
    unread: false,
    color: '#8800E9',
    bg: 'rgba(136,0,233,0.08)',
  },
  {
    title: 'Service Scheduled',
    desc: 'Home care visit for Mary Johnson has been confirmed for Jul 2 at 11:00 AM.',
    time: '2 days ago',
    unread: false,
    color: '#F1950A',
    bg: 'rgba(241,149,10,0.08)',
  },
];

export default function NotificationPanel({ open, onClose, onViewAll }) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div
        className="absolute right-0 z-50 flex flex-col gap-6"
        style={{
          width: '509px',
          top: '56px',
          background: '#FFFFFF',
          border: '1px solid #E3E3E3',
          boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
          borderRadius: '8px',
          padding: '24px',
          maxHeight: '732px',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg" style={{ color: '#022145' }}>Notifications</h3>
          <div className="flex items-center gap-3">
            <button className="text-xs font-medium cursor-pointer" style={{ color: '#00B77D' }}>
              Mark all as read
            </button>
            <button onClick={onClose} className="cursor-pointer">
              <X size={18} style={{ color: '#022145' }} />
            </button>
          </div>
        </div>

        {/* Notification list */}
        <div className="flex flex-col gap-3">
          {NOTIFICATIONS.map((n, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-lg cursor-pointer"
              style={{ background: n.unread ? n.bg : '#FAFAFA', border: '1px solid #E3E3E3' }}
            >
              <div
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: n.bg }}
              >
                <Bell size={16} style={{ color: n.color }} />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold" style={{ color: '#022145' }}>{n.title}</span>
                  {n.unread && (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full" style={{ background: n.color }} />
                  )}
                </div>
                <p className="text-xs leading-[18px]" style={{ color: '#595E65' }}>{n.desc}</p>
                <span className="text-xs" style={{ color: '#A1A5B7' }}>{n.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-2" style={{ borderTop: '1px solid #E3E3E3' }}>
          <button
            className="text-sm font-semibold pt-4 cursor-pointer"
            style={{ color: '#00B77D' }}
            onClick={() => { onViewAll?.(); }}
          >
            View all notifications
          </button>
        </div>
      </div>
    </>
  );
}
