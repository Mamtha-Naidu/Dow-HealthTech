import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Shield,
  Bell,
  CreditCard,
  HelpCircle,
  Headphones,
  LogOut,
  Edit,
  X,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

/* ── helpers ─────────────────────────────────────────────────── */
function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
}

/* ── Toast ───────────────────────────────────────────────────── */
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      className="fixed top-6 right-6 z-[9999] flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl"
      style={{ background: '#022145', color: '#FFFFFF', minWidth: '260px' }}
    >
      <LogOut size={20} style={{ color: '#00B77D' }} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

/* ── ComingSoon placeholder ──────────────────────────────────── */
function ComingSoon({ label }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-32 gap-4">
      <div
        className="flex items-center justify-center w-20 h-20 rounded-2xl mb-2"
        style={{ background: 'rgba(0,183,125,0.08)' }}
      >
        <Clock size={40} style={{ color: '#00B77D' }} />
      </div>
      <h2 className="text-2xl font-semibold" style={{ color: '#022145' }}>
        {label} — Coming Soon
      </h2>
      <p className="text-base" style={{ color: '#9E9E9E' }}>
        This section is under development. Check back soon!
      </p>
    </div>
  );
}

/* ── FormField ───────────────────────────────────────────────── */
function FormField({ label, value, onChange, type = 'text', fullWidth = false, readOnly = false }) {
  return (
    <div className={`flex flex-col gap-3 ${fullWidth ? 'w-full' : 'flex-1 min-w-0'}`}>
      <label className="text-sm font-semibold" style={{ color: '#022145' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="px-4 py-3 rounded-lg text-sm font-medium focus:outline-none transition-colors"
        style={{
          background: '#F9F9F9',
          border: '1px solid #E5E9EE',
          color: '#022145',
          cursor: readOnly ? 'default' : 'text',
        }}
      />
    </div>
  );
}

/* ── AccountInfoRow ──────────────────────────────────────────── */
function InfoRow({ label, value, green = false }) {
  return (
    <>
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-semibold" style={{ color: '#022145', letterSpacing: '-0.02em' }}>
          {label}
        </span>
        <span
          className="text-sm font-medium"
          style={{ color: green ? '#00B77D' : '#022145', opacity: green ? 1 : 0.5 }}
        >
          {value}
        </span>
      </div>
      <div className="w-full h-px" style={{ background: '#EEEEEE' }} />
    </>
  );
}

/* ── Profile (main) ──────────────────────────────────────────── */
export default function Profile({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.name || user?.username || user?.email?.split('@')[0] || 'Kwame Asante';

  /* form state */
  const [form, setForm] = useState({
    firstName:        displayName.split(' ')[0] ?? '',
    lastName:         displayName.split(' ').slice(1).join(' ') ?? '',
    email:            user?.email ?? 'kwame.asante@email.com',
    phone:            user?.phone ?? '+1 (713) 555-0182',
    dob:              user?.dob ?? '1977-04-12',
    address:          user?.address ?? '1234 Main Street, Houston, TX 77001',
    emergencyContact: user?.emergencyContact ?? 'Ama Asante',
    emergencyPhone:   user?.emergencyPhone ?? '+1 (713) 555-0199',
  });

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  /* sidebar nav */
  const [sidebarTab, setSidebarTab] = useState('profile');
  /* profile inner tab */
  const [profileTab, setProfileTab] = useState('personal');

  /* toast */
  const [toast, setToast] = useState(false);

  /* edit mode */
  const [editing, setEditing] = useState(false);

  const handleLogout = () => {
    setToast(true);
  };

  const handleToastDone = () => {
    setToast(false);
    logout();
    navigate('/');
  };

  const handleSave = () => {
    setEditing(false);
    // persist back to user if needed
  };

  /* sidebar items */
  const ACCOUNT_ITEMS = [
    { id: 'profile',       label: 'Profile',             icon: User },
    { id: 'security',      label: 'Security',            icon: Shield },
    { id: 'notifications', label: 'Notifications',       icon: Bell },
    { id: 'subscription',  label: 'Subscription Plans',  icon: CreditCard },
  ];
  const MORE_ITEMS = [
    { id: 'helpcenter',    label: 'Help Center',         icon: HelpCircle },
    { id: 'support',       label: 'Customer Support',    icon: Headphones },
  ];

  /* profile inner tabs */
  const PROFILE_TABS = [
    { id: 'personal',      label: 'Personal Informations' },
    { id: 'security',      label: 'Security & Privacy'    },
    { id: 'notifications', label: 'Notifications'          },
    { id: 'subscriptions', label: 'Subscriptions'          },
    { id: 'activity',      label: 'Activity'               },
  ];

  /* ── Render ── */
  return (
    <>
      {toast && <Toast message="You have been signed out." onDone={handleToastDone} />}

      <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-14 py-8">
        {/* Close row */}
        {onClose && (
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity"
              style={{ color: '#022145' }}
            >
              <X size={18} />
              Close
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* ── Left sidebar ── */}
          <div
            className="flex flex-col gap-6 w-full lg:w-[329px] flex-shrink-0"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E3E3E3',
              borderRadius: '12px',
              padding: '24px 0',
            }}
          >
            {/* Account section */}
            <div className="flex flex-col gap-0">
              <p
                className="px-6 pb-3 text-sm font-semibold tracking-[0.04em] uppercase"
                style={{ color: '#A1A5B7' }}
              >
                Account
              </p>
              {ACCOUNT_ITEMS.map(({ id, label, icon: Icon }) => {
                const active = sidebarTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSidebarTab(id)}
                    className="flex items-center gap-4 px-6 py-4 cursor-pointer transition-colors w-full text-left"
                    style={{
                      background: active ? 'rgba(0,183,125,0.1)' : 'transparent',
                      borderLeft: active ? '3px solid #00B77D' : '3px solid transparent',
                      color: active ? '#00B77D' : '#022145',
                    }}
                  >
                    <Icon size={20} style={{ color: active ? '#00B77D' : '#022145', flexShrink: 0 }} />
                    <span className="text-base font-medium">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* More section */}
            <div className="flex flex-col gap-0">
              <p
                className="px-6 pb-3 text-sm font-semibold tracking-[0.04em] uppercase"
                style={{ color: '#A1A5B7' }}
              >
                More
              </p>
              {MORE_ITEMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSidebarTab(id)}
                  className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors w-full text-left"
                  style={{ color: '#022145' }}
                >
                  <Icon size={20} style={{ color: '#022145', flexShrink: 0 }} />
                  <span className="text-base font-medium">{label}</span>
                </button>
              ))}

              {/* Sign Out */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-red-50 transition-colors w-full text-left"
                style={{ color: '#022145' }}
              >
                <LogOut size={20} style={{ color: '#022145', flexShrink: 0 }} />
                <span className="text-base font-medium">Sign Out</span>
              </button>
            </div>
          </div>

          {/* ── Right content ── */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">

            {/* ── Non-profile sidebar tabs show Coming Soon ── */}
            {sidebarTab !== 'profile' && (
              <div
                className="flex flex-col"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  borderRadius: '12px',
                  minHeight: '480px',
                }}
              >
                <ComingSoon
                  label={
                    [...ACCOUNT_ITEMS, ...MORE_ITEMS].find((i) => i.id === sidebarTab)?.label ?? ''
                  }
                />
              </div>
            )}

            {/* ── Profile tab ── */}
            {sidebarTab === 'profile' && (
              <>
                {/* Profile header card */}
                <div
                  className="flex flex-col gap-6 p-6"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E0E0E0',
                    borderRadius: '12px',
                  }}
                >
                  {/* User info row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Avatar */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full"
                      style={{ background: '#E0DCFF' }}
                    >
                      <span
                        className="font-bold text-lg"
                        style={{ color: '#1B00E9', letterSpacing: '-0.06em' }}
                      >
                        {getInitials(displayName)}
                      </span>
                    </div>

                    {/* Name + meta */}
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <span className="text-base font-semibold" style={{ color: '#022145' }}>
                        {displayName}
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm" style={{ color: '#022145', letterSpacing: '-0.02em' }}>
                          Premium Care Subscriber
                        </span>
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: '#D9D9D9' }}
                        />
                        <span className="text-sm" style={{ color: '#022145', letterSpacing: '-0.02em' }}>
                          Member since 2024
                        </span>
                      </div>
                    </div>

                    {/* Edit Profile button */}
                    <button
                      onClick={() => setEditing((e) => !e)}
                      className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-lg cursor-pointer transition-opacity hover:opacity-80"
                      style={{ background: '#00B77D', color: '#FFFFFF', height: '48px' }}
                    >
                      <Edit size={20} />
                      <span className="text-base font-semibold">
                        {editing ? 'Cancel' : 'Edit Profile'}
                      </span>
                    </button>
                  </div>

                  {/* Stats bar */}
                  <div className="flex items-center" style={{ borderTop: '1px solid #E3E3E3', paddingTop: '16px' }}>
                    {[
                      { value: '3',  label: 'Family Member'   },
                      { value: '47', label: 'Health Visits'    },
                      { value: '3',  label: 'Messages Sent'    },
                      { value: '6',  label: 'Video Calls'      },
                    ].map((stat, i, arr) => (
                      <React.Fragment key={i}>
                        <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1">
                          <span className="text-xl sm:text-3xl font-semibold" style={{ color: '#022145' }}>
                            {stat.value}
                          </span>
                          <span className="text-xs sm:text-sm text-center" style={{ color: '#022145', letterSpacing: '-0.02em' }}>
                            {stat.label}
                          </span>
                        </div>
                        {i < arr.length - 1 && (
                          <div className="w-px self-stretch" style={{ background: '#E3E3E3' }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Inner content: form + account summary */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Form card */}
                  <div
                    className="flex flex-col gap-5 p-6 flex-1 min-w-0"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E0E0E0',
                      borderRadius: '12px',
                    }}
                  >
                    {/* Inner tabs */}
                    <div
                      className="flex items-center gap-0 overflow-x-auto"
                      style={{ borderBottom: '1px solid #DFDFDF' }}
                    >
                      {PROFILE_TABS.map(({ id, label }) => {
                        const active = profileTab === id;
                        return (
                          <button
                            key={id}
                            onClick={() => setProfileTab(id)}
                            className="flex-shrink-0 px-2 sm:px-4 py-3 sm:py-4 cursor-pointer whitespace-nowrap transition-colors text-xs sm:text-base"
                            style={{
                              borderBottom: active ? '2px solid #00B77D' : '2px solid transparent',
                              color: active ? '#00B77D' : '#022145',
                              fontWeight: active ? 600 : 500,
                              marginBottom: '-1px',
                            }}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Personal Information form */}
                    {profileTab === 'personal' && (
                      <div className="flex flex-col gap-5">
                        <h3 className="text-xl font-medium" style={{ color: '#222126' }}>
                          Personal Information
                        </h3>

                        {/* Row 1: First + Last Name */}
                        <div className="flex flex-col sm:flex-row gap-5">
                          <FormField
                            label="First Name"
                            value={form.firstName}
                            onChange={setField('firstName')}
                            readOnly={!editing}
                          />
                          <FormField
                            label="Last Name"
                            value={form.lastName}
                            onChange={setField('lastName')}
                            readOnly={!editing}
                          />
                        </div>

                        {/* Row 2: Email (full width) */}
                        <FormField
                          label="Email Address"
                          value={form.email}
                          onChange={setField('email')}
                          type="email"
                          fullWidth
                          readOnly={!editing}
                        />

                        {/* Row 3: Phone + DOB */}
                        <div className="flex flex-col sm:flex-row gap-5">
                          <FormField
                            label="Phone Number"
                            value={form.phone}
                            onChange={setField('phone')}
                            type="tel"
                            readOnly={!editing}
                          />
                          <FormField
                            label="Date of Birth"
                            value={form.dob}
                            onChange={setField('dob')}
                            type="date"
                            readOnly={!editing}
                          />
                        </div>

                        {/* Row 4: Address (full width) */}
                        <FormField
                          label="Address"
                          value={form.address}
                          onChange={setField('address')}
                          fullWidth
                          readOnly={!editing}
                        />

                        {/* Row 5: Emergency Contact + Phone */}
                        <div className="flex flex-col sm:flex-row gap-5">
                          <FormField
                            label="Emergency Contact"
                            value={form.emergencyContact}
                            onChange={setField('emergencyContact')}
                            readOnly={!editing}
                          />
                          <FormField
                            label="Emergency Phone"
                            value={form.emergencyPhone}
                            onChange={setField('emergencyPhone')}
                            type="tel"
                            readOnly={!editing}
                          />
                        </div>

                        {/* Save button — only shown in edit mode */}
                        {editing && (
                          <div className="flex justify-end pt-2">
                            <button
                              onClick={handleSave}
                              className="px-8 py-3 rounded-lg text-base font-semibold text-white cursor-pointer transition-opacity hover:opacity-80"
                              style={{ background: '#00B77D', height: '48px' }}
                            >
                              Save Changes
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Other inner tabs → Coming Soon */}
                    {profileTab !== 'personal' && (
                      <ComingSoon
                        label={PROFILE_TABS.find((t) => t.id === profileTab)?.label ?? ''}
                      />
                    )}
                  </div>

                  {/* Account Summary card */}
                  <div
                    className="flex flex-col gap-4 p-6 w-full lg:w-[398px] flex-shrink-0"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E0E0E0',
                      borderRadius: '12px',
                    }}
                  >
                    <h3 className="text-xl font-medium" style={{ color: '#222126' }}>
                      Account Summary
                    </h3>
                    <div className="flex flex-col gap-0">
                      <InfoRow label="Member Since"      value="January 15, 2024"    />
                      <InfoRow label="Account Status"    value="Active"               green />
                      <InfoRow label="Subscription Plan" value="Comprehensive Care"   />
                      <InfoRow label="Next Billing"      value="August 15, 2025"      />
                      <InfoRow label="Family Members"    value="3 Active"             />
                      <InfoRow label="Primary Language"  value="English"              />
                      <InfoRow label="Time Zone"         value="Central Time (UTC-6)" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
