import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Activity,
  Home
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Calendar Widget
// ---------------------------------------------------------------------------
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Dates (for July 2025) that have appointments — shown with green dot + highlight
const EVENT_DATES = [16, 20, 24, 12];
// Today's date (highlighted blue)
const TODAY = 11;

const CalendarWidget = () => {
  const [month] = useState('July 2025');

  // Build a 6-week grid for July 2025 (starts on Tuesday = col index 2)
  // We use a static grid that matches the Figma exactly
  const weeks = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, TODAY, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, null, null],
  ];

  const isWeekend = (colIndex) => colIndex === 0 || colIndex === 6;

  const getDayClass = (day, colIndex) => {
    if (!day) return '';
    if (day === TODAY) {
      return 'bg-[#006EEF] rounded-lg text-white font-semibold text-sm';
    }
    if (EVENT_DATES.includes(day)) {
      return 'bg-[rgba(0,183,125,0.1)] rounded-xl text-[#292D32] font-semibold text-sm relative';
    }
    const color = isWeekend(colIndex) ? 'text-[#FF555F]' : 'text-[#292D32]';
    return `${color} font-semibold text-sm`;
  };

  return (
    <div className="flex flex-col items-start p-6 gap-4 bg-white border border-[#E3E3E3] rounded-xl flex-1 min-w-0">
      {/* Header */}
      <div className="flex flex-row items-center justify-between w-full">
        <span className="font-semibold text-xl leading-[30px] text-[#222126]">
          Appointment Calendar
        </span>
      </div>

      {/* Month navigation */}
      <div className="flex flex-row items-center py-3 gap-6 w-full">
        <button className="w-5 h-5 flex items-center justify-center text-[#0D1C2E]">
          <ChevronLeft size={20} />
        </button>
        <span className="flex-1 text-center font-bold text-base leading-[22px] tracking-[0.15px] text-[#1E1E1E]">
          {month}
        </span>
        <button className="w-5 h-5 flex items-center justify-center text-[#0D1C2E]">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Day headers + grid */}
      <div className="flex flex-row items-start gap-1 w-full">
        {DAYS.map((day, colIndex) => (
          <div key={day} className="flex flex-col items-start flex-1">
            {/* Day label */}
            <div className="flex flex-col justify-center items-center px-2 py-1.5 w-full h-10">
              <span
                className={`font-semibold text-base leading-6 tracking-[0.1px] ${
                  isWeekend(colIndex) ? 'text-[#303135]' : 'text-[#303135]'
                }`}
              >
                {day}
              </span>
            </div>

            {/* Date cells */}
            {weeks.map((week, wIdx) => {
              const day_val = week[colIndex];
              return (
                <div
                  key={wIdx}
                  className="flex flex-col justify-center items-center p-2 w-full h-[68px]"
                >
                  {day_val && (
                    <div
                      className={`flex flex-col justify-center items-center w-full h-full rounded-xl relative cursor-pointer ${getDayClass(day_val, colIndex)}`}
                    >
                      <span className={`leading-6 tracking-[0.1px] ${day_val === TODAY ? 'text-white' : ''}`}>
                        {day_val}
                      </span>
                      {EVENT_DATES.includes(day_val) && (
                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#00B77D] rounded-full" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Appointment Card
// ---------------------------------------------------------------------------
const AppointmentCard = ({ borderColor, title, status, statusStyle, patientName, date, time, doctor }) => (
  <div
    className="flex flex-col justify-center items-start w-full bg-white rounded-xl overflow-hidden"
    style={{ borderLeft: `6px solid ${borderColor}` }}
  >
    <div className="flex flex-col items-start px-6 py-4 gap-3 w-full border border-l-0 border-[#E3E3E3] rounded-r-xl">
      {/* Title row */}
      <div className="flex flex-col items-start gap-1 w-full">
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          <span className="font-semibold text-base leading-6 text-[#1B1E25] capitalize">
            {title}
          </span>
          <span className={`flex items-center px-3 py-0.5 rounded-full text-xs font-bold leading-[18px] tracking-[0.02em] ${statusStyle}`}>
            {status}
          </span>
        </div>
        <span className="font-normal text-sm leading-6 text-[#595E65]">{patientName}</span>
      </div>

      {/* Footer */}
      <div className="flex flex-row flex-wrap justify-between items-center gap-y-2 pt-2 w-full border-t border-[#F2F2F2]">
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <Calendar size={20} className="text-[#022145]" />
            <span className="font-medium text-sm leading-6 text-[#595E65]">{date}</span>
          </div>
          <div className="flex flex-row items-center gap-2 ml-4">
            <Clock size={20} className="text-[#022145]" />
            <span className="font-medium text-sm leading-6 text-[#595E65]">{time}</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <User size={20} className="text-[#292D32]" />
          <span className="font-normal text-sm leading-6 text-[#595E65]">{doctor}</span>
        </div>
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Upcoming Appointments Panel
// ---------------------------------------------------------------------------
const appointments = [
  {
    id: 1,
    borderColor: '#F1416C',
    title: 'Annual Physical Exam',
    status: 'Urgent',
    statusStyle: 'bg-[rgba(238,68,93,0.1)] text-[#EE445D]',
    patientName: 'Akosua Mensah',
    date: 'Jul 12',
    time: '05:00 PM',
    doctor: 'Dr. Kwame Doe',
  },
  {
    id: 2,
    borderColor: '#00B77D',
    title: 'Medication Review',
    status: 'Confirmed',
    statusStyle: 'bg-[#E8FFF3] border border-[#E7F8EF] text-[#50CD89]',
    patientName: 'Kofi Asante',
    date: 'Jul 16',
    time: '05:00 PM',
    doctor: 'Dr. Kwame Doe',
  },
  {
    id: 3,
    borderColor: '#00B77D',
    title: 'Physical Therapy Session',
    status: 'Confirmed',
    statusStyle: 'bg-[#E8FFF3] border border-[#E7F8EF] text-[#50CD89]',
    patientName: 'Ama Boateng',
    date: 'Jul 20',
    time: '05:00 PM',
    doctor: 'Dr. Kwame Doe',
  },
];

const UpcomingAppointments = () => (
  <div className="flex flex-col items-start p-6 gap-4 bg-white border border-[#E3E3E3] rounded-xl w-full xl:w-[459px] flex-shrink-0">
    <span className="font-semibold text-xl leading-[30px] text-[#222126]">
      Upcoming Appointments
    </span>
    <div className="flex flex-col items-start gap-4 w-full">
      {appointments.map((appt) => (
        <AppointmentCard key={appt.id} {...appt} />
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Service category panel
// ---------------------------------------------------------------------------
const ServiceItem = ({ title, description }) => (
  <div className="flex flex-row items-center gap-3 w-full">
    <div className="flex flex-col items-start gap-1 flex-1">
      <div className="flex flex-row items-center gap-3">
        <span className="font-semibold text-base leading-6 text-[#1B1E25] capitalize">{title}</span>
      </div>
      <span className="font-normal text-sm leading-6 text-[#595E65]">{description}</span>
    </div>
    <button className="flex items-center justify-center px-3 py-2 bg-[#00B77D] rounded-full text-white text-xs font-bold leading-3 tracking-[0.01em] whitespace-nowrap">
      Book Now
    </button>
  </div>
);

const ServiceCategoryCard = ({ iconBg, iconColor, title, services }) => (
  <div className="flex flex-col items-start p-6 gap-4 bg-white border border-[#E3E3E3] rounded-xl flex-1 min-w-0">
    {/* Header */}
    <div className="flex flex-row items-center gap-4 pb-4 w-full border-b border-[#E3E3E3]">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-md"
        style={{ background: iconBg }}
      >
        {iconColor}
      </div>
      <span className="font-semibold text-xl leading-[30px] text-[#222126]">{title}</span>
    </div>

    {/* Service items */}
    <div className="flex flex-col items-start gap-4 w-full">
      {services.map((svc, idx) => (
        <ServiceItem key={idx} title={svc.title} description={svc.description} />
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Service category data
// ---------------------------------------------------------------------------
const medicalServices = [
  { title: 'Annual Physical Exam', description: 'Comprehensive health assessment' },
  { title: 'Medication Management', description: 'Prescription review and monitoring' },
  { title: 'Preventive Screenings', description: 'Preventive health checks' },
];

const rehabServices = [
  { title: 'Physical Therapy', description: 'Evaluate movement and function' },
  { title: 'Occupational Therapy', description: 'Customized rehabilitation program' },
  { title: 'Therapeutic Interventions', description: 'Therapeutic interventions' },
];

const homeCareServices = [
  { title: 'Personal Care', description: 'Daily living assistance' },
  { title: 'Companion Care', description: 'Social interaction and support' },
  { title: 'Meal Services', description: 'Nutritious meal planning' },
];

// ---------------------------------------------------------------------------
// Main Scheduling view
// ---------------------------------------------------------------------------
const Scheduling = ({ defaultFilter }) => {
  const showAll = !defaultFilter;
  const showMedical = showAll || defaultFilter === 'medical';
  const showRehab = showAll || defaultFilter === 'rehab';
  const showHomecare = showAll || defaultFilter === 'homecare';

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top row: Calendar + Appointments */}
      <div className="flex flex-col xl:flex-row items-start gap-6 w-full">
        <CalendarWidget />
        <UpcomingAppointments />
      </div>

      {/* Service category panels — row 1 */}
      {(showMedical || showRehab) && (
        <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
          {showMedical && (
            <ServiceCategoryCard
              iconBg="rgba(0,110,239,0.1)"
              iconColor={<Stethoscope size={24} className="text-[#0795FF]" />}
              title="Medical Services"
              services={medicalServices}
            />
          )}
          {showRehab && (
            <ServiceCategoryCard
              iconBg="#F6EFFB"
              iconColor={<Activity size={24} className="text-[#8800E9]" />}
              title="Rehabilitation"
              services={rehabServices}
            />
          )}
        </div>
      )}

      {/* Service category panel — Home Care */}
      {showHomecare && (
        <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
          <ServiceCategoryCard
            iconBg="rgba(238,68,93,0.1)"
            iconColor={<Home size={24} className="text-[#EE445D]" />}
            title="Home Care"
            services={homeCareServices}
          />
          {/* Empty placeholder to keep grid alignment */}
          {showAll && <div className="flex-1 min-w-0" />}
        </div>
      )}
    </div>
  );
};

export default Scheduling;
