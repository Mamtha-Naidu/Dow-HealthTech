import React, { useState } from 'react';
import {
  Activity, Plus,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown,
  Eye, Trash2,
} from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';
import AddComplaintPanel from './AddComplaintPanel';

/* ── Sample data ─────────────────────────────────── */
const INITIAL_COMPLAINTS = [
  { id: 1, datetime: '16/01/2025 - 10:00 AM', title: 'Long Waiting Time at the Clinic',         details: 'I waited for almost two hours before seeing the doctor. It would be helpful if appointments were managed more efficiently.' },
  { id: 2, datetime: '17/01/2025 - 10:00 AM', title: 'Unclear Prescription Instructions',       details: 'The medication instructions were not clear on how many times a day I should take them. I had to call again for clarification.' },
  { id: 3, datetime: '18/01/2025 - 10:00 AM', title: 'Rude Behavior from Staff',                details: 'One of the staff members at the front desk spoke in a dismissive tone, which made me feel uncomfortable.' },
  { id: 4, datetime: '19/01/2025 - 10:00 AM', title: 'Unexpected Billing Charges',              details: 'I was charged for an additional lab test that I didn\'t request. I need clarification on the billing details.' },
  { id: 5, datetime: '20/01/2025 - 10:00 AM', title: 'Difficulty Booking Appointments Online',  details: 'The online booking system often crashes and doesn\'t confirm my appointment. I had to call directly to schedule.' },
];

const ROWS_PER_PAGE = 8;

/* ── ComplaintsDetail ────────────────────────────── */
const ComplaintsDetail = ({ patient, chart }) => {
  const [complaints, setComplaints]     = useState(INITIAL_COMPLAINTS);
  const [search, setSearch]             = useState('');
  const [page, setPage]                 = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showPanel,    setShowPanel]    = useState(false);
  const [viewRow,      setViewRow]      = useState(null);

  const initials = patient.name.split(' ').map(n => n[0]).join('').slice(0, 3);
  const age      = patient.dob
    ? `${new Date().getFullYear() - new Date(patient.dob).getFullYear()} yr`
    : '—';

  const filtered = complaints.filter(c =>
    c.datetime.toLowerCase().includes(search.toLowerCase()) ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.details.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated  = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);
  const pageNums   = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 7);

  const handleSave = ({ date, time, title, details }) => {
    const datetime = `${date} - ${time}`;
    if (viewRow) {
      setComplaints(prev => prev.map(c => c.id === viewRow.id ? { ...c, datetime, title, details } : c));
    } else {
      setComplaints(prev => [...prev, { id: Date.now(), datetime, title, details }]);
    }
    setShowPanel(false);
    setViewRow(null);
  };

  const confirmDelete = () => {
    setComplaints(prev => prev.filter(c => c.id !== deleteTarget));
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* ── Patient header card ── */}
      <div
        className="flex flex-col justify-center gap-4 w-full"
        style={{ padding: 16, background: '#FFFFFF', border: '1px solid #E1EBF5', borderRadius: 12 }}
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
            <span className="text-[16px] font-semibold text-[#293034] leading-[24px]">{patient.name}</span>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <Activity size={16} color="#677883" />
                <span className="text-[12px] text-[#292D32]">{patient.gender || 'N/A'}</span>
              </div>
              <div className="w-2 h-2 rounded-full" style={{ background: '#E5E9EB' }} />
              <div className="flex items-center gap-1">
                <span className="text-[12px] font-semibold" style={{ letterSpacing: '-0.02em', color: '#0D7DC3' }}>{age}</span>
                <span className="text-[12px] text-[#293034]">old</span>
              </div>
              <span className="text-[14px] font-bold text-[#022145]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                MRN: {chart.mrn}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content card ── */}
      <div
        className="flex flex-col gap-4 w-full flex-1"
        style={{ padding: 24, background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: 12 }}
      >

        {/* Header row */}
        <div className="flex items-center justify-between" style={{ height: 48 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 20, lineHeight: '30px', color: '#222126' }}>
            Complaints
          </span>
          <button
            onClick={() => { setViewRow(null); setShowPanel(true); }}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ padding: '12px 16px', background: '#0D7DC3', borderRadius: 6, height: 48 }}
          >
            <Plus size={24} color="#FFFFFF" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#FFFFFF' }}>
              Add New Complaint
            </span>
          </button>
        </div>

        {/* Search bar */}
        <div className="flex items-center" style={{ height: 48 }}>
          <div
            className="flex items-center gap-2"
            style={{ width: 380, height: 48, padding: '12px 24px', border: '1px solid rgba(158,158,158,0.4)', borderRadius: 26 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <rect x="3" y="4" width="18" height="17" rx="2" stroke="#9E9E9E" strokeWidth="1.5" />
              <path d="M8 2v2M16 2v2M3 9h18" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="16.5" cy="16.5" r="2.5" stroke="#9E9E9E" strokeWidth="1.5" />
              <path d="M18.5 18.5l1.5 1.5" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search by date"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="flex-1 outline-none bg-transparent text-[16px] placeholder-[#9E9E9E]"
              style={{ letterSpacing: '0.15px', color: '#9E9E9E' }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-col w-full" style={{ flex: 1, overflow: 'hidden' }}>

          {/* Table header */}
          <div className="flex items-center w-full" style={{ height: 58, borderBottom: '1px solid #DCDFE3', overflow: 'hidden' }}>
            <div style={{ width: 207, padding: '16px 24px', flexShrink: 0 }}>
              <span className="text-[14px] font-semibold text-[#9E9E9E] uppercase" style={{ letterSpacing: '1.25px' }}>Date &amp; Time</span>
            </div>
            <div style={{ width: 318, padding: '16px 24px', flexShrink: 0 }}>
              <span className="text-[14px] font-semibold text-[#9E9E9E] uppercase" style={{ letterSpacing: '1.25px' }}>Title</span>
            </div>
            <div style={{ flex: 1, width: 0, overflow: 'hidden', padding: '16px 24px' }}>
              <span className="text-[14px] font-semibold text-[#9E9E9E] uppercase" style={{ letterSpacing: '1.25px' }}>Complaint Details</span>
            </div>
            <div style={{ width: 125, padding: '16px 8px', flexShrink: 0 }}>
              <span className="text-[14px] font-semibold text-[#9E9E9E] uppercase" style={{ letterSpacing: '1.25px' }}>Action</span>
            </div>
          </div>

          {/* Table rows */}
          {paginated.map((row, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={row.id}
                className="flex items-center w-full"
                style={{ height: 58, background: isEven ? '#F6F6F6' : '#FFFFFF', overflow: 'hidden' }}
              >
                <div style={{ width: 207, padding: '16px 24px', flexShrink: 0 }}>
                  <span className="text-[14px] font-medium text-[#1B1B28] truncate block" style={{ letterSpacing: '0.25px', lineHeight: '140%' }}>
                    {row.datetime}
                  </span>
                </div>
                <div style={{ width: 318, padding: '16px 24px', flexShrink: 0 }}>
                  <span className="text-[14px] font-medium text-[#022145] truncate block" style={{ letterSpacing: '0.25px', lineHeight: '140%' }}>
                    {row.title}
                  </span>
                </div>
                <div style={{ flex: 1, width: 0, overflow: 'hidden', padding: '16px 24px' }}>
                  <span className="text-[14px] font-medium text-[#1B1B28] truncate block" style={{ letterSpacing: '0.25px', lineHeight: '140%' }}>
                    {row.details}
                  </span>
                </div>
                <div className="flex items-center gap-4 shrink-0" style={{ width: 125, padding: '16px 10px' }}>
                  {/* View */}
                  <button
                    onClick={() => { setViewRow(row); setShowPanel(true); }}
                    className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ width: 36, height: 36, background: 'rgba(0,110,239,0.1)', borderRadius: 8 }}
                    title="Edit"
                  >
                    <Eye size={16} color="#0D7DC3" />
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => setDeleteTarget(row.id)}
                    className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ width: 36, height: 36, background: '#FFE2E5', borderRadius: 8 }}
                    title="Delete"
                  >
                    <Trash2 size={16} color="#921919" />
                  </button>
                </div>
              </div>
            );
          })}

          {paginated.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <span className="text-[14px] text-[#9E9E9E]">No complaints found.</span>
            </div>
          )}
        </div>

        {/* Pagination footer */}
        <div className="flex items-center justify-between w-full" style={{ height: 24 }}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-[#292D32]" style={{ letterSpacing: '0.1px' }}>Rows per page:</span>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-[12px] font-semibold text-[#292D32]">{ROWS_PER_PAGE}</span>
                <ChevronDown size={16} color="#292D32" />
              </div>
            </div>
            <span className="text-[12px] font-semibold text-[#292D32]" style={{ letterSpacing: '0.1px' }}>
              {filtered.length === 0
                ? '0'
                : `${(page - 1) * ROWS_PER_PAGE + 1}–${Math.min(page * ROWS_PER_PAGE, filtered.length)} of ${filtered.length}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1}
              className="flex items-center justify-center cursor-pointer disabled:opacity-40"
              style={{ width: 24, height: 24, background: '#FFFFFF', border: '1px solid #DEE2E6', borderRadius: 4 }}>
              <ChevronsLeft size={14} color="#212529" />
            </button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="flex items-center justify-center cursor-pointer disabled:opacity-40"
              style={{ width: 24, height: 24, background: '#FFFFFF', border: '1px solid #DEE2E6', borderRadius: 4 }}>
              <ChevronLeft size={14} color="#212529" />
            </button>
            {pageNums.map(num => (
              <button key={num} onClick={() => setPage(num)}
                className="flex items-center justify-center cursor-pointer text-[14px]"
                style={{
                  width: 24, height: 24, borderRadius: 4,
                  fontFamily: 'Roboto, Inter, sans-serif',
                  background: page === num ? '#228BE6' : '#FFFFFF',
                  border: page === num ? 'none' : '1px solid #DEE2E6',
                  color: page === num ? '#FFFFFF' : '#000000',
                }}>
                {num}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="flex items-center justify-center cursor-pointer disabled:opacity-40"
              style={{ width: 24, height: 24, background: '#FFFFFF', border: '1px solid #DEE2E6', borderRadius: 4 }}>
              <ChevronRight size={14} color="#212529" />
            </button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
              className="flex items-center justify-center cursor-pointer disabled:opacity-40"
              style={{ width: 24, height: 24, background: '#FFFFFF', border: '1px solid #DEE2E6', borderRadius: 4 }}>
              <ChevronsRight size={14} color="#212529" />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit complaint panel */}
      {showPanel && (
        <AddComplaintPanel
          patient={patient}
          chart={chart}
          initialData={viewRow}
          onClose={() => { setShowPanel(false); setViewRow(null); }}
          onSave={handleSave}
        />
      )}

      {/* Delete confirmation modal */}
      {deleteTarget !== null && (
        <DeleteConfirmModal
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          title="Are you sure you want to delete this Complaint?"
          description="Deleting this Complaint will permanently remove it from your Patient Complaints."
        />
      )}
    </div>
  );
};

export default ComplaintsDetail;
