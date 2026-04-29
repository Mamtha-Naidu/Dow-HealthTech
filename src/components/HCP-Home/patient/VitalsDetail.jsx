import React, { useState } from 'react';
import AddVitalPanel from './AddVitalPanel';
import DeleteConfirmModal from './DeleteConfirmModal';

/* ── Sample vitals history rows ─────────────────── */
const INITIAL_VITALS = [
  { id: 1, date: '16/01/2025 - 10:00 AM', bp: '120/90', hr: '72', temp: '98.6°F', spo2: '98%', pain: '10', bpFlag: false },
  { id: 2, date: '17/01/2025 - 10:00 AM', bp: '140/90', hr: '72', temp: '98.6°F', spo2: '98%', pain: '5',  bpFlag: true  },
  { id: 3, date: '18/01/2025 - 10:00 AM', bp: '138/90', hr: '72', temp: '98.6°F', spo2: '98%', pain: '3',  bpFlag: true  },
  { id: 4, date: '19/01/2025 - 10:00 AM', bp: '130/80', hr: '72', temp: '98.6°F', spo2: '98%', pain: '2',  bpFlag: false },
  { id: 5, date: '20/01/2025 - 10:00 AM', bp: '130/80', hr: '72', temp: '98.6°F', spo2: '98%', pain: '1',  bpFlag: false },
];

const COLS = ['Date & Time', 'Blood Pressure', 'Heart Rate', 'Temperature', 'SP02', 'Pain', 'Action'];

/* ── VitalsDetail (full table view) ─────────────── */
const VitalsDetail = ({ patient, chart, onAddNew }) => {
  const [rows,         setRows]         = useState(INITIAL_VITALS);
  const [search,       setSearch]       = useState('');
  const [showPanel,    setShowPanel]    = useState(false);
  const [editRow,      setEditRow]      = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openAdd    = ()    => { setEditRow(null); setShowPanel(true); };
  const openEdit   = (row) => { setEditRow(row);  setShowPanel(true); };
  const closePanel = ()    => { setShowPanel(false); setEditRow(null); };

  const handleDelete = (id) => setDeleteTarget(id);
  const confirmDelete = ()  => { setRows(prev => prev.filter(r => r.id !== deleteTarget)); setDeleteTarget(null); };
  const cancelDelete  = ()  => setDeleteTarget(null);

  const handleSave = (data) => {
    const bp = `${data.systolic}/${data.diastolic}`;
    const bpFlag = parseInt(data.systolic) > 130 || parseInt(data.diastolic) > 85;
    if (editRow) {
      // Update existing row
      setRows(prev => prev.map(r =>
        r.id === editRow.id
          ? { ...r, date: data.date || r.date, bp, hr: data.pulse || r.hr, temp: data.temp || r.temp, spo2: data.spo2 || r.spo2, pain: data.pain || r.pain, bpFlag }
          : r
      ));
    } else {
      // Add new row
      const newId = rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1;
      setRows(prev => [{ id: newId, date: data.date, bp, hr: data.pulse, temp: data.temp, spo2: data.spo2, pain: data.pain, bpFlag }, ...prev]);
    }
    onAddNew?.(data);
    closePanel();
  };

  const filtered = rows.filter(r =>
    r.date.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="flex flex-col"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E0E0E0',
        borderRadius: '12px',
        padding: '24px',
        gap: '16px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      {/* ── Title row ── */}
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '20px', lineHeight: '30px', color: '#222126' }}>
          Vitals
        </span>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 h-12 rounded-md cursor-pointer hover:opacity-90 transition-opacity"
          style={{ background: '#0D7DC3' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
            Add New Vital
          </span>
        </button>
      </div>

      {deleteTarget !== null && (
        <DeleteConfirmModal
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}

      {showPanel && (
        <AddVitalPanel
          patient={patient}
          initialData={editRow}
          onClose={closePanel}
          onSave={handleSave}
        />
      )}

      {/* ── Search ── */}
      <div
        className="flex items-center gap-2 px-6"
        style={{
          width: '380px',
          height: '48px',
          border: '1px solid rgba(158,158,158,0.4)',
          borderRadius: '26px',
          boxSizing: 'border-box',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <circle cx="11" cy="11" r="7" stroke="#9E9E9E" strokeWidth="1.5"/>
          <path d="M16.5 16.5L21 21" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search by date"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#9E9E9E' }}
        />
      </div>

      {/* ── Table ── */}
      <div className="flex flex-col" style={{ border: '1px solid #DCDFE3', borderRadius: '8px', overflow: 'hidden' }}>

        {/* Header row */}
        <div className="flex" style={{ borderBottom: '1px solid #DCDFE3', background: '#FFFFFF' }}>
          {COLS.map((col, ci) => (
            <div
              key={col}
              className="flex items-center px-6 py-4"
              style={{
                flex: ci === 0 ? '0 0 207px' : ci === 6 ? '0 0 125px' : '1',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '140%',
                letterSpacing: '1.25px',
                textTransform: 'uppercase',
                color: '#9E9E9E',
              }}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {filtered.map((row, i) => (
          <div
            key={i}
            className="flex items-center"
            style={{
              background: i % 2 === 0 ? '#FFFFFF' : '#F6F6F6',
              borderBottom: i < filtered.length - 1 ? '1px solid #DCDFE3' : 'none',
              height: '58px',
            }}
          >
            {/* Date & Time */}
            <div className="flex items-center px-6" style={{ flex: '0 0 207px', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: '#1B1B28', letterSpacing: '0.25px' }}>
              {row.date}
            </div>
            {/* Blood Pressure */}
            <div className="flex items-center px-6" style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: row.bpFlag ? '#FF555F' : '#1B1B28', letterSpacing: '0.25px' }}>
              {row.bp}
            </div>
            {/* Heart Rate */}
            <div className="flex items-center px-6" style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: '#1B1B28', letterSpacing: '0.25px' }}>
              {row.hr}
            </div>
            {/* Temperature */}
            <div className="flex items-center px-6" style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: '#1B1B28', letterSpacing: '0.25px' }}>
              {row.temp}
            </div>
            {/* SpO2 */}
            <div className="flex items-center px-2" style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: '#1B1B28', letterSpacing: '0.25px' }}>
              {row.spo2}
            </div>
            {/* Pain */}
            <div className="flex items-center px-2" style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: '#1B1B28', letterSpacing: '0.25px' }}>
              {row.pain}
            </div>
            {/* Action */}
            <div className="flex items-center gap-4 px-2" style={{ flex: '0 0 125px' }}>
              {/* View */}
              <button
                onClick={() => openEdit(row)}
                className="flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                style={{ background: 'rgba(0,110,239,0.1)' }}
                title="View"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="6" stroke="#0D7DC3" strokeWidth="1.5"/>
                  <path d="M16.5 16.5L21 21" stroke="#0D7DC3" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {/* Delete */}
              <button
                onClick={() => handleDelete(row.id)}
                className="flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                style={{ background: '#FFE2E5' }}
                title="Delete"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#921919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#292D32', letterSpacing: '0.1px' }}>
            Rows per page:
          </span>
          <div className="flex items-center gap-1">
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#292D32' }}>8</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5l5 5 5-5" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#292D32', letterSpacing: '0.1px' }}>
            1–{filtered.length} of {filtered.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map(p => (
            <button
              key={p}
              className="w-6 h-6 flex items-center justify-center rounded cursor-pointer"
              style={{
                background: p === 1 ? '#228BE6' : '#FFFFFF',
                border: p === 1 ? 'none' : '1px solid #DEE2E6',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                color: p === 1 ? '#FFFFFF' : '#000000',
                borderRadius: '4px',
              }}
            >
              {p}
            </button>
          ))}
          <button
            className="w-6 h-6 flex items-center justify-center rounded cursor-pointer"
            style={{ background: '#FFFFFF', border: '1px solid #DEE2E6', borderRadius: '4px' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#212529" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VitalsDetail;
