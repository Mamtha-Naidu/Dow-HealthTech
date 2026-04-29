import React, { useState } from 'react';
import { Search, Plus, Eye, Trash2, X } from 'lucide-react';
import AddEncounterModal from './AddEncounterModal';
import EncounterAssessmentPanel from './EncounterAssessmentPanel';

/* ─── Sample Data ─────────────────────────────────────── */
const TODAY_ENCOUNTERS = [
  { id: 1, patientName: 'Andrew Wang',  date: 'Jul 2 2025', time: '10:00 AM', location: '123 Main St, Apt 48', status: 'Waiting' },
  { id: 2, patientName: 'Alan Bishop',  date: 'Jul 3 2025', time: '10:00 AM', location: '123 Main St, Apt 48', status: 'Waiting' },
  { id: 3, patientName: 'Linda Gomez',  date: 'Jul 4 2025', time: '10:00 AM', location: '123 Main St, Apt 48', status: 'Waiting' },
];

const PAST_ENCOUNTERS = [
  { id: 4, patientName: 'Mary Johnson', date: 'Jul 2 2025', time: '10:00 AM', location: '123 Main St, Apt 48', status: 'Submitted' },
  { id: 5, patientName: 'Alan Bishop',  date: 'Jul 3 2025', time: '10:00 AM', location: '123 Main St, Apt 48', status: 'Submitted' },
  { id: 6, patientName: 'Linda Gomez',  date: 'Jul 4 2025', time: '10:00 AM', location: '123 Main St, Apt 48', status: 'Submitted' },
];

/* ─── Status Badge ────────────────────────────────────── */
function StatusBadge({ status }) {
  if (status === 'Waiting') {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '2px 16px', gap: 8, height: 25,
        background: 'rgba(230,149,10,0.1)', border: '1px solid rgba(230,149,10,0.1)',
        borderRadius: 32, fontSize: 12, fontWeight: 600, color: '#E6950A',
        whiteSpace: 'nowrap',
      }}>
        Waiting
      </span>
    );
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '2px 16px', gap: 8, height: 25,
      background: 'rgba(18,183,106,0.1)', border: '1px solid rgba(18,183,106,0.1)',
      borderRadius: 32, fontSize: 12, fontWeight: 600, color: '#12B76A',
      whiteSpace: 'nowrap',
    }}>
      Submitted
    </span>
  );
}

/* ─── Table ───────────────────────────────────────────── */
function EncounterTable({ rows, type, onDelete, onStart }) {
  const COLS = ['Patient Name', 'Encounter Date', 'Time', 'Location', 'Status', 'Action'];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <colgroup>
        <col style={{ width: '22%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '14%' }} />
        <col style={{ width: '22%' }} />
        <col style={{ width: '12%' }} />
        <col style={{ width: '10%' }} />
      </colgroup>
      <thead>
        <tr style={{ borderBottom: '1px solid #DCDFE3' }}>
          {COLS.map(col => (
            <th key={col} style={{
              textAlign: 'left', padding: '16px 8px',
              fontSize: 12, fontWeight: 600, letterSpacing: '1.25px',
              textTransform: 'uppercase', color: '#9E9E9E',
            }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={6} style={{ textAlign: 'center', padding: '24px 8px', fontSize: 14, color: '#9E9E9E' }}>
              No records found.
            </td>
          </tr>
        ) : rows.map((row, i) => (
          <tr key={row.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F6F6F6' }}>
            <td style={{ padding: '16px 10px', fontSize: 14, fontWeight: 500, color: '#1B1B28', letterSpacing: '0.25px' }}>
              {row.patientName}
            </td>
            <td style={{ padding: '16px 10px', fontSize: 14, fontWeight: 500, color: '#1B1B28', letterSpacing: '0.25px' }}>
              {row.date}
            </td>
            <td style={{ padding: '16px 10px', fontSize: 14, fontWeight: 500, color: '#1B1B28', letterSpacing: '0.25px' }}>
              {row.time}
            </td>
            <td style={{ padding: '16px 10px', fontSize: 14, fontWeight: 500, color: '#1B1B28', letterSpacing: '0.25px' }}>
              {row.location}
            </td>
            <td style={{ padding: '16px 24px' }}>
              <StatusBadge status={row.status} />
            </td>
            <td style={{ padding: '16px 10px' }}>
              {type === 'today' ? (
                /* Start button */
                <button
                  onClick={() => onStart && onStart(row)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '8px 16px', height: 32, width: 88,
                    background: '#0D7DC3', borderRadius: 56, border: 'none',
                    cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#0b6fad'}
                  onMouseLeave={e => e.currentTarget.style.background = '#0D7DC3'}
                >
                  Start
                </button>
              ) : (
                /* View + Delete */
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button style={{
                    width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,110,239,0.1)', borderRadius: 8, border: 'none', cursor: 'pointer',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,125,195,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,110,239,0.1)'}
                  >
                    <Eye size={15} color="#0D7DC3" />
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(row.id)}
                    style={{
                      width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: '#FFE2E5', borderRadius: 8, border: 'none', cursor: 'pointer',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#ffc9ce'}
                    onMouseLeave={e => e.currentTarget.style.background = '#FFE2E5'}
                  >
                    <Trash2 size={15} color="#921919" />
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ─── Encounter Card ──────────────────────────────────── */
function EncounterCard({ title, rows, type, onDelete, onStart }) {
  const [search, setSearch] = useState('');
  const filtered = rows.filter(r =>
    r.patientName.toLowerCase().includes(search.toLowerCase()) ||
    r.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', gap: 16,
      padding: 24, background: '#FFFFFF',
      border: '1px solid #E0E0E0', borderRadius: 12,
    }}>
      {/* Card header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: 20, fontWeight: 500, color: '#222126', lineHeight: '30px' }}>
          {title}
        </span>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 16px', border: '1px solid rgba(158,158,158,0.2)',
          borderRadius: 26, width: 280,
        }}>
          <Search size={16} color="#022145" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search patient or location..."
            style={{
              flex: 1, outline: 'none', border: 'none', background: 'transparent',
              fontSize: 13, color: '#1B1B28',
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
              <X size={14} color="#9E9E9E" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <EncounterTable rows={filtered} type={type} onDelete={onDelete} onStart={onStart} />
      </div>
    </div>
  );
}

/* ─── Encounter Main ──────────────────────────────────── */
const Encounter = () => {
  const [todayRows, setTodayRows]   = useState(TODAY_ENCOUNTERS);
  const [pastRows,  setPastRows]    = useState(PAST_ENCOUNTERS);
  const [showModal, setShowModal]   = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [assessmentPatient, setAssessmentPatient] = useState(null);

  const deletePast = (id) => setPastRows(prev => prev.filter(r => r.id !== id));
  const handleStartAssessment = (row) => {
    /* Map table row to patient shape expected by panel */
    setAssessmentPatient({
      id: row.id,
      name: row.patientName,
      initials: row.patientName.split(' ').map(p => p[0]).join('.'),
      gender: 'Male',
      age: '-',
      mrn: '-',
      dob: '-',
    });
    setAssessmentOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>

      {/* ── Page title row ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#022145', lineHeight: '42px', margin: 0 }}>
            Encounter
          </h1>
          <p style={{ fontSize: 16, fontWeight: 400, color: '#022145', lineHeight: '24px', margin: 0 }}>
            Record and review clinical visits, consultations, and treatment notes.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: '12px 16px', height: 48, background: '#0D7DC3', borderRadius: 6, border: 'none',
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#0b6fad'}
          onMouseLeave={e => e.currentTarget.style.background = '#0D7DC3'}
        >
          <Plus size={20} color="#FFFFFF" />
          <span style={{ fontSize: 16, fontWeight: 600, color: '#FFFFFF' }}>Add New Encounter</span>
        </button>
      </div>

      {/* ── Today's Encounters table ── */}
      <EncounterCard
        title="Today's Encounter"
        rows={todayRows}
        type="today"
        onStart={handleStartAssessment}
      />

      {/* ── Past Encounters table ── */}
      <EncounterCard
        title="Past Encounters"
        rows={pastRows}
        type="past"
        onDelete={deletePast}
      />

      <AddEncounterModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onStart={(patient) => { setAssessmentPatient(patient); setAssessmentOpen(true); }}
      />

      <EncounterAssessmentPanel
        open={assessmentOpen}
        patient={assessmentPatient}
        onClose={() => { setAssessmentOpen(false); setAssessmentPatient(null); }}
      />
    </div>
  );
};

export default Encounter;
