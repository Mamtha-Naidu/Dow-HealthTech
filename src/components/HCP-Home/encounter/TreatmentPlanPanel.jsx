import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

/* ─── Stepper (Treatment Plan step active) ───────────────── */
const STEPS = [
  { id: 'assessment',  label: 'Assessment' },
  { id: 'examination', label: 'Examination' },
  { id: 'diagnose',    label: 'Diagnose' },
  { id: 'treatment',   label: 'Treatment Plan' },
];

function StepIcon({ step, active }) {
  const size = 64;

  if (active) {
    // Treatment Plan active → blue filled circle with clipboard-tick icon
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: '#0D7DC3',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8 2h8M8 2a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2M8 2H6a2 2 0 00-2 2v16a2 2 0 002 2h2" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }

  // Grey outline icons for non-active steps
  const iconMap = {
    assessment: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 2v6h6M8 13h4M8 17h8" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    examination: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="10" cy="8" r="4" stroke="#626886" strokeWidth="1.5"/>
        <path d="M2 20c0-3.3 3.1-6 8-6" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="18" cy="18" r="3" stroke="#626886" strokeWidth="1.5"/>
        <path d="M20.5 20.5L23 23" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    diagnose: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M11 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V13" stroke="#626886" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#626886" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: '1.92px solid #D8DBE7',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#FFFFFF',
    }}>
      {iconMap[step]}
    </div>
  );
}

function TreatmentStepper() {
  const activeIdx = 3; // treatment
  return (
    <div style={{
      position: 'relative', display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between', alignItems: 'center',
      width: '100%', height: 92,
    }}>
      {STEPS.map((step, i) => (
        <div key={step.id} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 12, zIndex: i + 1, width: 86,
        }}>
          <StepIcon step={step.id} active={i === activeIdx} />
          <span style={{
            fontSize: 14, lineHeight: '16px', letterSpacing: '-0.01em',
            fontWeight: i === activeIdx ? 600 : 500, color: '#022145',
          }}>
            {step.label}
          </span>
        </div>
      ))}
      {/* Connector lines: 0=grey, 1=grey, 2=blue (before active Treatment Plan) */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', height: 2, width: 82, borderRadius: 12,
          background: i === 2 ? '#0D7DC3' : '#DADEEE',
          left: `calc(${(i + 1) * 25}% - 41px + ${i === 0 ? 14 : i === 1 ? 0 : -14}px)`,
          top: 24, zIndex: 0,
        }} />
      ))}
    </div>
  );
}

/* ─── Patient Card ───────────────────────────────────────── */
function PatientCard({ patient }) {
  if (!patient) return null;
  return (
    <div style={{
      boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'flex-start',
      padding: 16, gap: 16, width: '100%',
      background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 12,
    }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', background: '#CFE5F3',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#0B68A2', letterSpacing: '-0.06em' }}>
            {patient.initials}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#293034', lineHeight: '24px' }}>{patient.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#292D32' }}>{patient.gender}</span>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E5E9EB' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0D7DC3', letterSpacing: '-0.02em' }}>Age:</span>
              <span style={{ fontSize: 12, color: '#293034' }}>{patient.age}</span>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E5E9EB' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0D7DC3', letterSpacing: '-0.02em' }}>DOB:</span>
              <span style={{ fontSize: 12, color: '#293034' }}>{patient.dob}</span>
            </div>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#022145', fontFamily: 'Manrope, Inter, sans-serif', lineHeight: '24px' }}>
            MRN: {patient.mrn}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Section Header (collapsible label row with + add) ─── */
function SectionHeader({ title }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      padding: '10px 16px', gap: 10,
      width: '100%', height: 56, boxSizing: 'border-box',
      background: 'rgba(13,125,195,0.15)', border: '1px solid #E1EBF5', borderRadius: 8,
    }}>
      <span style={{ flex: 1, fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#022145' }}>
        {title}
      </span>
      <button style={{
        width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer',
        padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M8 16h16M16 8v16" stroke="#022145" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

/* ─── Order Item ─────────────────────────────────────────── */
function OrderItem({ name, dosage, note, accentColor }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      gap: 8, width: '100%',
      borderLeft: `4px solid ${accentColor}`, borderRadius: 8,
    }}>
      <div style={{
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        padding: 16, gap: 16, width: '100%',
        background: '#FFFFFF',
        borderWidth: '1px 1px 1px 0px', borderStyle: 'solid', borderColor: '#E1EBF5',
        borderRadius: 8,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          {/* Name row + New RX button */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, width: '100%' }}>
            <span style={{ flex: 1, fontSize: 18, fontWeight: 600, lineHeight: '27px', letterSpacing: '-0.02em', color: '#022145' }}>
              {name}
            </span>
            <button style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              padding: '12px 16px', gap: 12,
              width: 105, height: 40,
              background: '#466FFF', borderRadius: 56, border: 'none',
              fontSize: 14, fontWeight: 600, lineHeight: '24px', color: '#FFFFFF',
              cursor: 'pointer', flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#3a5ee0'}
              onMouseLeave={e => e.currentTarget.style.background = '#466FFF'}
            >
              New RX
            </button>
          </div>
          {/* Meta rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
            <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#607085' }}>{dosage}</span>
            <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#607085' }}>{note}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Schedule Card ──────────────────────────────────────── */
function ScheduleCard({ bgColor, iconColor, iconType }) {
  return (
    <div style={{
      flex: 1, height: 136,
      border: '1px solid #E1EBF5', borderRadius: 12,
      overflow: 'hidden', position: 'relative',
      background: bgColor,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {iconType === 'document' ? (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M23 4H10a3 3 0 00-3 3v26a3 3 0 003 3h20a3 3 0 003-3V14l-10-10z" fill={iconColor}/>
          <path d="M23 4v10h10" fill={iconColor} opacity="0.6"/>
          <path d="M14 22h12M14 28h8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" fill={iconColor}/>
          <path d="M16 20l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M26 14h4v4" stroke={iconColor} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        </svg>
      )}
    </div>
  );
}

/* ─── Follow-Up Item ─────────────────────────────────────── */
function FollowUpItem({ items }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      padding: 16, gap: 12,
      width: '100%', boxSizing: 'border-box',
      background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8,
    }}>
      {items.map((item, i) => (
        <span key={i} style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#292D32', width: '100%' }}>
          {item}
        </span>
      ))}
    </div>
  );
}

/* ─── Treatment Plan Panel ───────────────────────────────── */
const TreatmentPlanPanel = ({ open, patient, onClose, onBack, onSubmit }) => {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.35)' }}
      />

      {/* Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          boxSizing: 'border-box',
          position: 'fixed', top: 0, right: 0, zIndex: 301,
          width: 856, height: '100vh', overflowY: 'auto',
          background: '#FFFFFF',
          border: '1px solid #EBEBEB',
          boxShadow: '0px 7px 29px rgba(100,100,111,0.2)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 40, gap: 32,
        }}
      >
        {/* ── Title row ── */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span style={{ fontSize: 24, fontWeight: 600, lineHeight: '24px', letterSpacing: '-0.01em', color: '#022145' }}>
            Treatment Plan
          </span>
          <button
            onClick={onClose}
            style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <X size={20} color="#000000" />
          </button>
        </div>

        {/* ── Stepper ── */}
        <TreatmentStepper />

        {/* ── Body ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', flex: 1 }}>

          {/* Patient */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>Patient</span>
            <PatientCard patient={patient} />
          </div>

          {/* ── Orders section ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <SectionHeader title="Orders" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <OrderItem
                name="Prednisolone"
                dosage="40mg daily for 5 days"
                note="Take with food"
                accentColor="#FF8604"
              />
            </div>
          </div>

          {/* ── Schedule List ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <span style={{ fontSize: 20, fontWeight: 600, lineHeight: '30px', color: '#000000' }}>
              Schedule List
            </span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 16, width: '100%' }}>
              <ScheduleCard bgColor="#ECE3FF" iconColor="#6941C6" iconType="document" />
              <ScheduleCard bgColor="#D1FCE8" iconColor="#12B76A" iconType="play" />
            </div>
          </div>

          {/* ── Follow-Up Plan section ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <SectionHeader title="Follow-Up Plan" />
            <FollowUpItem items={['Schedule Follow up', 'Respiratory therapy referral']} />
          </div>

          {/* ── Footer ── */}
          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
            alignItems: 'center', gap: 16, width: '100%', height: 48, marginTop: 'auto', paddingTop: 8,
          }}>
            {/* Cancel */}
            <button
              onClick={onClose}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', width: 120, height: 48, background: '#E5E9EB', borderRadius: 6, border: 'none', fontSize: 16, fontWeight: 600, color: '#022145', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#d0d6d9'}
              onMouseLeave={e => e.currentTarget.style.background = '#E5E9EB'}
            >
              Cancel
            </button>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
              {/* Previous */}
              <button
                onClick={onBack}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', width: 120, height: 48, background: '#FFFFFF', borderRadius: 6, border: '1px solid #0D7DC3', fontSize: 16, fontWeight: 600, color: '#0D7DC3', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,125,195,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
              >
                Previous
              </button>
              {/* Submit Encounter */}
              <button
                onClick={onSubmit}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', width: 192, height: 48, background: '#0D7DC3', borderRadius: 6, border: 'none', fontSize: 16, fontWeight: 600, color: '#FFFFFF', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0b6fad'}
                onMouseLeave={e => e.currentTarget.style.background = '#0D7DC3'}
              >
                Submit Encounter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TreatmentPlanPanel;
