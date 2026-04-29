import React, { useState } from 'react';
import {
  Search, Plus, X,
  UserPlus, UserMinus, BellDot,
  List, Bot, Calculator, Pill,
  Eye, Pencil, Trash2,
  ChevronsLeft, ChevronsRight, ChevronDown,
} from 'lucide-react';
import patientsData from '../../../data/hcp/patients.json';
import offboardData  from '../../../data/hcp/offboardPatients.json';
import AddPatientPanel from './AddPatientPanel';
import PatientChart   from './PatientChart';

const STATUS_STYLES = {
  'Ready to Proceed': { bg: 'rgba(230,149,10,0.1)', border: 'rgba(230,149,10,0.1)', text: '#E6950A' },
  Completed:          { bg: 'rgba(18,183,106,0.1)',  border: 'rgba(18,183,106,0.1)',  text: '#12B76A' },
};

const sidebarManage = [
  { id: 'onboard',     icon: UserPlus,  label: 'Onboard' },
  { id: 'offboard',    icon: UserMinus, label: 'Offboard' },
  { id: 'alerts',      icon: BellDot,   label: 'Alert & Notifications' },
];

const sidebarTools = [
  { id: 'list',        icon: List,       label: 'List' },
  { id: 'ai-diagnosis',icon: Bot,        label: 'AI Diagnosis Assist' },
  { id: 'calculators', icon: Calculator, label: 'Medical Calculators' },
  { id: 'medication',  icon: Pill,       label: 'AI Medication Assist' },
];

const ROWS_PER_PAGE = 8;

/* ─── Patient content component ─────────────────────────── */
const Patient = () => {
  const [activeSidebar, setActiveSidebar] = useState('onboard');

  // onboard state
  const [search,        setSearch]        = useState('');
  const [patients,      setPatients]      = useState(patientsData);
  const [page,          setPage]          = useState(1);
  const [showPanel,     setShowPanel]     = useState(false);
  const [editPatient,   setEditPatient]   = useState(null);

  // chart / detail view
  const [selectedPatient, setSelectedPatient] = useState(null);

  // offboard state
  const [offSearch,     setOffSearch]     = useState('');
  const [offRecords,    setOffRecords]    = useState(offboardData);
  const [offPage,       setOffPage]       = useState(1);

  const filtered   = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const pageRows   = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const deletePatient = (id) => setPatients(prev => prev.filter(p => p.id !== id));

  const openEdit = (patient) => {
    setEditPatient(patient);
    setShowPanel(true);
  };

  const handlePanelClose = () => {
    setShowPanel(false);
    setEditPatient(null);
  };

  const handleSave = (saved) => {
    if (editPatient) {
      setPatients(prev => prev.map(p => p.id === saved.id ? saved : p));
    } else {
      setPatients(prev => [saved, ...prev]);
    }
  };

  const goTo = (n) => setPage(Math.min(Math.max(1, n), totalPages));
  const pageNums      = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1);

  // offboard derived
  const offFiltered   = offRecords.filter(p =>
    p.name.toLowerCase().includes(offSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(offSearch.toLowerCase()),
  );
  const offTotalPages = Math.max(1, Math.ceil(offFiltered.length / ROWS_PER_PAGE));
  const offPageRows   = offFiltered.slice((offPage - 1) * ROWS_PER_PAGE, offPage * ROWS_PER_PAGE);
  const offPageNums   = Array.from({ length: Math.min(offTotalPages, 7) }, (_, i) => i + 1);
  const offGoTo       = (n) => setOffPage(Math.min(Math.max(1, n), offTotalPages));
  const deleteOffRecord = (id) => setOffRecords(prev => prev.filter(p => p.id !== id));

  /* ── Show chart view when a patient row is clicked ── */
  if (selectedPatient) {
    return (
      <PatientChart
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">

      {/* ── Page title row (replaces dashboard greeting for this tab) ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#022145] leading-tight">
            Patient
          </h1>
          <p className="text-sm sm:text-base font-normal text-[#022145]">
            Access and manage patient profiles, medical history, and key health data.
          </p>
        </div>
        <button
          onClick={() => { setEditPatient(null); setShowPanel(true); }}
          className="flex items-center gap-2.5 px-4 h-12 bg-[#0D7DC3] rounded-md hover:bg-[#0b6fad] transition-colors whitespace-nowrap"
        >
          <Plus size={20} className="text-white flex-none" />
          <span className="text-base font-semibold text-white">Add New Patient</span>
        </button>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">

        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-[329px] shrink-0 self-stretch">
          <div className="flex flex-col bg-white border border-[#E3E3E3] rounded-xl overflow-hidden h-full py-6 gap-6">

            {/* MANAGE section */}
            <div className="flex flex-col gap-0">
              <div className="px-6 pb-2">
                <span className="text-[16px] font-semibold leading-[23px] tracking-[0.04em] text-[#767988]">
                  Manage
                </span>
              </div>
              <div className="flex flex-col gap-0">
                {sidebarManage.map(item => {
                  const active = activeSidebar === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSidebar(item.id)}
                      className={`flex items-center gap-4 px-6 h-14 transition-colors w-full ${
                        active
                          ? 'bg-[rgba(13,125,195,0.1)] border-l-[3px] border-[#0D7DC3]'
                          : 'border-l-[3px] border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <item.icon
                        size={24}
                        className={active ? 'text-[#0D7DC3]' : 'text-[#022145]'}
                        strokeWidth={1.5}
                      />
                      <span className={`text-[16px] font-medium leading-[23px] ${active ? 'text-[#0D7DC3]' : 'text-[#022145]'}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TOOLS section */}
            <div className="flex flex-col gap-0">
              <div className="px-6 pb-2">
                <span className="text-[16px] font-semibold leading-[23px] tracking-[0.04em] text-[#767988]">
                  Tools
                </span>
              </div>
              <div className="flex flex-col gap-0">
                {sidebarTools.map(item => {
                  const active = activeSidebar === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSidebar(item.id)}
                      className={`flex items-center gap-4 px-6 h-14 transition-colors w-full ${
                        active
                          ? 'bg-[rgba(13,125,195,0.1)] border-l-[3px] border-[#0D7DC3]'
                          : 'border-l-[3px] border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <item.icon
                        size={24}
                        className={active ? 'text-[#0D7DC3]' : 'text-[#022145]'}
                        strokeWidth={1.5}
                      />
                      <span className={`text-[16px] font-medium leading-[23px] ${active ? 'text-[#0D7DC3]' : 'text-[#022145]'}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </aside>

        {/* RIGHT PANEL */}
        {activeSidebar === 'offboard' ? (
          /* ── Offboard view ─────────────────────────────── */
          <div className="flex flex-col gap-4 flex-1 bg-white border border-[#E0E0E0] rounded-xl p-6 overflow-x-auto">

            {/* Title */}
            <span className="text-[20px] font-medium text-[#222126] leading-[30px]">
              Offboarded Patients
            </span>

            {/* Search + filter */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 px-6 py-3 border border-[rgba(158,158,158,0.4)] rounded-full">
                <Search size={16} className="text-[#9E9E9E]" />
                <input
                  type="text"
                  value={offSearch}
                  onChange={e => { setOffSearch(e.target.value); setOffPage(1); }}
                  placeholder="Search patients…"
                  className="outline-none text-[16px] text-[#9E9E9E] bg-transparent w-36 placeholder-[#9E9E9E]"
                />
                {offSearch && (
                  <button onClick={() => setOffSearch('')}>
                    <X size={14} className="text-[#9E9E9E]" />
                  </button>
                )}
              </div>
              <div className="flex items-center border border-[rgba(158,158,158,0.4)] rounded-lg h-12 px-4 gap-2 cursor-pointer select-none">
                <span className="text-[16px] text-[#9E9E9E]">Status</span>
                <ChevronDown size={18} className="text-[#9E9E9E]" />
              </div>
            </div>

            {/* Table */}
            <div className="flex flex-col min-w-[600px]">

              {/* Header row */}
              <div className="flex items-center border-b border-[#DCDFE3] h-[58px]">
                <div className="w-[135px] px-6 text-xs font-semibold uppercase tracking-[1.25px] text-[#9E9E9E]">
                  Patient ID
                </div>
                <div className="flex-1 px-2 text-xs font-semibold uppercase tracking-[1.25px] text-[#9E9E9E] flex items-center gap-1">
                  Patient Name <ChevronDown size={14} className="text-[#0A0A0A]" />
                </div>
                <div className="flex-1 px-2 text-xs font-semibold uppercase tracking-[1.25px] text-[#9E9E9E] flex items-center gap-1">
                  Visit Date <ChevronDown size={14} className="text-[#0A0A0A]" />
                </div>
                <div className="w-[169px] px-2 text-xs font-semibold uppercase tracking-[1.25px] text-[#9E9E9E] flex items-center gap-1">
                  Status <ChevronDown size={14} className="text-[#0A0A0A]" />
                </div>
                <div className="w-[125px] px-2 text-xs font-semibold uppercase tracking-[1.25px] text-[#9E9E9E]">
                  Action
                </div>
              </div>

              {/* Data rows */}
              {offPageRows.length === 0 ? (
                <div className="py-10 text-center text-sm text-[#9E9E9E]">No offboarded patients found.</div>
              ) : offPageRows.map((row, i) => (
                <div
                  key={row.id}
                  className="flex items-center h-[58px]"
                  style={{ background: i % 2 === 1 ? '#F6F6F6' : '#FFFFFF' }}
                >
                  <div className="w-[135px] px-6 text-[14px] font-medium text-[#1B1B28] tracking-[0.25px]">
                    {row.id}
                  </div>
                  <div className="flex-1 px-2.5 text-[14px] font-medium text-[#1B1B28] tracking-[0.25px]">
                    {row.name}
                  </div>
                  <div className="flex-1 px-2.5 text-[14px] font-medium text-[#1B1B28] tracking-[0.25px]">
                    {row.visitDate}
                  </div>
                  <div className="w-[169px] px-2.5">
                    <span
                      className="inline-flex items-center justify-center px-4 rounded-full text-[12px] font-semibold leading-[21px]"
                      style={{ padding: '2px 16px', background: 'rgba(18,183,106,0.1)', border: '1px solid rgba(18,183,106,0.1)', color: '#12B76A' }}
                    >
                      Done
                    </span>
                  </div>
                  <div className="w-[125px] px-2.5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedPatient(row)}
                        className="w-9 h-9 flex items-center justify-center bg-[rgba(0,110,239,0.1)] rounded-lg hover:bg-[#0D7DC3]/20 transition-colors"
                      >
                        <Eye size={15} className="text-[#0D7DC3]" />
                      </button>
                      <button
                        onClick={() => deleteOffRecord(row.id)}
                        className="w-9 h-9 flex items-center justify-center bg-[#FFE2E5] rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={15} className="text-[#921919]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-[#292D32] tracking-[0.1px]">Rows per page:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[12px] font-semibold text-[#292D32] tracking-[0.1px]">{ROWS_PER_PAGE}</span>
                    <ChevronDown size={16} className="text-[#292D32]" />
                  </div>
                </div>
                <span className="text-[12px] font-semibold text-[#292D32] tracking-[0.1px]">
                  {offFiltered.length === 0
                    ? '0 of 0'
                    : `${(offPage - 1) * ROWS_PER_PAGE + 1}–${Math.min(offPage * ROWS_PER_PAGE, offFiltered.length)} of ${offFiltered.length}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => offGoTo(1)}
                  disabled={offPage === 1}
                  className="w-6 h-6 flex items-center justify-center bg-white border border-[#DEE2E6] rounded disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <ChevronsLeft size={14} className="text-[#212529]" />
                </button>
                {offPageNums.map(n => (
                  <button
                    key={n}
                    onClick={() => offGoTo(n)}
                    className="w-6 h-6 flex items-center justify-center rounded text-[14px] font-normal transition-colors"
                    style={offPage === n ? { background: '#228BE6', color: '#fff' } : { background: '#fff', border: '1px solid #DEE2E6', color: '#000' }}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => offGoTo(offTotalPages)}
                  disabled={offPage === offTotalPages}
                  className="w-6 h-6 flex items-center justify-center bg-white border border-[#DEE2E6] rounded disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <ChevronsRight size={14} className="text-[#212529]" />
                </button>
              </div>
            </div>
          </div>
        ) : (
        <div className="flex flex-col gap-4 flex-1 bg-white border border-[#E0E0E0] rounded-xl p-6 overflow-x-auto">

          {/* Panel header */}
          <span className="text-[20px] font-medium text-[#222126] leading-[30px]">
            Patient List
          </span>

          {/* Search + filter */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-6 py-3 border border-[rgba(158,158,158,0.2)] rounded-full">
              <Search size={16} className="text-[#9E9E9E]" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search patients…"
                className="outline-none text-[16px] text-[#9E9E9E] bg-transparent w-36 placeholder-[#9E9E9E]"
              />
              {search && (
                <button onClick={() => setSearch('')}>
                  <X size={14} className="text-[#9E9E9E]" />
                </button>
              )}
            </div>

            <div className="flex items-center border border-[rgba(158,158,158,0.2)] rounded-lg h-12 px-4 gap-2 cursor-pointer select-none">
              <span className="text-[16px] text-[#9E9E9E]">Status</span>
              <ChevronDown size={18} className="text-[#9E9E9E]" />
            </div>
          </div>

          {/* Table */}
          <div className="flex flex-col min-w-[600px]">

            {/* Header row */}
            <div className="flex items-center border-b border-[#DCDFE3] h-[58px]">
              <div className="w-[135px] px-6 text-xs font-semibold uppercase tracking-[1.25px] text-[#9E9E9E]">
                Patient ID
              </div>
              <div className="flex-1 px-2 text-xs font-semibold uppercase tracking-[1.25px] text-[#9E9E9E] flex items-center gap-1">
                Patient Name <ChevronDown size={14} className="text-[#0A0A0A]" />
              </div>
              <div className="flex-1 px-2 text-xs font-semibold uppercase tracking-[1.25px] text-[#9E9E9E] flex items-center gap-1">
                Visit Date <ChevronDown size={14} className="text-[#0A0A0A]" />
              </div>
              <div className="flex-1 px-2 text-xs font-semibold uppercase tracking-[1.25px] text-[#9E9E9E] flex items-center gap-1">
                Status <ChevronDown size={14} className="text-[#0A0A0A]" />
              </div>
              <div className="w-[160px] px-2 text-xs font-semibold uppercase tracking-[1.25px] text-[#9E9E9E]">
                Action
              </div>
            </div>

            {/* Data rows */}
            {pageRows.length === 0 ? (
              <div className="py-10 text-center text-sm text-[#9E9E9E]">No patients found.</div>
            ) : pageRows.map((row, i) => {
              const st = STATUS_STYLES[row.status] ?? STATUS_STYLES['Ready to Proceed'];
              return (
                <div
                  key={row.id}
                  className="flex items-center h-[58px]"
                  style={{ background: i % 2 === 1 ? '#F6F6F6' : '#FFFFFF' }}
                >
                  <div className="w-[135px] px-6 text-[14px] font-medium text-[#1B1B28] tracking-[0.25px]">
                    {row.id}
                  </div>
                  <div className="flex-1 px-2.5 text-[14px] font-medium text-[#1B1B28] tracking-[0.25px]">
                    {row.name}
                  </div>
                  <div className="flex-1 px-2.5 text-[14px] font-medium text-[#1B1B28] tracking-[0.25px]">
                    {row.visitDate}
                  </div>
                  <div className="flex-1 px-2.5">
                    <span
                      className="inline-flex items-center justify-center px-4 py-0.5 rounded-full text-[12px] font-semibold leading-[21px]"
                      style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.text }}
                    >
                      {row.status}
                    </span>
                  </div>
                  <div className="w-[160px] px-2.5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedPatient(row)}
                        className="w-9 h-9 flex items-center justify-center bg-[rgba(0,110,239,0.1)] rounded-lg hover:bg-[#0D7DC3]/20 transition-colors"
                      >
                        <Eye size={15} className="text-[#0D7DC3]" />
                      </button>
                      <button
                        onClick={() => openEdit(row)}
                        className="w-9 h-9 flex items-center justify-center bg-[rgba(18,183,106,0.1)] rounded-lg hover:bg-[#12B76A]/20 transition-colors"
                      >
                        <Pencil size={15} className="text-[#12B76A]" />
                      </button>
                      <button
                        onClick={() => deletePatient(row.id)}
                        className="w-9 h-9 flex items-center justify-center bg-[#FFE2E5] rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={15} className="text-[#921919]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-[#292D32] tracking-[0.1px]">Rows per page:</span>
                <div className="flex items-center gap-1">
                  <span className="text-[12px] font-semibold text-[#292D32] tracking-[0.1px]">{ROWS_PER_PAGE}</span>
                  <ChevronDown size={16} className="text-[#292D32]" />
                </div>
              </div>
              <span className="text-[12px] font-semibold text-[#292D32] tracking-[0.1px]">
                {(page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goTo(1)}
                disabled={page === 1}
                className="w-6 h-6 flex items-center justify-center bg-white border border-[#DEE2E6] rounded disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                <ChevronsLeft size={14} className="text-[#212529]" />
              </button>

              {pageNums.map(n => (
                <button
                  key={n}
                  onClick={() => goTo(n)}
                  className="w-6 h-6 flex items-center justify-center rounded text-[14px] font-normal transition-colors"
                  style={
                    page === n
                      ? { background: '#228BE6', color: '#fff' }
                      : { background: '#fff', border: '1px solid #DEE2E6', color: '#000' }
                  }
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => goTo(totalPages)}
                disabled={page === totalPages}
                className="w-6 h-6 flex items-center justify-center bg-white border border-[#DEE2E6] rounded disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                <ChevronsRight size={14} className="text-[#212529]" />
              </button>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* ── Add Patient Side Panel ── */}
      <AddPatientPanel
        open={showPanel}
        onClose={handlePanelClose}
        onSave={handleSave}
        patient={editPatient}
      />
    </div>
  );
};

export default Patient;
