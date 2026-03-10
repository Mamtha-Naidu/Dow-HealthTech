import React, { useState } from 'react';
import {
  Search,
  X,
  Home,
  Users,
  Activity,
  Calendar,
  MessageSquare,
} from 'lucide-react';

/* ── Static data ───────────────────────────────────────────────── */
const FAMILY_MEMBERS = [
  { initials: 'JS', name: 'Jane Smith',    relation: 'Mother'  },
  { initials: 'AW', name: 'Andrew Wang',  relation: 'Father'  },
  { initials: 'LS', name: 'Lisa Simmons', relation: 'Aunt'    },
];

const PRESCRIPTIONS = [
  { name: 'Amoxicillin' },
  { name: 'Lisinopril'  },
  { name: 'Loratadine'  },
];

const FILTER_TABS = [
  { id: 'home',          label: 'Home',                icon: Home         },
  { id: 'beneficiaries', label: 'Beneficiaries',       icon: Users        },
  { id: 'health',        label: 'Health Monitoring',   icon: Activity     },
  { id: 'scheduling',   label: 'Service & Scheduling', icon: Calendar     },
  { id: 'communication', label: 'Communication',       icon: MessageSquare },
];

/* ── PillIcon (simple SVG placeholder) ────────────────────────── */
function PillIcon() {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full"
      style={{ background: '#E8F5E9' }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="10" width="18" height="4" rx="2" fill="#00B77D" opacity="0.3" />
        <rect x="3" y="10" width="9"  height="4" rx="2" fill="#00B77D" />
      </svg>
    </div>
  );
}

/* ── GlobalSearch ──────────────────────────────────────────────── */
export default function GlobalSearch({ onClose }) {
  const [query,     setQuery]     = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const filterMembers = FAMILY_MEMBERS.filter(
    (m) =>
      query === '' ||
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.relation.toLowerCase().includes(query.toLowerCase())
  );

  const filterRx = PRESCRIPTIONS.filter(
    (r) => query === '' || r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="relative flex flex-col min-h-screen w-full"
      style={{ background: '#FFFFFF' }}
    >
      {/* Blurred gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(76.27deg, #ADEBC4 -0.79%, #ADEBC4 89.29%)',
          opacity: 0.1,
          filter: 'blur(300px)',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col gap-6 px-4 sm:px-6 lg:px-14 pb-12 pt-6"
        style={{ zIndex: 1 }}
      >
        {/* Main card */}
        <div
          className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E0E0E0',
            borderRadius: '12px',
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <h2
              className="text-2xl sm:text-3xl font-medium"
              style={{ lineHeight: '1.4', color: '#222126' }}
            >
              Search
            </h2>
            {onClose && (
              <button
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <X size={22} style={{ color: '#022145' }} />
              </button>
            )}
          </div>

          {/* Search input */}
          <div
            className="flex items-center gap-3 px-6 py-4"
            style={{
              background: '#FFFFFF',
              border: '1px solid #EBEBEB',
              borderRadius: '8px',
            }}
          >
            <Search size={24} style={{ color: '#022145', flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for family members, prescriptions..."
              autoFocus
              className="flex-1 bg-transparent text-sm focus:outline-none"
              style={{ color: '#022145' }}
            />
            {query && (
              <button onClick={() => setQuery('')} className="cursor-pointer">
                <X size={16} style={{ color: '#9E9E9E' }} />
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div
            className="flex items-center gap-3 flex-wrap"
            style={{
              background: '#FFFFFF',
              border: '1px solid #EBEBEB',
              borderRadius: '12px 12px 0 0',
              padding: '16px 24px',
              borderBottom: '1px solid #EBEBEB',
            }}
          >
            {FILTER_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors"
                  style={{
                    background: isActive ? '#22C55E' : '#F3F3F3',
                    color: isActive ? '#FFFFFF' : '#022145',
                  }}
                >
                  <Icon
                    size={20}
                    style={{ color: isActive ? '#FFFFFF' : '#022145' }}
                  />
                  <span
                    className="text-base font-medium whitespace-nowrap"
                    style={{ color: isActive ? '#FFFFFF' : '#022145' }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results area */}
          <div
            className="flex flex-col"
            style={{
              border: '1px solid #EBEBEB',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {/* ── Family Members section ── */}
            <div
              className="flex flex-col gap-4 p-6"
              style={{ borderBottom: '1px solid #EBEBEB' }}
            >
              {/* Section heading */}
              <div className="flex items-center gap-2">
                <span
                  className="font-semibold text-xl"
                  style={{ letterSpacing: '-0.02em', color: '#000000' }}
                >
                  Family Member
                </span>
                <div
                  className="flex items-center justify-center w-6 h-6 rounded"
                  style={{
                    background: '#F3F3F3',
                    border: '1px solid #EBEBEB',
                  }}
                >
                  <span
                    className="text-base font-semibold"
                    style={{ letterSpacing: '-0.02em', color: '#006EEF' }}
                  >
                    {filterMembers.length}
                  </span>
                </div>
              </div>

              {/* Member rows */}
              <div className="flex flex-col gap-4">
                {filterMembers.length === 0 ? (
                  <p className="text-sm" style={{ color: '#9E9E9E' }}>
                    No family members match your search.
                  </p>
                ) : (
                  filterMembers.map((m, i) => (
                    <div key={i} className="flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full"
                        style={{ background: '#E0DCFF' }}
                      >
                        <span
                          className="font-bold text-sm"
                          style={{
                            color: '#1B00E9',
                            letterSpacing: '-0.06em',
                          }}
                        >
                          {m.initials}
                        </span>
                      </div>
                      {/* Info */}
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <span
                          className="font-semibold text-base"
                          style={{ color: '#022145' }}
                        >
                          {m.name}
                        </span>
                        <span
                          className="text-sm"
                          style={{
                            color: '#022145',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {m.relation}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ── Prescription section ── */}
            <div className="flex flex-col gap-4 p-6">
              {/* Section heading */}
              <div className="flex items-center gap-2">
                <span
                  className="font-semibold text-xl"
                  style={{ letterSpacing: '-0.02em', color: '#000000' }}
                >
                  Prescription
                </span>
                <div
                  className="flex items-center justify-center w-6 h-6 rounded"
                  style={{
                    background: '#F3F3F3',
                    border: '1px solid #EBEBEB',
                  }}
                >
                  <span
                    className="text-base font-semibold"
                    style={{ letterSpacing: '-0.02em', color: '#006EEF' }}
                  >
                    {filterRx.length}
                  </span>
                </div>
              </div>

              {/* Prescription rows */}
              <div className="flex flex-col">
                {filterRx.length === 0 ? (
                  <p className="text-sm" style={{ color: '#9E9E9E' }}>
                    No prescriptions match your search.
                  </p>
                ) : (
                  filterRx.map((rx, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-3"
                      style={{
                        borderBottom:
                          i < filterRx.length - 1
                            ? '1px solid #EBEBEB'
                            : 'none',
                      }}
                    >
                      <PillIcon />
                      <span
                        className="text-sm font-medium"
                        style={{ color: '#022145' }}
                      >
                        {rx.name}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
