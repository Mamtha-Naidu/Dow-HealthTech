import React, { useState } from 'react';
import {
  ChevronLeft, ChevronRight, Plus, Search, Eye, Trash2, X,
  Calendar as CalendarIcon, Clock, Users,
} from 'lucide-react';

import appointmentsData  from '../../data/hcp/appointments.json';
import calendarEventsData from '../../data/hcp/calendarEvents.json';
import tasksData          from '../../data/hcp/tasks.json';
import AddAppointmentModal from './patient/AddAppointmentModal';

/* ─── helpers ──────────────────────────────────────────── */
const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m)    { return new Date(y, m, 1).getDay(); }
function fmtDate(d)            { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function displayDMY(iso)       {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

/* ─── Modal helper ─────────────────────────────────────── */
function Modal({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#EDEDED]">
          <h2 className="text-lg font-semibold text-[#022145]">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <X size={18} className="text-[#292D32]" />
          </button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">{children}</div>
        {footer && <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#EDEDED]">{footer}</div>}
      </div>
    </div>
  );
}

function FieldInput({ label, required, ...inputProps }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-[#022145]">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      <input
        {...inputProps}
        className="border border-[#EDEDED] rounded-lg px-3 py-2.5 text-sm text-[#1B1B28] focus:outline-none focus:border-[#0D7DC3] transition-colors placeholder-[#BDBDBD]"
      />
    </label>
  );
}

/* ─── Appointment card ─────────────────────────────────── */
function ApptCard({ ev }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ borderLeft: `6px solid ${ev.color}` }}>
      <div className="flex flex-col gap-2 px-5 py-3 border border-l-0 border-[#E3E3E3] rounded-r-xl">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-[#022145]">{ev.title}</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={{ background: `${ev.color}22`, color: ev.color }}>
            {ev.status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#767988]">
          <Users size={14} /><span>{ev.patient}</span>
          {ev.details && (<><div className="w-2 h-2 rounded-full bg-[#D9D9D9] shrink-0" /><span className="truncate">{ev.details}</span></>)}
        </div>
        <div className="flex flex-wrap gap-4 pt-1 border-t border-[#F2F2F2] text-xs text-[#767988]">
          <div className="flex items-center gap-1"><CalendarIcon size={13} /><span>{displayDMY(ev.date)}</span></div>
          <div className="flex items-center gap-1"><Clock size={13} /><span>{ev.time}</span></div>
          {ev.doctor && <div className="flex items-center gap-1"><Users size={13} /><span>{ev.doctor}</span></div>}
        </div>
      </div>
    </div>
  );
}

/* ─── Main CalendarView component ──────────────────────── */
const CalendarView = () => {
  const today = new Date();

  /* calendar navigation */
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  /* data state — seeded from JSON files */
  const [events,       setEvents]       = useState(calendarEventsData);
  const [appointments, setAppointments] = useState(appointmentsData);
  const [tasks,        setTasks]        = useState(tasksData);

  /* search */
  const [apptSearch, setApptSearch] = useState('');
  const [taskSearch, setTaskSearch] = useState('');

  /* add appointment modal */
  const [showApptModal, setShowApptModal] = useState(false);

  /* add task modal */
  const [showTaskModal, setShowTaskModal] = useState(false);
  const EMPTY_TASK = { patient:'', activity:'', date:'', time:'', details:'' };
  const [newTask, setNewTask] = useState(EMPTY_TASK);

  /* event detail popover */
  const [detailEvent, setDetailEvent] = useState(null);

  /* ── calendar helpers ── */
  const firstDay  = getFirstDay(viewYear, viewMonth);
  const daysCount = getDaysInMonth(viewYear, viewMonth);
  const totalCells = Math.ceil((firstDay + daysCount) / 7) * 7;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cellDateStr = (dayNum) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(dayNum).padStart(2,'0')}`;

  const eventsForDate = (dateStr) => [
    ...events.filter(e => e.date === dateStr),
    ...appointments.filter(a => a.date === dateStr).map(a => ({
      id: `appt-${a.id}`, title: a.title, date: a.date, color: '#0D7DC3',
      patient: a.name, time: a.start, status: 'Scheduled', doctor: '', details: a.details,
    })),
  ];

  const monthEventsCount = [
    ...events, ...appointments.map(a => ({ date: a.date }))
  ].filter(e => e.date?.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2,'0')}`)).length;

  /* ── right panel: upcoming or selected ── */
  const selStr = selectedDate ? fmtDate(selectedDate) : null;
  const todayStr = fmtDate(today);
  const allEvents = [
    ...events,
    ...appointments.map(a => ({
      id: `appt-${a.id}`, title: a.title, date: a.date, color: '#0D7DC3',
      patient: a.name, time: a.start, status: 'Scheduled', doctor: '', details: a.details,
    })),
  ];
  const displayedEvents = selStr
    ? allEvents.filter(e => e.date === selStr)
    : allEvents.filter(e => e.date >= todayStr).sort((a,b) => a.date.localeCompare(b.date)).slice(0, 6);

  /* ── table filters ── */
  const filteredAppts = appointments.filter(a =>
    a.name.toLowerCase().includes(apptSearch.toLowerCase()) ||
    a.title.toLowerCase().includes(apptSearch.toLowerCase())
  );
  const filteredTasks = tasks.filter(t =>
    t.patient.toLowerCase().includes(taskSearch.toLowerCase()) ||
    t.activity.toLowerCase().includes(taskSearch.toLowerCase())
  );

  /* ── CRUD actions ── */
  const saveTask = () => {
    if (!newTask.patient || !newTask.activity || !newTask.date) return;
    setTasks(prev => [...prev, { ...newTask, id: Date.now() }]);
    setNewTask(EMPTY_TASK);
    setShowTaskModal(false);
  };

  const deleteAppt = (id) => setAppointments(prev => prev.filter(a => a.id !== id));
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));
  const deleteEvent = (id) =>  setEvents(prev => prev.filter(e => e.id !== id));

  return (
    <div className="flex flex-col gap-5">
      {/* ── Page heading ── */}
      <div>
        <h1 className="text-3xl font-bold text-[#022145]">Calendar</h1>
        <p className="text-base text-[#022145] mt-1 opacity-70">
          View, manage, and update your upcoming appointments with ease.
        </p>
      </div>

      {/* ── Row 1: Monthly grid + Appointment panel ── */}
      <div className="flex flex-col xl:flex-row gap-5 items-start">

        {/* ── Left: Schedule grid ── */}
        <div className="flex flex-col gap-4 p-6 bg-white border border-[#E3E3E3] rounded-xl flex-1 min-w-0">
          {/* header */}
          <div className="flex justify-between items-center flex-wrap gap-3">
            <span className="text-2xl font-bold text-[#022145]">Schedule</span>
            <button
              onClick={() => setShowApptModal(true)}
              className="flex items-center gap-2 px-4 py-3 bg-[#0D7DC3] rounded-md hover:bg-[#0b6fad] transition-colors"
            >
              <Plus size={20} className="text-white" />
              <span className="text-base font-semibold text-white">Add New Task/Appointment</span>
            </button>
          </div>

          {/* calendar card */}
          <div className="border border-[#EDEDED] rounded-xl overflow-hidden">
            {/* navigator row */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDEDED] flex-wrap gap-3">
              {/* month info */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center border border-[#EDEDED] rounded-md overflow-hidden w-12">
                  <div className="w-full text-center text-xs font-bold text-[#022145] bg-[#F0F0F0] py-0.5 tracking-wider">
                    {MONTH_NAMES[viewMonth].slice(0,3).toUpperCase()}
                  </div>
                  <span className="text-base font-bold text-[#222126] py-1">{today.getDate()}</span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#022145]">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </p>
                  <p className="text-sm text-[#222126] opacity-60">
                    {monthEventsCount} appointment{monthEventsCount !== 1 ? 's' : ''} this month
                  </p>
                </div>
              </div>

              {/* prev / next */}
              <div className="flex items-center border border-[#EDEDED] rounded-md overflow-hidden">
                <button onClick={prevMonth} className="flex items-center justify-center w-10 h-9 border-r border-[#EDEDED] hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={18} className="text-[#B4B4B4]" />
                </button>
                <div className="flex items-center justify-center px-4 h-9 text-sm font-medium text-[#222126] min-w-[130px]">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </div>
                <button onClick={nextMonth} className="flex items-center justify-center w-10 h-9 border-l border-[#EDEDED] hover:bg-gray-50 transition-colors">
                  <ChevronRight size={18} className="text-[#022145]" />
                </button>
              </div>
            </div>

            {/* grid */}
            <div className="grid grid-cols-7 overflow-hidden">
              {/* Day-of-week headers */}
              {DAY_LABELS.map(d => (
                <div key={d}
                  className={`flex items-center justify-center h-10 border-b border-r border-[#EDEDED] text-sm font-semibold
                    ${d === 'Sun' || d === 'Sat' ? 'text-[#FF555F]' : 'text-[#022145]'}`}
                >
                  {d}
                </div>
              ))}

              {/* Day cells */}
              {Array.from({ length: totalCells }, (_, i) => {
                const dayOffset = i - firstDay;
                const inMonth   = dayOffset >= 0 && dayOffset < daysCount;
                const dayNum    = dayOffset + 1;
                const dateStr   = inMonth ? cellDateStr(dayNum) : null;
                const dayEvs    = dateStr ? eventsForDate(dateStr) : [];
                const isSel     = dateStr && selStr === dateStr;
                const isToday   = dateStr && fmtDate(today) === dateStr;
                const colIdx    = i % 7;
                const weekend   = colIdx === 0 || colIdx === 6;

                return (
                  <div
                    key={i}
                    onClick={() => inMonth && setSelectedDate(new Date(viewYear, viewMonth, dayNum))}
                    className={`flex flex-col gap-1 p-2 border-b border-r border-[#EDEDED] transition-colors
                      ${!inMonth ? 'bg-[#FBFBFB] cursor-default' : isSel ? 'bg-[#EEF5FB] cursor-pointer' : 'hover:bg-[#F9FBFD] cursor-pointer'}`}
                    style={{ minHeight: 104 }}
                  >
                    {inMonth && (
                      <>
                        <span className={`text-sm font-semibold leading-none mb-1
                          ${isToday ? 'inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0D7DC3] text-white text-xs'
                            : isSel ? 'text-[#0D7DC3]'
                            : weekend ? 'text-[#FF555F]'
                            : 'text-[#022145]'}`}>
                          {dayNum}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          {dayEvs.slice(0, 2).map(ev => (
                            <button
                              key={ev.id}
                              onClick={e => { e.stopPropagation(); setDetailEvent(ev); }}
                              className="flex items-center px-1.5 py-0.5 rounded text-white text-[10px] font-medium truncate w-full text-left leading-tight"
                              style={{ backgroundColor: ev.color }}
                            >
                              {ev.title}
                            </button>
                          ))}
                          {dayEvs.length > 2 && (
                            <span className="text-[10px] text-[#767988] pl-1">
                              +{dayEvs.length - 2} more
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right: Appointment panel ── */}
        <div className="flex flex-col gap-4 p-6 bg-white border border-[#E3E3E3] rounded-xl w-full xl:w-[420px] shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#222126]">
              {selStr
                ? `${selectedDate.toLocaleDateString('en-US',{month:'short',day:'numeric'})}`
                : 'Upcoming Appointments'}
            </h2>
            {selStr && (
              <button
                onClick={() => setSelectedDate(null)}
                className="text-xs text-[#0D7DC3] hover:underline"
              >
                View all upcoming
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: 540 }}>
            {displayedEvents.length === 0 ? (
              <p className="text-sm text-[#767988] text-center py-8">
                No appointments{selStr ? ' on this day' : ' coming up'}.
              </p>
            ) : displayedEvents.map(ev => (
              <ApptCard key={ev.id} ev={ev} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Appointment Schedule table ── */}
      <div className="flex flex-col gap-4 p-6 bg-white border border-[#E0E0E0] rounded-xl overflow-x-auto">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <span className="text-xl font-medium text-[#222126]">Appointment Schedule</span>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-5 py-2.5 border border-[rgba(158,158,158,0.2)] rounded-full">
              <Search size={15} className="text-[#022145]" />
              <input
                type="text"
                value={apptSearch}
                onChange={e => setApptSearch(e.target.value)}
                placeholder="Search appointments..."
                className="outline-none text-sm text-[#1B1B28] bg-transparent w-40 placeholder-[#9E9E9E]"
              />
              {apptSearch && (
                <button onClick={() => setApptSearch('')}>
                  <X size={13} className="text-[#9E9E9E]" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowApptModal(true)}
              className="flex items-center gap-2 px-4 h-10 bg-[#0D7DC3] rounded-md hover:bg-[#0b6fad] transition-colors"
            >
              <Plus size={17} className="text-white" />
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
              <tr><td colSpan={7} className="px-4 py-6 text-center text-sm text-[#9E9E9E]">No matching appointments.</td></tr>
            ) : filteredAppts.map((row, i) => (
              <tr key={row.id} className={i % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}>
                <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.name}</td>
                <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.title}</td>
                <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.date}</td>
                <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.start}</td>
                <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.end}</td>
                <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.details || '-'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
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

      {/* ── Row 3: Tasks table ── */}
      <div className="flex flex-col gap-4 p-6 bg-white border border-[#E0E0E0] rounded-xl overflow-x-auto">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <span className="text-xl font-medium text-[#222126]">Tasks</span>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-5 py-2.5 border border-[rgba(158,158,158,0.2)] rounded-full">
              <Search size={15} className="text-[#022145]" />
              <input
                type="text"
                value={taskSearch}
                onChange={e => setTaskSearch(e.target.value)}
                placeholder="Search tasks..."
                className="outline-none text-sm text-[#1B1B28] bg-transparent w-40 placeholder-[#9E9E9E]"
              />
              {taskSearch && (
                <button onClick={() => setTaskSearch('')}>
                  <X size={13} className="text-[#9E9E9E]" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center gap-2 px-4 h-10 bg-[#0D7DC3] rounded-md hover:bg-[#0b6fad] transition-colors"
            >
              <Plus size={17} className="text-white" />
              <span className="text-sm font-semibold text-white whitespace-nowrap">Add New Task</span>
            </button>
          </div>
        </div>

        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-[#DCDFE3]">
              {['Patient Name','Task / Activity','Date','Time','Details','Action'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[#9E9E9E]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-sm text-[#9E9E9E]">No matching tasks.</td></tr>
            ) : filteredTasks.map((row, i) => (
              <tr key={row.id} className={i % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}>
                <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.patient}</td>
                <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.activity}</td>
                <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.date}</td>
                <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.time}</td>
                <td className="px-4 py-3 font-medium text-[#1B1B28]">{row.details}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="w-9 h-9 flex items-center justify-center bg-[rgba(0,110,239,0.1)] rounded-lg hover:bg-[#0D7DC3]/20 transition-colors">
                      <Eye size={15} className="text-[#0D7DC3]" />
                    </button>
                    <button
                      onClick={() => deleteTask(row.id)}
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

      <AddAppointmentModal
        open={showApptModal}
        onClose={() => setShowApptModal(false)}
        onSave={appt => setAppointments(prev => [...prev, appt])}
      />

      {/* ── Add Task Modal ── */}
      {showTaskModal && (
        <Modal
          title="New Task"
          onClose={() => { setShowTaskModal(false); setNewTask(EMPTY_TASK); }}
          footer={
            <>
              <button
                onClick={() => { setShowTaskModal(false); setNewTask(EMPTY_TASK); }}
                className="px-5 py-2.5 rounded-lg border border-[#EDEDED] text-sm font-semibold text-[#292D32] hover:bg-gray-50 transition-colors"
              >Cancel</button>
              <button
                onClick={saveTask}
                disabled={!newTask.patient || !newTask.activity || !newTask.date}
                className="px-5 py-2.5 rounded-lg bg-[#0D7DC3] text-white text-sm font-semibold hover:bg-[#0b6fad] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >Save Task</button>
            </>
          }
        >
          <FieldInput label="Patient Name"       required type="text" value={newTask.patient}  placeholder="e.g. John Doe"         onChange={e => setNewTask(p => ({...p, patient:  e.target.value}))} />
          <FieldInput label="Task / Activity"    required type="text" value={newTask.activity} placeholder="e.g. Preparing Medicine" onChange={e => setNewTask(p => ({...p, activity: e.target.value}))} />
          <FieldInput label="Date"               required type="date" value={newTask.date}                                          onChange={e => setNewTask(p => ({...p, date:     e.target.value}))} />
          <FieldInput label="Time"                        type="time" value={newTask.time}                                          onChange={e => setNewTask(p => ({...p, time:     e.target.value}))} />
          <FieldInput label="Details (optional)"          type="text" value={newTask.details}  placeholder="Additional notes..."    onChange={e => setNewTask(p => ({...p, details:  e.target.value}))} />
        </Modal>
      )}

      {/* ── Event Detail Modal ── */}
      {detailEvent && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setDetailEvent(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* coloured header strip */}
            <div className="h-2" style={{ backgroundColor: detailEvent.color }} />
            <div className="px-6 py-5 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-[#022145]">{detailEvent.title}</h2>
                  <span
                    className="mt-1 inline-block px-3 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: `${detailEvent.color}22`, color: detailEvent.color }}
                  >
                    {detailEvent.status}
                  </span>
                </div>
                <button
                  onClick={() => setDetailEvent(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={17} className="text-[#292D32]" />
                </button>
              </div>

              <div className="flex flex-col gap-2 text-sm text-[#767988]">
                <div className="flex items-center gap-2"><Users size={15} /><span>{detailEvent.patient}</span></div>
                <div className="flex items-center gap-2"><CalendarIcon size={15} /><span>{detailEvent.date}</span></div>
                <div className="flex items-center gap-2"><Clock size={15} /><span>{detailEvent.time}</span></div>
                {detailEvent.doctor && <div className="flex items-center gap-2"><Users size={15} /><span>{detailEvent.doctor}</span></div>}
                {detailEvent.details && <p className="text-[#022145] mt-1">{detailEvent.details}</p>}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => {
                    deleteEvent(detailEvent.id);
                    setDetailEvent(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFE2E5] text-[#921919] text-sm font-semibold hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={15} /> Remove event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
