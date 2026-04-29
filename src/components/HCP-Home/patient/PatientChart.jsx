import React, { useState } from 'react';
import {
  ArrowLeft, Calendar, Phone, Mail, MessageSquare,
  FileText, Activity, ClipboardList, Bug, ClipboardCheck,
  ChevronDown, ChevronUp, Receipt, Stethoscope,
} from 'lucide-react';
import chartData from '../../../data/hcp/patientChartData.json';
import VitalsDetail from './VitalsDetail';
import NotesDetail from './NotesDetail';
import ComplaintsDetail from './ComplaintsDetail';
import AllergiesDetail from './AllergiesDetail';
import OrdersDetail from './OrdersDetail';
import TreatmentDetail from './TreatmentDetail';
import LabsDetail from './LabsDetail';

/* ── Left sidebar nav items ──────────────────────── */
const NAV_ITEMS = [
  { id: 'general',       label: 'General Information', Icon: FileText      },
  { id: 'vitals',        label: 'Vitals',              Icon: Activity      },
  { id: 'history',       label: 'Notes',               Icon: ClipboardList },
  { id: 'prescriptions', label: 'Complaints',          Icon: FileText      },
  { id: 'medications',   label: 'Allergies',           Icon: Bug           },
  { id: 'encounter',     label: 'Orders',              Icon: ClipboardCheck },
  { id: 'consultations', label: 'Treatment',           Icon: Stethoscope   },
  { id: 'billing',       label: 'Labs & Diagnostics',  Icon: Receipt       },
];

/* ── Accordion sections ──────────────────────────── */
const ACCORDION = [
  { id: 'general',       Icon: Activity,      label: 'General Information' },
  { id: 'vitals',        Icon: Calendar,      label: 'Vitals'              },
  { id: 'lab',           Icon: FileText,      label: 'Lab Results'         },
  { id: 'history',       Icon: ClipboardList, label: 'Medical History'     },
  { id: 'medications',   Icon: Bug,           label: 'Medications'         },
  { id: 'encounter',     Icon: ClipboardCheck, label: 'Encounter Notes'     },
  { id: 'billing',       Icon: Receipt,       label: 'Billing'             },
  { id: 'reports',       Icon: FileText,      label: 'Reports'             },
];

/* ── Vital card ──────────────────────────────────── */
const VitalCard = ({ label, value, unit, accent }) => (
  <div
    className="flex flex-1 items-start justify-between p-3 rounded-2xl"
    style={{ background: 'rgba(229,233,235,0.3)', border: '1px solid #F4F4F4' }}
  >
    <div className="flex flex-col gap-2.5">
      <span
        className="text-[14px] font-semibold text-[#022145] leading-[20px]"
        style={{ letterSpacing: '-0.02em' }}
      >
        {label}
      </span>
      <div className="flex items-end gap-2">
        <span className="text-[32px] font-bold text-[#022145] leading-none">{value}</span>
        <span className="text-[14px] text-[#293034] mb-1">{unit}</span>
      </div>
    </div>
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{ background: accent + '33' }}
    >
      <Activity size={16} style={{ color: accent }} />
    </div>
  </div>
);

/* ── PatientChart ─────────────────────────────────── */
const PatientChart = ({ patient, onBack }) => {
  const [activeNav,    setActiveNav]    = useState('general');
  const [openSections, setOpenSections] = useState(new Set(['general']));

  const chart    = chartData[patient.id] || chartData.default;
  const initials = patient.name.split(' ').map(n => n[0]).join('').slice(0, 3);

  const toggle = id => setOpenSections(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* ── Back button ── */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 w-fit cursor-pointer hover:opacity-70 transition-opacity"
      >
        <ArrowLeft size={18} color="#022145" />
        <span className="text-[14px] font-medium text-[#022145]">Back to Patients</span>
      </button>

      {/* ── Three-column layout ── */}
      <div className="flex items-start gap-4">

        {/* ════════ LEFT SIDEBAR (211px) ════════ */}
        <div className="flex flex-col w-[211px] shrink-0 gap-0">

          {/* Patient card */}
          <div className="flex flex-col gap-4 pb-4" style={{ borderBottom: '1px solid #DFDFDF' }}>
            {/* Avatar + info */}
            <div className="flex gap-3">
              <div
                className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center"
                style={{ background: '#CFE5F3' }}
              >
                <span
                  className="text-[14px] font-bold text-[#0B68A2]"
                  style={{ letterSpacing: '-0.06em' }}
                >
                  {initials}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[18px] font-semibold text-[#293034] leading-[27px]">
                  {patient.name}
                </span>
                <div className="flex items-center gap-1">
                  <Activity size={14} color="#677883" />
                  <span className="text-[12px] text-[#293034]">{patient.gender || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className="text-[12px] font-semibold text-[#0D7DC3]"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {patient.dob
                      ? `${new Date().getFullYear() - new Date(patient.dob).getFullYear()} yr`
                      : '—'}
                  </span>
                  <span className="text-[12px] text-[#293034]">old</span>
                </div>
                <span
                  className="text-[14px] font-bold text-[#022145]"
                  style={{ fontFamily: 'Manrope, Inter, sans-serif' }}
                >
                  MRN: {chart.mrn}
                </span>
              </div>
            </div>

            {/* See More button */}
            <button
              className="w-full h-10 flex items-center justify-center rounded-md cursor-pointer hover:bg-[#0D7DC3]/5 transition-colors"
              style={{ border: '1px solid #0D7DC3' }}
            >
              <span className="text-[14px] font-medium text-[#0D7DC3]">See More</span>
            </button>
          </div>

          {/* Nav items */}
          <div className="flex flex-col mt-1">
            {NAV_ITEMS.map(item => {
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className="flex items-center w-full text-left cursor-pointer transition-colors"
                  style={{
                    padding: '0px 0px 0px 16px',
                    gap: '8px',
                    height: '48px',
                    ...(active
                      ? { background: 'rgba(13,125,195,0.1)', borderLeft: '3px solid #0D7DC3' }
                      : { borderLeft: '3px solid transparent' }),
                  }}
                >
                  <item.Icon
                    size={24}
                    color={active ? '#0D7DC3' : '#022145'}
                    className="shrink-0"
                  />
                  <span
                    style={{
                      flex: 1,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: active ? '#0D7DC3' : '#022145',
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ════════ CENTER PANEL (flex-1 ~816px) ════════ */}
        <div
          className="flex flex-col flex-1 rounded-2xl"
          style={{ background: (activeNav === 'vitals' || activeNav === 'history' || activeNav === 'prescriptions' || activeNav === 'medications' || activeNav === 'encounter' || activeNav === 'consultations' || activeNav === 'billing') ? 'transparent' : '#FFFFFF', padding: (activeNav === 'vitals' || activeNav === 'history' || activeNav === 'prescriptions' || activeNav === 'medications' || activeNav === 'encounter' || activeNav === 'consultations' || activeNav === 'billing') ? '0' : '24px 16px', gap: '20px', display: 'flex', flexDirection: 'column' }}
        >
          {/* ── Vitals detail view ── */}
          {activeNav === 'vitals' && (
            <VitalsDetail patient={patient} chart={chart} onAddNew={() => {}} />
          )}

          {/* ── Notes detail view ── */}
          {activeNav === 'history' && (
            <NotesDetail patient={patient} chart={chart} />
          )}

          {/* ── Complaints detail view ── */}
          {activeNav === 'prescriptions' && (
            <ComplaintsDetail patient={patient} chart={chart} />
          )}

          {/* ── Allergies detail view ── */}
          {activeNav === 'medications' && (
            <AllergiesDetail patient={patient} chart={chart} />
          )}

          {/* ── Orders detail view ── */}
          {activeNav === 'encounter' && (
            <OrdersDetail patient={patient} chart={chart} />
          )}

          {/* ── Treatment detail view ── */}
          {activeNav === 'consultations' && (
            <TreatmentDetail patient={patient} chart={chart} />
          )}

          {/* ── Labs & Diagnostics detail view ── */}
          {activeNav === 'billing' && (
            <LabsDetail patient={patient} chart={chart} />
          )}

          {activeNav !== 'vitals' && activeNav !== 'history' && activeNav !== 'prescriptions' && activeNav !== 'medications' && activeNav !== 'encounter' && activeNav !== 'consultations' && activeNav !== 'billing' && <>
          {/* Action buttons */}
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-2 px-3 h-10 bg-[#0D7DC3] rounded-md cursor-pointer hover:bg-[#0b6fad] transition-colors">
                <Calendar size={18} color="#fff" />
                <span className="text-[16px] font-semibold text-white whitespace-nowrap">Schedule a visit</span>
              </button>
              <button className="flex items-center gap-2 px-3 h-10 bg-[#0D7DC3] rounded-md cursor-pointer hover:bg-[#0b6fad] transition-colors">
                <Phone size={18} color="#fff" />
                <span className="text-[16px] font-semibold text-white">Call</span>
              </button>
              <button className="flex items-center gap-2 px-3 h-10 bg-[#0D7DC3] rounded-md cursor-pointer hover:bg-[#0b6fad] transition-colors">
                <Mail size={18} color="#fff" />
                <span className="text-[16px] font-semibold text-white">Email</span>
              </button>
            </div>
            <button
              className="flex items-center gap-2 px-5 h-10 rounded-md cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ background: '#25D366' }}
            >
              <MessageSquare size={18} color="#fff" />
              <span className="text-[14px] font-medium text-white">WhatsApp</span>
            </button>
          </div>
          {/* Condition / allergy badges */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[14px] font-bold text-[#293034]">{patient.name}</span>
              <span
                className="inline-flex items-center justify-center px-3 rounded-full text-[14px] font-bold text-white"
                style={{ padding: '2px 12px', background: '#EE445D', borderRadius: '70px' }}
              >
                {chart.primaryCondition}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[14px] font-bold text-[#293034]">Conditions:</span>
              {chart.conditions.map(c => (
                <span
                  key={c}
                  className="inline-flex items-center justify-center text-[14px] font-bold"
                  style={{ padding: '2px 12px', border: '1px solid #DD7403', borderRadius: '70px', color: '#DD7403' }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Stat cards — Last Encounter + Next Appointment */}
          <div className="flex gap-2">
            {[
              { label: 'Last Encounter',   date: chart.lastEncounter   },
              { label: 'Next Appointment', date: chart.nextAppointment },
            ].map(card => (
              <div
                key={card.label}
                className="flex-1 flex flex-col gap-3 p-4 rounded-2xl"
                style={{ background: 'rgba(229,233,235,0.3)', border: '1px solid #F4F4F4' }}
              >
                <span className="text-[14px] font-semibold text-[#022145]">{card.label}</span>
                <div className="flex items-center gap-2">
                  <Calendar size={16} color="#595E65" className="shrink-0" />
                  <span className="text-[14px] text-[#293034]">{card.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Accordion sections */}
          <div className="flex flex-col gap-3">
            {ACCORDION.map(({ id, Icon, label }) => {
              const isOpen = openSections.has(id);
              return (
                <div
                  key={id}
                  className="flex flex-col rounded-[10px] overflow-hidden"
                  style={{ background: '#FFFFFF', border: '1px solid #E5E9EB' }}
                >
                  {/* Section header row */}
                  <button
                    onClick={() => toggle(id)}
                    className="flex items-center gap-2.5 px-4 h-14 w-full cursor-pointer"
                  >
                    <Icon size={24} color="#0D7DC3" className="shrink-0" />
                    <span className="flex-1 text-left text-[16px] font-medium text-[#0D7DC3]">
                      {label}
                    </span>
                    {isOpen
                      ? <ChevronUp   size={14} color="#0D7DC3" className="shrink-0" />
                      : <ChevronDown size={14} color="#0D7DC3" className="shrink-0" />
                    }
                  </button>

                  {/* Expanded — General Info shows vitals grid */}
                  {isOpen && id === 'general' && (
                    <div className="px-4 pb-4 flex flex-col gap-2">
                      {/* Date + time row */}
                      <div className="flex items-center gap-3 mb-1">
                        <Calendar size={14} color="#595E65" />
                        <span className="text-[14px] text-[#595E65]">{chart.lastEncounter}</span>
                        <span className="text-[14px] text-[#595E65]">10:00</span>
                      </div>
                      {/* Vitals row 1 */}
                      <div className="flex gap-2">
                        {chart.vitals.slice(0, 3).map(v => <VitalCard key={v.label} {...v} />)}
                      </div>
                      {/* Vitals row 2 */}
                      <div className="flex gap-2">
                        {chart.vitals.slice(3).map(v => <VitalCard key={v.label} {...v} />)}
                      </div>
                    </div>
                  )}

                  {/* Expanded — other sections: placeholder */}
                  {isOpen && id !== 'general' && (
                    <div className="px-4 pb-4">
                      <p className="text-[14px] text-[#677883]">No records available.</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          </>}
        </div>

        {/* ════════ RIGHT PANEL (329px) ════════ */}
        {activeNav !== 'vitals' && activeNav !== 'history' && activeNav !== 'prescriptions' && activeNav !== 'medications' && activeNav !== 'encounter' && activeNav !== 'consultations' && activeNav !== 'billing' && <div
          className="flex flex-col gap-4 w-[329px] shrink-0 rounded-2xl p-4"
          style={{ background: '#FFFFFF', opacity: 0.9 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between" style={{ height: '32px' }}>
            <span className="text-[20px] font-semibold text-[#022145] leading-[27px]">
              Tools & Activity
            </span>
            <button
              className="flex items-center gap-2 px-2 h-8 bg-white rounded-md cursor-pointer"
              style={{ border: '1px solid #D3DADE' }}
            >
              <span className="text-[14px] font-medium text-[#022145]">Messages</span>
              <ChevronDown size={14} color="#0D7DC3" />
            </button>
          </div>

          {/* Activity feed */}
          <div className="flex flex-col">
            {chart.activity.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 py-3"
                style={{ borderBottom: '1px solid #E5E9EB' }}
              >
                {/* Avatar + text */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full"
                    style={{ background: '#FFFFFF', border: '1px solid #E5E9EB' }}
                  >
                    <MessageSquare size={14} color="#0D7DC3" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span
                      className="text-[14px] font-semibold text-[#022145] leading-[20px]"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {item.from}
                    </span>
                    <span className="text-[14px] text-[#022145] leading-[20px]">{item.message}</span>
                  </div>
                </div>
                {/* Type + time */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#022145]">{item.type}</span>
                  <span className="text-[14px] text-[#677883]">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>}

      </div>
    </div>
  );
};

export default PatientChart;
