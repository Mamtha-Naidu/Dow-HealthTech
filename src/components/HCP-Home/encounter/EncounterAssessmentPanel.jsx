import React from 'react';
import { X, Activity, ClipboardList, Leaf, Brain, Globe, Apple } from 'lucide-react';
import VitalsQuestionnaire from './VitalsQuestionnaire';
import ExaminationPanel from './ExaminationPanel';
import DiagnosePanel from './DiagnosePanel';
import TreatmentPlanPanel from './TreatmentPlanPanel';

/* ─── Stepper ──────────────────────────────────────────── */
const STEPS = [
  { id: 'assessment',    label: 'Assessment' },
  { id: 'examination',   label: 'Examination' },
  { id: 'diagnose',      label: 'Diagnose' },
  { id: 'treatment',     label: 'Treatment Plan' },
];

function StepIcon({ step, active }) {
  const size = 64;
  if (active) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: '#0D7DC3',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ClipboardList size={24} color="#FFFFFF" />
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
      {step === 'examination' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="10" cy="8" r="4" stroke="#626886" strokeWidth="1.5"/><path d="M3 20c0-3.3 3.1-6 7-6" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/><circle cx="18" cy="18" r="3" stroke="#626886" strokeWidth="1.5"/><path d="M20.5 20.5L23 23" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/></svg>}
      {step === 'diagnose'    && <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V13" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#626886" strokeWidth="1.5" strokeLinecap="round"/></svg>}
      {step === 'treatment'   && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" stroke="#626886" strokeWidth="1.25"/><path d="M7 10h6M10 7v6" stroke="#626886" strokeWidth="1.25" strokeLinecap="round"/></svg>}
    </div>
  );
}

function Stepper({ activeStep }) {
  const activeIdx = STEPS.findIndex(s => s.id === activeStep);
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 92 }}>
      {STEPS.map((step, i) => (
        <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: i + 1, width: 86 }}>
          <StepIcon step={step.id} active={i === activeIdx} />
          <span style={{
            fontSize: 14, lineHeight: '16px', letterSpacing: '-0.01em',
            fontWeight: i === activeIdx ? 600 : 500,
            color: '#022145',
          }}>
            {step.label}
          </span>
        </div>
      ))}

      {/* Connector lines between steps */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute',
          height: 2,
          width: 82,
          borderRadius: 12,
          background: i < activeIdx ? '#0D7DC3' : '#DADEEE',
          /* centers between each circle center */
          left: `calc(${(i + 1) * 25}% - 41px + ${i === 0 ? 14 : i === 1 ? 0 : -14}px)`,
          top: 24,
          zIndex: 0,
        }} />
      ))}
    </div>
  );
}

/* ─── Category Card ─────────────────────────────────────── */
const CATEGORIES = [
  { id: 'vitals',       label: 'Vitals',               color: '#12B76A', Icon: Activity },
  { id: 'medication',   label: 'Medication Adherence',  color: '#006EEF', Icon: ClipboardList },
  { id: 'nutrition',    label: 'Nutrition',              color: '#EE445D', Icon: Apple },
  { id: 'social',       label: 'Social',                color: '#6941C6', Icon: Globe },
  { id: 'cognitive',    label: 'Cognitive',             color: '#0D7DC3', Icon: Brain },
  { id: 'environment',  label: 'Environment',           color: '#DD7403', Icon: Leaf },
];

function CategoryCard({ label, color, Icon, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        boxSizing: 'border-box',
        flex: '1 1 0',
        height: 248,
        background: '#FFFFFF',
        border: `1px solid ${selected ? color : '#E1EBF5'}`,
        borderRadius: '12px 12px 8px 8px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 8, cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: selected ? `0 0 0 2px ${color}22` : 'none',
      }}
    >
      <div style={{
        width: 48, height: 48,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={48} color={color} strokeWidth={2} />
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color, lineHeight: '21px', textAlign: 'center' }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Patient Mini-Card ─────────────────────────────────── */
function PatientCard({ patient }) {
  if (!patient) return null;
  return (
    <div style={{
      boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'flex-start',
      padding: 16, gap: 16,
      width: '100%',
      background: '#FFFFFF',
      border: '1px solid #E1EBF5',
      borderRadius: 12,
    }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#CFE5F3',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#0B68A2', letterSpacing: '-0.06em' }}>
            {patient.initials}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#293034', lineHeight: '24px' }}>
              {patient.name}
            </span>
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

/* ─── Assessment Panel ──────────────────────────────────── */
const EncounterAssessmentPanel = ({ open, patient, onClose }) => {
  const [selected, setSelected] = React.useState([]);
  const [vitalsOpen, setVitalsOpen] = React.useState(false);
  const [examinationOpen, setExaminationOpen] = React.useState(false);
  const [diagnoseOpen, setDiagnoseOpen] = React.useState(false);
  const [treatmentOpen, setTreatmentOpen] = React.useState(false);

  const toggleCategory = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    if (id === 'vitals') setVitalsOpen(true);
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.35)',
        }}
      />

      {/* Panel */}
      <div
        style={{
          boxSizing: 'border-box',
          position: 'fixed', top: 0, right: 0, zIndex: 201,
          width: 856, height: '100vh',
          overflowY: 'auto',
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
            Assessment
          </span>
          <button
            onClick={onClose}
            style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <X size={20} color="#000000" />
          </button>
        </div>

        {/* ── Stepper ── */}
        <Stepper activeStep="assessment" />

        {/* ── Body ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 35, width: '100%', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>

            {/* Patient section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                Patient
              </span>
              <PatientCard patient={patient} />
            </div>

            {/* Category grid — row 1 */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16, width: '100%' }}>
              {CATEGORIES.slice(0, 3).map(cat => (
                <CategoryCard
                  key={cat.id}
                  label={cat.label}
                  color={cat.color}
                  Icon={cat.Icon}
                  selected={selected.includes(cat.id)}
                  onClick={() => toggleCategory(cat.id)}
                />
              ))}
            </div>

            {/* Category grid — row 2 */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16, width: '100%' }}>
              {CATEGORIES.slice(3).map(cat => (
                <CategoryCard
                  key={cat.id}
                  label={cat.label}
                  color={cat.color}
                  Icon={cat.Icon}
                  selected={selected.includes(cat.id)}
                  onClick={() => toggleCategory(cat.id)}
                />
              ))}
            </div>
          </div>

          {/* ── Footer ── */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16, width: '100%', height: 48, marginTop: 'auto' }}>
            <button
              onClick={onClose}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', width: 120, height: 48, background: '#E5E9EB', borderRadius: 6, border: 'none', fontSize: 16, fontWeight: 600, color: '#022145', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#d0d6d9'}
              onMouseLeave={e => e.currentTarget.style.background = '#E5E9EB'}
            >
              Cancel
            </button>
            <button
              onClick={() => setExaminationOpen(true)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', width: 120, height: 48, background: '#0D7DC3', borderRadius: 6, border: 'none', fontSize: 16, fontWeight: 600, color: '#FFFFFF', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#0b6fad'}
              onMouseLeave={e => e.currentTarget.style.background = '#0D7DC3'}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <VitalsQuestionnaire
        open={vitalsOpen}
        onClose={() => setVitalsOpen(false)}
        onBack={() => setVitalsOpen(false)}
      />

      <ExaminationPanel
        open={examinationOpen}
        patient={patient}
        onClose={() => setExaminationOpen(false)}
        onBack={() => setExaminationOpen(false)}
        onNext={() => { setExaminationOpen(false); setDiagnoseOpen(true); }}
      />

      <DiagnosePanel
        open={diagnoseOpen}
        patient={patient}
        onClose={() => setDiagnoseOpen(false)}
        onBack={() => { setDiagnoseOpen(false); setExaminationOpen(true); }}
        onNext={() => { setDiagnoseOpen(false); setTreatmentOpen(true); }}
      />

      <TreatmentPlanPanel
        open={treatmentOpen}
        patient={patient}
        onClose={() => setTreatmentOpen(false)}
        onBack={() => { setTreatmentOpen(false); setDiagnoseOpen(true); }}
        onSubmit={() => { setTreatmentOpen(false); onClose(); }}
      />
    </>
  );
};

export default EncounterAssessmentPanel;
