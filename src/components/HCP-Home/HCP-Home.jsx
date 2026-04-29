import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Bell, MessageSquare, ChevronDown, Plus, Calendar,
  Users, Home, ClipboardList, Settings, X, Menu,
  MoreHorizontal, TrendingUp, ChevronLeft, ChevronRight, Eye, Trash2,
  Clock,
} from 'lucide-react';
import DashboardFooter from '../Caregive-Home/DashboardFooter';
import { useAuth } from '../../context/AuthContext';
import CalendarView from './CalendarView';
import Patient from './patient/Patient';
import AddAppointmentModal from './patient/AddAppointmentModal';
import Encounter from './encounter/Encounter';
import Administration from './administration/Administration';
import MessagesPanel from './MessagesPanel';

/* ─── stub data (edit the JSON files in src/data/hcp/ to change values) ─── */
import appointmentsData  from '../../data/hcp/appointments.json';
import medicalTestsData  from '../../data/hcp/medicalTests.json';
import statCardsData     from '../../data/hcp/statCards.json';
import apptStatsData     from '../../data/hcp/appointmentStats.json';
import demographicsData  from '../../data/hcp/demographics.json';

/* ─── helpers ─────────────────────────────────────────── */
const MONTH_NAMES = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December'];
const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year, month) { return new Date(year, month, 1).getDay(); }
function fmt(d) { return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` : ''; }
function displayDate(d) {
  if (!d) return '';
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

/* ─── Dropdown wrapper ─────────────────────────────────── */
function Dropdown({ label, options, value, onChange, className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-4 h-12 bg-white border border-[rgba(41,45,50,0.1)] rounded-md hover:border-[#022145] transition-colors text-sm text-[#292D32] whitespace-nowrap"
      >
        {value || label}
        <ChevronDown size={16} className="text-[#292D32]" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-[#EDEDED] rounded-lg shadow-xl z-30 min-w-full">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#0D7DC3]/10 transition-colors ${value === opt ? 'text-[#0D7DC3] font-semibold' : 'text-[#292D32]'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Interactive Mini Calendar ────────────────────────── */
function MiniCalendar({ bookedDates = [], selectedDate, onSelectDate }) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay  = getFirstDayOfMonth(viewYear, viewMonth);
  const daysCount = getDaysInMonth(viewYear, viewMonth);
  const cells     = [...Array(firstDay).fill(null), ...Array.from({length: daysCount}, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isBooked   = (d) => d && bookedDates.includes(`${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
  const isSelected = (d) => d && selectedDate && fmt(selectedDate) === `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const isToday    = (d) => d && today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === d;

  return (
    <div className="border border-[#EDEDED] rounded-xl overflow-hidden select-none">
      {/* nav */}
      <div className="flex items-center border-b border-[#EDEDED]">
        <button onClick={prevMonth} className="flex items-center justify-center w-14 h-10 border-r border-[#EDEDED] hover:bg-gray-50 transition-colors">
          <ChevronLeft size={18} className="text-[#022145]" />
        </button>
        <div className="flex-1 flex items-center justify-center text-sm font-semibold text-[#022145]">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </div>
        <button onClick={nextMonth} className="flex items-center justify-center w-14 h-10 border-l border-[#EDEDED] hover:bg-gray-50 transition-colors">
          <ChevronRight size={18} className="text-[#022145]" />
        </button>
      </div>
      {/* day headers */}
      <div className="grid grid-cols-7 border-b border-[#EDEDED]">
        {DAY_LABELS.map(d => (
          <div key={d} className={`flex items-center justify-center h-9 text-xs font-semibold ${d === 'Sun' || d === 'Sat' ? 'text-[#FF555F]' : 'text-[#022145]'}`}>{d}</div>
        ))}
      </div>
      {/* cells */}
      <div className="grid grid-cols-7">
        {cells.map((n, i) => {
          const booked   = isBooked(n);
          const selected = isSelected(n);
          const todayMark = isToday(n);
          let cls = 'flex items-center justify-center h-10 text-xs font-semibold cursor-pointer transition-colors border-b border-r border-[#EDEDED] ';
          if (!n)         cls += 'bg-[#FBFBFB] cursor-default ';
          else if (selected) cls += 'bg-[#022145] text-white rounded-full ';
          else if (booked)   cls += 'bg-[#0D7DC3] text-white hover:bg-[#0b6fad] ';
          else if (todayMark) cls += 'ring-2 ring-[#0D7DC3] text-[#0D7DC3] ';
          else               cls += 'text-[#022145] hover:bg-[#CFE5F3] ';
          return (
            <div key={i} className={cls} onClick={() => n && onSelectDate && onSelectDate(new Date(viewYear, viewMonth, n))}>
              {n || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const subNavItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'encounter', label: 'Encounter', icon: ClipboardList },
  { id: 'administration', label: 'Administration', icon: Settings },
];

const HCPHome = () => {
  /* ── UI state ── */
  const [activeTab, setActiveTab] = useState('home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  /* ── Filters ── */
  const [selectedMonth, setSelectedMonth] = useState('Monthly');
  const [dateStart, setDateStart] = useState('2026-01-01');
  const [dateEnd,   setDateEnd]   = useState('2026-01-31');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chartPeriod, setChartPeriod] = useState('Monthly');
  const [demoFilter, setDemoFilter] = useState('Age');

  /* ── Calendar ── */
  const [calendarSelectedDate, setCalendarSelectedDate] = useState(null);

  /* ── Table state ── */
  const [appointments, setAppointments]   = useState(appointmentsData);
  const [tests,        setTests]          = useState(medicalTestsData);
  const [testSearch,   setTestSearch]     = useState('');
  const [apptSearch,   setApptSearch]     = useState('');

  /* ── Add Appointment modal ── */
  const [showAddModal, setShowAddModal] = useState(false);

  const datePickerRef = useRef();

  useEffect(() => {
    const close = (e) => { if (datePickerRef.current && !datePickerRef.current.contains(e.target)) setShowDatePicker(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  /* ── helpers ── */
  const bookedDates = appointments.map(a => a.date);
  const filteredTests = tests.filter(t =>
    t.name.toLowerCase().includes(testSearch.toLowerCase()) ||
    t.type.toLowerCase().includes(testSearch.toLowerCase())
  );
  const filteredAppts = appointments.filter(a =>
    a.name.toLowerCase().includes(apptSearch.toLowerCase()) ||
    a.title.toLowerCase().includes(apptSearch.toLowerCase())
  );

  const deleteTest = (id) => setTests(prev => prev.filter(t => t.id !== id));
  const deleteAppt = (id) => setAppointments(prev => prev.filter(a => a.id !== id));

  const { user } = useAuth();

  const getDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.username) return user.username;
    if (user?.email) return user.email.split('@')[0];
    return 'Jane Smith';
  };

  const getUserInitials = () => {
    const name = getDisplayName();
    if (name === 'Jane Smith') return 'JS';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const getRole = () => {
    if (user?.role) return user.role;
    return 'Physician';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <div
        className="flex flex-col items-start bg-white"
        style={{ width: '100%' }}
      >
        {/* Top bar */}
        <header
          className="flex flex-row justify-between items-center w-full px-4 sm:px-10 lg:px-14 py-5 gap-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.13)', minHeight: 88 }}
        >
          {/* Left – Logo */}
          <div className="flex items-center gap-8 flex-none">
            <Link to="/" className="flex items-center">
              <img
                src="/vicky-logo.png"
                alt="Vicky Logo"
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback logo */}
              <div className="hidden items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" fill="#20B2AA" opacity="0.2" />
                  <path d="M16 8L20 12L16 16L20 20L16 24L12 20L16 16L12 12L16 8Z" fill="#20B2AA" />
                </svg>
                <span className="text-2xl font-bold text-[#022145]">Vicky</span>
              </div>
            </Link>
          </div>

          {/* Center – Global Search */}
          <div className="hidden md:flex flex-1 justify-center">
            <button
              onClick={() => setShowGlobalSearch(true)}
              className="flex items-center px-4 py-2.5 gap-2.5 w-full max-w-[407px] border border-[#022145] rounded-full cursor-pointer hover:bg-[#022145]/5 transition-colors"
            >
              <Search size={20} className="text-[#022145] flex-none" />
              <span className="flex-1 text-sm text-center text-[#022145] select-none font-normal">
                Global Search
              </span>
              <Search size={20} className="text-[#022145] flex-none opacity-0" />
            </button>
          </div>

          {/* Right – Icons + Profile */}
          <div className="flex items-center gap-3 sm:gap-4 flex-none">
            {/* Mobile search */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 border border-[#022145] rounded-full hover:bg-[#022145]/10 transition-colors"
              onClick={() => setShowGlobalSearch(true)}
            >
              <Search size={20} className="text-[#022145]" />
            </button>

            {/* Messages */}
            <button
              onClick={() => setShowMessages(o => !o)}
              className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border rounded-full transition-colors ${
                showMessages
                  ? 'bg-[#022145] border-[#022145]'
                  : 'bg-white border-[#022145] hover:bg-[#022145]/10'
              }`}
            >
              <MessageSquare size={20} className={showMessages ? 'text-white' : 'text-[#022145]'} />
            </button>

            {/* Notifications */}
            <button
              onClick={() => setNotificationOpen((o) => !o)}
              className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border rounded-full relative transition-colors ${
                notificationOpen
                  ? 'bg-[#022145] border-[#022145]'
                  : 'bg-white border-[#022145] hover:bg-[#022145]/10'
              }`}
            >
              <Bell size={20} className={notificationOpen ? 'text-white' : 'text-[#022145]'} />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-[#022145] rounded-full bg-gradient-to-br from-[#022145] to-[#0D7DC3] text-white font-semibold text-sm select-none">
                {getUserInitials()}
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-semibold text-[#022145] leading-tight">{getDisplayName()}</span>
                <span className="text-xs font-normal text-[#022145] leading-tight">{getRole()}</span>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden flex items-center justify-center p-2 text-[#022145]"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* ── Subheader ── */}
        <div className="flex flex-col justify-center items-start w-full px-4 sm:px-10 lg:px-14 py-6 gap-8 bg-white">
          {/* Desktop nav menu */}
          <div className="hidden lg:flex items-center gap-12 w-full border-b border-[#DFDFDF] overflow-x-auto">
            {subNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 py-3 px-0 whitespace-nowrap transition-colors font-medium text-[18px] leading-[27px] ${
                  activeTab === item.id
                    ? 'text-[#0D7DC3] border-b-2 border-[#0D7DC3] font-bold'
                    : 'text-[#022145] hover:text-[#0D7DC3]'
                }`}
                style={{ marginBottom: activeTab === item.id ? -1 : 0 }}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile nav */}
          {mobileNavOpen && (
            <div className="lg:hidden flex flex-col w-full border-b border-[#DFDFDF] pb-4">
              {subNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-3 py-3 px-2 transition-colors ${
                    activeTab === item.id
                      ? 'text-[#0D7DC3] bg-[#0D7DC3]/10 rounded-lg font-bold'
                      : 'text-[#022145] hover:text-[#0D7DC3]'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="text-base font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Greeting row — hidden on tabs that supply their own title */}
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full ${activeTab === 'patients' || activeTab === 'encounter' ? 'hidden' : ''}`}>
            {/* Welcome text */}
            <div className="flex flex-col gap-1 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#022145] leading-tight">
                Welcome, Dr. {getDisplayName()}
              </h1>
              <p className="text-sm sm:text-base font-normal text-[#022145]">
                Are you ready to start your task today?
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Period filter */}
              <Dropdown
                label="Period"
                value={selectedMonth}
                options={['Daily','Weekly','Monthly','Yearly']}
                onChange={setSelectedMonth}
              />

              {/* Date range picker */}
              <div ref={datePickerRef} className="relative">
                <button
                  onClick={() => setShowDatePicker(o => !o)}
                  className="flex items-center gap-2 px-4 h-12 bg-white border border-[rgba(41,45,50,0.1)] rounded-md hover:border-[#022145] transition-colors"
                >
                  <Calendar size={18} className="text-[#292D32] flex-none" />
                  <span className="text-sm text-[#292D32] whitespace-nowrap">
                    {dateStart ? displayDate(new Date(dateStart+'T00:00:00')) : 'Start'} – {dateEnd ? displayDate(new Date(dateEnd+'T00:00:00')) : 'End'}
                  </span>
                </button>
                {showDatePicker && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-[#EDEDED] rounded-xl shadow-xl z-30 p-4 flex flex-col gap-3 w-72">
                    <label className="text-xs font-semibold text-[#022145]">
                      Start Date
                      <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)}
                        className="mt-1 block w-full border border-[#EDEDED] rounded-md px-3 py-2 text-sm text-[#292D32] focus:outline-none focus:border-[#0D7DC3]" />
                    </label>
                    <label className="text-xs font-semibold text-[#022145]">
                      End Date
                      <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)}
                        className="mt-1 block w-full border border-[#EDEDED] rounded-md px-3 py-2 text-sm text-[#292D32] focus:outline-none focus:border-[#0D7DC3]" />
                    </label>
                    <button onClick={() => setShowDatePicker(false)}
                      className="mt-1 bg-[#0D7DC3] text-white rounded-md py-2 text-sm font-semibold hover:bg-[#0b6fad] transition-colors">
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Add New Task / Appointment */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center gap-2.5 px-4 h-12 bg-[#0D7DC3] rounded-md hover:bg-[#0b6fad] transition-colors"
              >
                <Plus size={20} className="text-white flex-none" />
                <span className="text-sm sm:text-base font-semibold text-white whitespace-nowrap">
                  Add New Appointment
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Global Search Overlay ── */}
      {showGlobalSearch && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-24"
          onClick={() => setShowGlobalSearch(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border border-[#022145] rounded-full px-4 py-2.5">
              <Search size={20} className="text-[#022145]" />
              <input
                autoFocus
                type="text"
                placeholder="Global Search"
                className="flex-1 outline-none text-sm text-[#022145] bg-transparent"
              />
              <button onClick={() => setShowGlobalSearch(false)}>
                <X size={18} className="text-[#022145]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content Area ── */}
      <main className="flex-1 w-full px-4 sm:px-10 lg:px-14 py-8 flex flex-col gap-5">

        {activeTab === 'home' && (
          <>
            {/* ── Row 1: Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {statCardsData.map((card) => (
                <div
                  key={card.label}
                  className="relative overflow-hidden flex flex-col justify-end gap-3 p-4 sm:p-6 bg-white rounded-xl shadow-[0px_3px_12px_rgba(9,30,66,0.1)]"
                >
                  {/* decorative circles */}
                  <div className="absolute -top-8 -left-8 w-24 h-24 rounded-lg bg-[#0D7DC3] opacity-5" />
                  <div className="absolute -top-6 -left-6 w-20 h-20 rounded-lg bg-[#0D7DC3] opacity-10" />

                  <div className="relative z-10 flex justify-between items-center">
                    <span className="text-base font-medium text-black tracking-tight">{card.label}</span>
                    <MoreHorizontal size={20} className="text-[#292D32]" />
                  </div>
                  <span className="relative z-10 text-2xl font-normal text-black">{card.value}</span>
                  <div className="relative z-10 flex items-center gap-1">
                    <TrendingUp size={16} className="text-[#158A5A]" />
                    <span className="text-xs text-[#158A5A] font-['Inter_Tight']">{card.pct} from last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Row 2: Chart + Appointment Panel ── */}
            <div className="flex flex-col xl:flex-row gap-5">

              {/* Appointment Statistics Chart */}
              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-[0px_3px_12px_rgba(9,30,66,0.1)] flex-1 min-w-0">
                {/* header */}
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium text-black tracking-tight">Appointment Statistics</span>
                  <Dropdown
                    label="Period"
                    value={chartPeriod}
                    options={['Daily','Weekly','Monthly','Yearly']}
                    onChange={setChartPeriod}
                  />
                </div>

                {/* summary tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {apptStatsData.summary.map((t) => (
                    <div key={t.label} className="flex flex-col items-center justify-center gap-1 p-4 bg-[rgba(13,125,195,0.1)] border border-[rgba(199,199,199,0.1)] rounded-lg">
                      <span className="text-sm font-medium text-[#292D32]">{t.label}</span>
                      <span className="text-lg font-semibold text-[#292D32]">{t.value}</span>
                    </div>
                  ))}
                </div>

                {/* bar chart */}
                <div className="flex gap-4 items-end h-56 mt-2">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between h-44 pb-6 text-xs text-center text-black shrink-0 w-6">
                    {['120','100','80','60','40','20','10','0'].map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                  {/* bars */}
                  <div className="flex justify-between items-end flex-1 h-56 gap-1">
                    {apptStatsData.chart.map(({ month, green, red, orange }) => (
                      <div key={month} className="flex flex-col items-center gap-2 flex-1">
                        <div className="flex items-end gap-0.5 w-full justify-center" style={{height: 200}}>
                          <div style={{height: orange}} className="w-3 sm:w-4 bg-[#F8A116] rounded-t" />
                          <div style={{height: red}}    className="w-3 sm:w-4 bg-[#FF555F] rounded-t" />
                          <div style={{height: green}}  className="w-3 sm:w-4 bg-[#12B788] rounded-t" />
                        </div>
                        <span className="text-xs text-black">{month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* legend */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {[['#12B788','Completed'],['#FF555F','Canceled'],['#F8A116','Rescheduled']].map(([c,l]) => (
                    <div key={l} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{background: c}} />
                      <span className="text-sm text-[#222126]">{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointment Panel (calendar + upcoming) */}
              <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-[0px_3px_12px_rgba(9,30,66,0.1)] w-full xl:w-[449px] shrink-0">
                {/* title */}
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium text-black tracking-tight">Appointment</span>
                  <MoreHorizontal size={20} className="text-[#292D32]" />
                </div>

                {/* mini calendar — fully interactive */}
                <MiniCalendar
                  bookedDates={bookedDates}
                  selectedDate={calendarSelectedDate}
                  onSelectDate={setCalendarSelectedDate}
                />

                {/* legend */}
                <div className="flex items-center justify-center gap-4">
                  {[['#0D7DC3','Booked'],['rgba(13,125,195,0.2)','Available']].map(([c,l]) => (
                    <div key={l} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{background: c}} />
                      <span className="text-sm text-[#222126]">{l}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-[#F2F2F2]" />

                {/* Upcoming Appointment — shows appointments on selected day or next upcoming */}
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-black tracking-tight">
                    {calendarSelectedDate
                      ? `Appointments — ${displayDate(calendarSelectedDate)}`
                      : 'Upcoming Appointments'}
                  </span>
                  <MoreHorizontal size={20} className="text-[#292D32]" />
                </div>

                <div className="flex flex-col gap-3 overflow-y-auto max-h-64">
                  {(() => {
                    const todayStr = fmt(new Date());
                    const selStr   = calendarSelectedDate ? fmt(calendarSelectedDate) : null;
                    const shown = selStr
                      ? appointments.filter(a => a.date === selStr)
                      : appointments.filter(a => a.date >= todayStr).sort((a,b) => a.date.localeCompare(b.date)).slice(0, 3);
                    if (shown.length === 0) return (
                      <p className="text-sm text-[#767988] text-center py-4">No appointments{selStr ? ' on this day' : ''}.</p>
                    );
                    return shown.map((appt) => (
                      <div key={appt.id} className="border-l-[6px] border-[#0D7DC3] rounded-sm">
                        <div className="flex flex-col gap-2 px-4 py-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-[#022145]">{appt.title}</span>
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#0D7DC3]/10 text-[#0D7DC3]">
                              Scheduled
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-[#767988]">
                            <Users size={14} /><span>{appt.name}</span>
                          </div>
                          <div className="flex flex-wrap gap-4 pt-1 border-t border-[#F2F2F2] text-xs text-[#767988]">
                            <div className="flex items-center gap-1"><Calendar size={12} /><span>{appt.date}</span></div>
                            <div className="flex items-center gap-1"><Clock size={12} /><span>{appt.start} – {appt.end}</span></div>
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

            {/* ── Row 3: Demographics + Recent Tests ── */}
            <div className="flex flex-col xl:flex-row gap-5">

              {/* Patient Demographics donut */}
              <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-[0px_3px_12px_rgba(9,30,66,0.1)] w-full xl:w-[348px] shrink-0">
                <div className="flex justify-between items-center w-full">
                  <span className="text-xl font-medium text-black tracking-tight leading-tight">Patients Demographics</span>
                  <Dropdown
                    label="Filter"
                    value={demoFilter}
                    options={['Age','Gender','Region']}
                    onChange={setDemoFilter}
                    className="text-sm"
                  />
                </div>

                {/* donut */}
                <div className="relative flex items-center justify-center w-[180px] h-[180px]">
                  <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
                    {demographicsData.segments.reduce((acc, seg) => {
                      const r = 70, circ = 2 * Math.PI * r;
                      const dash  = (seg.pct / 100) * circ;
                      const off   = (1 - acc.offset / 100) * circ;
                      acc.els.push(
                        <circle key={seg.color} cx="90" cy="90" r={r}
                          fill="none" stroke={seg.color} strokeWidth="28"
                          strokeDasharray={`${dash} ${circ - dash}`}
                          strokeDashoffset={-off + circ}
                        />
                      );
                      acc.offset += seg.pct;
                      return acc;
                    }, {els:[], offset:0}).els}
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-normal text-black">{demographicsData.totalPatients}</span>
                    <span className="text-xs text-black opacity-40">Total Patients</span>
                  </div>
                </div>

                {/* legend */}
                <div className="flex flex-wrap justify-center gap-3">
                  {demographicsData.segments.map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{background: color}} />
                      <span className="text-sm text-[#222126]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Tests / Medical Records table */}
              <div className="flex-1 flex flex-col gap-4 p-6 bg-white border border-[#E0E0E0] rounded-xl overflow-x-auto">
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <span className="text-xl font-medium text-[#222126]">Recent Medical Tests</span>
                  <div className="flex items-center gap-2 px-6 py-3 border border-[rgba(158,158,158,0.2)] rounded-full">
                    <Search size={16} className="text-[#022145]" />
                    <input
                      type="text"
                      value={testSearch}
                      onChange={e => setTestSearch(e.target.value)}
                      placeholder="Search patient or test..."
                      className="outline-none text-sm text-[#1B1B28] bg-transparent w-40 placeholder-[#9E9E9E]"
                    />
                    {testSearch && (
                      <button onClick={() => setTestSearch('')}><X size={14} className="text-[#9E9E9E]" /></button>
                    )}
                  </div>
                </div>

                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#DCDFE3]">
                      {['Patient Name','Test Type','Test Date','Status','Action'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[#9E9E9E]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTests.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-sm text-[#9E9E9E]">No matching records.</td>
                      </tr>
                    ) : filteredTests.map((row, i) => {
                      const initials = row.name.split(' ').map(p => p[0]).join('').slice(0,2).toUpperCase();
                      return (
                        <tr key={row.id} className={i % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#DBE6ED] flex items-center justify-center text-xs font-bold text-[#358ABE]">{initials}</div>
                              <span className="font-medium text-[#1B1B28]">{row.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.type}</td>
                          <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.date}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <button className="w-9 h-9 flex items-center justify-center bg-[rgba(0,110,239,0.1)] rounded-lg hover:bg-[#0D7DC3]/20 transition-colors">
                                <Eye size={15} className="text-[#0D7DC3]" />
                              </button>
                              <button
                                onClick={() => deleteTest(row.id)}
                                className="w-9 h-9 flex items-center justify-center bg-[#FFE2E5] rounded-lg hover:bg-red-200 transition-colors"
                              >
                                <Trash2 size={15} className="text-[#921919]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Row 4: Appointments Table ── */}
            <div className="flex flex-col gap-4 p-6 bg-white border border-[#E0E0E0] rounded-xl overflow-x-auto">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <span className="text-xl font-medium text-[#222126]">Appointment Schedule</span>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 px-6 py-3 border border-[rgba(158,158,158,0.2)] rounded-full">
                    <Search size={16} className="text-[#022145]" />
                    <input
                      type="text"
                      value={apptSearch}
                      onChange={e => setApptSearch(e.target.value)}
                      placeholder="Search appointments..."
                      className="outline-none text-sm text-[#1B1B28] bg-transparent w-40 placeholder-[#9E9E9E]"
                    />
                    {apptSearch && (
                      <button onClick={() => setApptSearch('')}><X size={14} className="text-[#9E9E9E]" /></button>
                    )}
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 h-12 bg-[#0D7DC3] rounded-md hover:bg-[#0b6fad] transition-colors"
                  >
                    <Plus size={18} className="text-white" />
                    <span className="text-sm font-semibold text-white whitespace-nowrap">Add New Appointment</span>
                  </button>
                </div>
              </div>

              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#DCDFE3]">
                    {['Patient Name','Appointment Title','Date','Start Time','End Time','Details','Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[#9E9E9E]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAppts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-sm text-[#9E9E9E]">No matching appointments.</td>
                    </tr>
                  ) : filteredAppts.map((row, i) => (
                    <tr key={row.id} className={i % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.name}</td>
                      <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.title}</td>
                      <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.date}</td>
                      <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.start}</td>
                      <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.end}</td>
                      <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.details || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button className="w-9 h-9 flex items-center justify-center bg-[rgba(0,110,239,0.1)] rounded-lg hover:bg-[#0D7DC3]/20 transition-colors">
                            <Eye size={15} className="text-[#0D7DC3]" />
                          </button>
                          <button
                            onClick={() => deleteAppt(row.id)}
                            className="w-9 h-9 flex items-center justify-center bg-[#FFE2E5] rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 size={15} className="text-[#921919]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'calendar'       && <CalendarView />}
        {activeTab === 'patients'       && <Patient />}
        {activeTab === 'encounter'      && <Encounter />}
        {activeTab === 'administration' && <Administration />}
      </main>

      <MessagesPanel open={showMessages} onClose={() => setShowMessages(false)} />

      <AddAppointmentModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={appt => setAppointments(prev => [...prev, appt])}
      />

      {/* ── Footer ── */}
      <DashboardFooter />
    </div>
  );
};

export default HCPHome;
