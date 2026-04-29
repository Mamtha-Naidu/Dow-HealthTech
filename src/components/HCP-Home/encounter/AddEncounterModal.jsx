import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import EncounterAssessmentPanel from './EncounterAssessmentPanel';

/* ─── Mock patient search results ─── */
const PATIENTS = [
  { id: 1, name: 'Andrew Wang',  initials: 'A.W', gender: 'Male', age: 28, mrn: 'JD-3789-012-3B', dob: '01/01/1997' },
  { id: 2, name: 'Mary Johnson', initials: 'M.J', gender: 'Female', age: 34, mrn: 'JD-4521-089-2A', dob: '05/12/1990' },
  { id: 3, name: 'Alan Bishop',  initials: 'A.B', gender: 'Male', age: 45, mrn: 'JD-9934-211-7C', dob: '22/08/1979' },
  { id: 4, name: 'Linda Gomez',  initials: 'L.G', gender: 'Female', age: 52, mrn: 'JD-1122-445-5D', dob: '15/03/1972' },
];

const AddEncounterModal = ({ open, onClose, onStart }) => {
  const [query, setQuery]           = useState('');
  const [selected, setSelected]     = useState(null);
  const [showAssessment, setShowAssessment] = useState(false);

  if (!open && !showAssessment) return null;

  const results = query.trim()
    ? PATIENTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleStart = () => {
    if (!selected) return;
    onStart && onStart(selected);
    setShowAssessment(true);
    onClose();
  };

  const handleClose = () => {
    setQuery('');
    setSelected(null);
    onClose();
  };

  const modalJsx = open ? (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Modal card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          padding: 40, gap: 32,
          width: 856, maxWidth: '95vw',
          background: '#FFFFFF',
          border: '1px solid #EBEBEB',
          boxShadow: '0px 7px 29px rgba(100,100,111,0.2)',
          borderRadius: 16,
        }}
      >
        {/* ── Title row ── */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          width: '100%',
        }}>
          <span style={{
            fontSize: 24, fontWeight: 600, lineHeight: '24px',
            letterSpacing: '-0.01em', color: '#022145',
          }}>
            Start Encounter
          </span>
          <button
            onClick={handleClose}
            style={{
              width: 24, height: 24, display: 'flex', alignItems: 'center',
              justifyContent: 'center', background: 'none', border: 'none',
              cursor: 'pointer', padding: 0,
            }}
          >
            <X size={20} color="#000000" />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'flex-end', gap: 35, width: '100%',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16, width: '100%' }}>

            {/* Find Patient field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <label style={{
                fontSize: 16, fontWeight: 600, lineHeight: '24px',
                letterSpacing: '-0.02em', color: '#022145',
              }}>
                Find Patient*
              </label>
              <input
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(null); }}
                placeholder="Search by name…"
                style={{
                  display: 'flex', alignItems: 'center',
                  padding: '10px 16px', gap: 10,
                  width: '100%', height: 56, boxSizing: 'border-box',
                  background: '#FFFFFF', border: '1px solid #E1EBF5',
                  borderRadius: 8, fontSize: 16, color: '#022145',
                  outline: 'none',
                }}
              />
            </div>

            {/* Search Results */}
            {(results.length > 0 || selected) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
                <span style={{
                  fontSize: 16, fontWeight: 600, lineHeight: '24px',
                  letterSpacing: '-0.02em', color: '#022145',
                }}>
                  Search Results
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                  {(selected ? [selected] : results).map(p => (
                    <div
                      key={p.id}
                      onClick={() => { setSelected(p); setQuery(p.name); }}
                      style={{
                        boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'center', alignItems: 'flex-start',
                        padding: 16, gap: 16,
                        width: '100%',
                        background: '#FFFFFF',
                        border: `1px solid ${selected?.id === p.id ? '#0D7DC3' : '#E1EBF5'}`,
                        borderRadius: 12, cursor: 'pointer',
                        transition: 'border-color 0.15s',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%' }}>
                        {/* Avatar */}
                        <div style={{
                          width: 56, height: 56, borderRadius: '50%',
                          background: '#CFE5F3',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <span style={{ fontSize: 16, fontWeight: 700, color: '#0B68A2', letterSpacing: '-0.06em' }}>
                            {p.initials}
                          </span>
                        </div>

                        {/* Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                          {/* Name + meta row */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <span style={{ fontSize: 16, fontWeight: 600, color: '#293034', lineHeight: '24px' }}>
                              {p.name}
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              {/* Gender */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ fontSize: 12, fontWeight: 400, color: '#292D32', lineHeight: '21px' }}>
                                  {p.gender}
                                </span>
                              </div>
                              {/* separator */}
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E5E9EB' }} />
                              {/* Age */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: '#0D7DC3', letterSpacing: '-0.02em', lineHeight: '21px' }}>
                                  Age:
                                </span>
                                <span style={{ fontSize: 12, fontWeight: 400, color: '#293034', lineHeight: '21px' }}>
                                  {p.age}
                                </span>
                              </div>
                              {/* separator */}
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E5E9EB' }} />
                              {/* DOB */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: '#0D7DC3', letterSpacing: '-0.02em', lineHeight: '21px' }}>
                                  DOB:
                                </span>
                                <span style={{ fontSize: 12, fontWeight: 400, color: '#293034', lineHeight: '21px' }}>
                                  {p.dob}
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* MRN */}
                          <div>
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#022145', fontFamily: 'Manrope, Inter, sans-serif', lineHeight: '24px' }}>
                              MRN: {p.mrn}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Footer buttons ── */}
          <div style={{
            display: 'flex', flexDirection: 'row',
            justifyContent: 'flex-end', alignItems: 'center', gap: 16,
            width: '100%', height: 48,
          }}>
            {/* Cancel */}
            <button
              onClick={handleClose}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '12px 16px', width: 120, height: 48,
                background: '#E5E9EB', borderRadius: 6, border: 'none',
                fontSize: 16, fontWeight: 600, color: '#022145', cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#d0d6d9'}
              onMouseLeave={e => e.currentTarget.style.background = '#E5E9EB'}
            >
              Cancel
            </button>
            {/* Start */}
            <button
              onClick={handleStart}
              disabled={!selected}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '12px 16px', width: 120, height: 48,
                background: selected ? '#0D7DC3' : 'rgba(13,125,195,0.4)',
                borderRadius: 6, border: 'none',
                fontSize: 16, fontWeight: 600, color: '#FFFFFF',
                cursor: selected ? 'pointer' : 'not-allowed',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (selected) e.currentTarget.style.background = '#0b6fad'; }}
              onMouseLeave={e => { if (selected) e.currentTarget.style.background = '#0D7DC3'; }}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {modalJsx}
      <EncounterAssessmentPanel
        open={showAssessment}
        patient={selected}
        onClose={() => { setShowAssessment(false); setQuery(''); setSelected(null); }}
      />
    </>
  );
};

export default AddEncounterModal;
