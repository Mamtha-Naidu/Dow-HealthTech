import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import bodyImage from './858a3c42e79ea04cdb85dded148d55ec23e9e66d (1).png';

/* ─── Stepper (Examination step active) ─────────────────── */
const STEPS = [
  { id: 'assessment',  label: 'Assessment' },
  { id: 'examination', label: 'Examination' },
  { id: 'diagnose',    label: 'Diagnose' },
  { id: 'treatment',   label: 'Treatment Plan' },
];

function StepIcon({ step, active, done }) {
  const size = 64;
  if (active) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: '#0D7DC3',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* user-search bold icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="10" cy="8" r="4" fill="#FFFFFF"/>
          <path d="M2 20c0-3.3 3.1-6 8-6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="18" cy="18" r="3" stroke="#FFFFFF" strokeWidth="2"/>
          <path d="M20.5 20.5L23 23" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }
  if (done) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        border: '1.92px solid #D8DBE7',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#FFFFFF',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 2v6h6M8 13h4M8 17h8" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: '1.92px solid #D8DBE7',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#FFFFFF',
    }}>
      {step === 'diagnose' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V13" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/></svg>}
      {step === 'treatment' && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" stroke="#626886" strokeWidth="1.25"/><path d="M7 10h6M10 7v6" stroke="#626886" strokeWidth="1.25" strokeLinecap="round"/></svg>}
    </div>
  );
}

function ExaminationStepper() {
  const activeIdx = 1; // examination
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 92 }}>
      {STEPS.map((step, i) => (
        <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: i + 1, width: 86 }}>
          <StepIcon step={step.id} active={i === activeIdx} done={i < activeIdx} />
          <span style={{
            fontSize: 14, lineHeight: '16px', letterSpacing: '-0.01em',
            fontWeight: i === activeIdx ? 600 : 500, color: '#022145',
          }}>
            {step.label}
          </span>
        </div>
      ))}
      {/* Connector lines: 0=grey, 1=blue, 2=grey */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', height: 2, width: 82, borderRadius: 12,
          background: i === 1 ? '#0D7DC3' : '#DADEEE',
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

/* ─── Body region checklist ──────────────────────────────── */
const BODY_REGIONS = [
  'General Appearance',
  'Head and Neck',
  'Cardiovascular',
  'Respiratory',
  'Abdomen',
  'Musculoskeletal',
  'Neurological',
  'Skin',
];

/* ─── Body image carousel (placeholder) ─────────────────── */
const VIEWS = ['Front', 'Back', 'Side'];

function BodyCarousel() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + VIEWS.length) % VIEWS.length);
  const next = () => setIdx(i => (i + 1) % VIEWS.length);

  return (
    <div style={{
      boxSizing: 'border-box', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: 16, gap: 16,
      width: 360, height: 454, flexShrink: 0,
      border: '1px solid #E1EBF5', borderRadius: 12,
      overflow: 'hidden',
    }}>
      {/* Body image */}
      <div style={{
        flex: 1, width: '100%', background: '#F4F8FB',
        borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src={bodyImage}
          alt={`Body ${VIEWS[idx]} view`}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Page indicator */}
      <div style={{
        position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '4px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 32,
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF', lineHeight: '21px' }}>
          {idx + 1}/{VIEWS.length}
        </span>
      </div>

      {/* Prev arrow */}
      <button onClick={prev} style={{
        position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
        width: 32, height: 32, borderRadius: 32,
        background: 'rgba(0,0,0,0.3)', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ChevronLeft size={20} color="#FFFFFF" />
      </button>

      {/* Next arrow */}
      <button onClick={next} style={{
        position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
        width: 32, height: 32, borderRadius: 32,
        background: 'rgba(0,0,0,0.3)', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ChevronRight size={20} color="#FFFFFF" />
      </button>
    </div>
  );
}

/* ─── Examination Panel ──────────────────────────────────── */
const ExaminationPanel = ({ open, patient, onClose, onBack, onNext }) => {
  const [checked, setChecked] = useState(['General Appearance']);

  const toggleRegion = (region) => {
    setChecked(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

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
            Examination
          </span>
          <button
            onClick={onClose}
            style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <X size={20} color="#000000" />
          </button>
        </div>

        {/* ── Stepper ── */}
        <ExaminationStepper />

        {/* ── Body ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', flex: 1 }}>

          {/* Patient */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>Patient</span>
            <PatientCard patient={patient} />
          </div>

          {/* ── Two-column: carousel + checklist ── */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 24, width: '100%' }}>

            {/* Body carousel */}
            <BodyCarousel />

            {/* Region checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              <span style={{ fontSize: 20, fontWeight: 600, color: '#000000', lineHeight: '30px' }}>
                Body Region
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {BODY_REGIONS.map(region => {
                  const isChecked = checked.includes(region);
                  return (
                    <div
                      key={region}
                      onClick={() => toggleRegion(region)}
                      style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                        padding: 16, gap: 10,
                        background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 8,
                        cursor: 'pointer',
                      }}
                    >
                      {/* Checkbox indicator */}
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                        border: isChecked ? 'none' : '1px solid #292D32',
                        background: 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isChecked && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" fill="#12B76A"/>
                            <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 400, color: '#292D32', lineHeight: '24px', flex: 1 }}>
                        {region}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
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
              {/* Next */}
              <button
                onClick={onNext}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', width: 120, height: 48, background: '#0D7DC3', borderRadius: 6, border: 'none', fontSize: 16, fontWeight: 600, color: '#FFFFFF', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0b6fad'}
                onMouseLeave={e => e.currentTarget.style.background = '#0D7DC3'}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExaminationPanel;
