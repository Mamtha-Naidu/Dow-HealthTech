import React, { useState } from 'react';
import {
  Plus,
  ChevronsLeft, ChevronsRight,
  Eye, Calendar,
} from 'lucide-react';
import AddLabPanel from './AddLabPanel';

/* ── Sample data ─────────────────────────────────── */
const INITIAL_LABS = [
  { id: 1, datetime: '16/01/2025 - 10:00 AM', labName: 'Treatment A', labResults: 'Notes A', followUpPlan: 'Follow up A' },
  { id: 2, datetime: '17/01/2025 - 10:00 AM', labName: 'Treatment B', labResults: 'Notes B', followUpPlan: 'Follow up B' },
  { id: 3, datetime: '18/01/2025 - 10:00 AM', labName: 'Treatment C', labResults: 'Notes C', followUpPlan: 'Follow up C' },
  { id: 4, datetime: '19/01/2025 - 10:00 AM', labName: 'Treatment D', labResults: 'Notes D', followUpPlan: 'Follow up D' },
  { id: 5, datetime: '20/01/2025 - 10:00 AM', labName: 'Treatment E', labResults: 'Notes E', followUpPlan: 'Follow up E' },
];

const ROWS_PER_PAGE = 8;

/* ── LabsDetail ──────────────────────────────────── */
const LabsDetail = ({ patient, chart }) => {
  const [labs,      setLabs]      = useState(INITIAL_LABS);
  const [search,    setSearch]    = useState('');
  const [page,      setPage]      = useState(1);
  const [showPanel, setShowPanel] = useState(false);
  const [viewRow,   setViewRow]   = useState(null);

  const initials = patient.name.split(' ').map(n => n[0]).join('').slice(0, 3);
  const age      = patient.dob
    ? `${new Date().getFullYear() - new Date(patient.dob).getFullYear()} yr`
    : '—';

  const filtered = labs.filter(r =>
    r.datetime.toLowerCase().includes(search.toLowerCase()) ||
    r.labName.toLowerCase().includes(search.toLowerCase()) ||
    r.labResults.toLowerCase().includes(search.toLowerCase()) ||
    r.followUpPlan.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const pageRows   = filtered.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE);
  const pageNums   = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 7);

  const handleSave = (data) => {
    if (data.id) {
      setLabs(prev => prev.map(r => r.id === data.id ? data : r));
    } else {
      setLabs(prev => [...prev, { ...data, id: Date.now() }]);
    }
    setShowPanel(false);
    setViewRow(null);
  };

  return (
    <div className="flex flex-col gap-4" style={{ width: '100%' }}>

      {/* ── Patient card ── */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E1EBF5',
          borderRadius: '12px',
          padding: '16px',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center"
            style={{ background: '#CFE5F3' }}
          >
            <span className="text-[16px] font-bold text-[#0B68A2]" style={{ letterSpacing: '-0.06em' }}>
              {initials}
            </span>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-[#293034]">{patient.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#292D32]">{patient.gender || 'N/A'}</span>
                <div className="w-2 h-2 rounded-full" style={{ background: '#E5E9EB' }} />
                <span className="text-[12px] font-semibold text-[#0D7DC3]" style={{ letterSpacing: '-0.02em' }}>{age}</span>
                <span className="text-[12px] text-[#293034]">old</span>
              </div>
            </div>
            <span className="text-[14px] font-bold text-[#022145]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              MRN: {chart.mrn}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main card ── */}
      <div
        className="flex flex-col gap-4"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ height: '48px' }}>
          <span className="text-[20px] font-medium" style={{ color: '#222126' }}>Labs &amp; Diagnostics</span>
          <button
            onClick={() => { setViewRow(null); setShowPanel(true); }}
            className="flex items-center gap-2 h-12 px-4 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: '#0D7DC3', borderRadius: '6px' }}
          >
            <Plus size={24} color="#fff" />
            <span className="text-[16px] font-semibold text-white whitespace-nowrap">Add New Labs &amp; Diagnostics</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="flex items-center" style={{ height: '48px' }}>
          <div
            className="flex items-center gap-2 px-6"
            style={{
              width: '380px',
              height: '48px',
              border: '1px solid rgba(158,158,158,0.4)',
              borderRadius: '26px',
            }}
          >
            <Calendar size={24} color="#9E9E9E" className="shrink-0" />
            <input
              className="flex-1 text-[16px] outline-none bg-transparent"
              style={{ color: '#022145', letterSpacing: '0.15px' }}
              placeholder="Search by date"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-col">
          {/* Header row */}
          <div className="flex items-center" style={{ borderBottom: '1px solid #DCDFE3', height: '58px' }}>
            <div style={{ width: '207px', flexShrink: 0, padding: '16px 24px' }}>
              <span className="text-[14px] font-semibold text-[#9E9E9E] uppercase" style={{ letterSpacing: '1.25px' }}>
                Date &amp; Time
              </span>
            </div>
            <div style={{ flex: 1, padding: '16px 24px' }}>
              <span className="text-[14px] font-semibold text-[#9E9E9E] uppercase" style={{ letterSpacing: '1.25px' }}>
                Lab Name
              </span>
            </div>
            <div style={{ flex: 1, padding: '16px 24px' }}>
              <span className="text-[14px] font-semibold text-[#9E9E9E] uppercase" style={{ letterSpacing: '1.25px' }}>
                Lab Results
              </span>
            </div>
            <div style={{ flex: 1, padding: '16px 24px' }}>
              <span className="text-[14px] font-semibold text-[#9E9E9E] uppercase" style={{ letterSpacing: '1.25px' }}>
                Follow-up Plan
              </span>
            </div>
            <div style={{ width: '105px', flexShrink: 0, padding: '16px 8px' }}>
              <span className="text-[14px] font-semibold text-[#9E9E9E] uppercase" style={{ letterSpacing: '1.25px' }}>
                Action
              </span>
            </div>
          </div>

          {/* Data rows */}
          {pageRows.map((row, i) => (
            <div
              key={row.id}
              className="flex items-center"
              style={{
                height: '58px',
                background: i % 2 === 0 ? '#FFFFFF' : '#F6F6F6',
                borderBottom: '1px solid #F0F0F0',
              }}
            >
              {/* Date & Time */}
              <div style={{ width: '207px', flexShrink: 0, padding: '16px 24px' }}>
                <span className="text-[14px] font-medium" style={{ color: '#1B1B28', letterSpacing: '0.25px' }}>
                  {row.datetime}
                </span>
              </div>
              {/* Lab Name */}
              <div style={{ flex: 1, padding: '16px 24px', overflow: 'hidden' }}>
                <span className="text-[14px] font-medium block truncate" style={{ color: '#1B1B28', letterSpacing: '0.25px' }}>
                  {row.labName}
                </span>
              </div>
              {/* Lab Results */}
              <div style={{ flex: 1, padding: '16px 24px', overflow: 'hidden' }}>
                <span className="text-[14px] font-medium block truncate" style={{ color: '#1B1B28', letterSpacing: '0.25px' }}>
                  {row.labResults}
                </span>
              </div>
              {/* Follow-up Plan */}
              <div style={{ flex: 1, padding: '16px 24px', overflow: 'hidden' }}>
                <span className="text-[14px] font-medium block truncate" style={{ color: '#1B1B28', letterSpacing: '0.25px' }}>
                  {row.followUpPlan}
                </span>
              </div>
              {/* Action */}
              <div style={{ width: '105px', flexShrink: 0, padding: '16px 10px' }} className="flex justify-center">
                <button
                  onClick={() => { setViewRow(row); setShowPanel(true); }}
                  className="flex items-center justify-center w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ background: 'rgba(0,110,239,0.1)', borderRadius: '8px' }}
                >
                  <Eye size={16} color="#0D7DC3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between" style={{ height: '24px' }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-[#292D32]" style={{ letterSpacing: '0.1px' }}>
                Rows per page:
              </span>
              <span className="text-[12px] font-semibold text-[#292D32]">8</span>
            </div>
            <span className="text-[12px] font-semibold text-[#292D32]">
              {filtered.length === 0
                ? '0'
                : `${(safePage - 1) * ROWS_PER_PAGE + 1}–${Math.min(safePage * ROWS_PER_PAGE, filtered.length)}`}{' '}
              of {filtered.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(1)}
              disabled={safePage === 1}
              className="w-6 h-6 flex items-center justify-center cursor-pointer disabled:opacity-40"
              style={{ background: '#fff', border: '1px solid #DEE2E6', borderRadius: '4px' }}
            >
              <ChevronsLeft size={16} color="#212529" />
            </button>
            {pageNums.map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-6 h-6 flex items-center justify-center text-[14px] cursor-pointer"
                style={{
                  background: safePage === p ? '#228BE6' : '#fff',
                  color: safePage === p ? '#fff' : '#000',
                  border: safePage === p ? 'none' : '1px solid #DEE2E6',
                  borderRadius: '4px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(totalPages)}
              disabled={safePage === totalPages}
              className="w-6 h-6 flex items-center justify-center cursor-pointer disabled:opacity-40"
              style={{ background: '#fff', border: '1px solid #DEE2E6', borderRadius: '4px' }}
            >
              <ChevronsRight size={16} color="#212529" />
            </button>
          </div>
        </div>
      </div>

      {/* Add / View Panel */}
      {showPanel && (
        <AddLabPanel
          patient={patient}
          chart={chart}
          onClose={() => { setShowPanel(false); setViewRow(null); }}
          onSave={handleSave}
          initialData={viewRow}
        />
      )}
    </div>
  );
};

export default LabsDetail;
