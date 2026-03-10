import React from 'react';
import { Heart, Activity, Droplets, CheckCircle, Thermometer } from 'lucide-react';
import { QuickStatCard, ActivityTable, ExtendedStatCard } from './HealthMonitoring';

const dailyVitalsData = [
  { time: 'Today, 5:00 PM', activity: 'Blood Pressure Check', details: '145/90' },
  { time: 'Today, 3:30 PM', activity: 'Heart Rate Monitor', details: '72 BPM' },
  { time: 'Today, 10:00 AM', activity: 'Temperature Check', details: '98.1°F' }
];

const extendedStats = [
  {
    title: 'Resting Heart Rate (Weekly Avg)',
    value: '95',
    unit: 'bpm',
    statusText: 'Elevated - Monitor',
    icon: Heart,
    iconBgColor: 'bg-[rgba(238,68,93,0.1)]',
    valueColor: 'text-[#EE445D]',
    statusColor: 'text-[#00B77D]'
  },
  {
    title: 'Blood Pressure (Weekly Avg)',
    value: '142/88',
    unit: 'mmHg',
    statusText: 'Stage 1 Hypertension',
    icon: Activity,
    iconBgColor: 'bg-[rgba(63,177,133,0.1)]',
    valueColor: 'text-[#00B77D]',
    statusColor: 'text-[#828386]'
  },
  {
    title: 'Blood Sugar Level (Weekly Avg)',
    value: '180',
    unit: 'mg/dL',
    statusText: 'Above Normal Range',
    icon: Droplets,
    iconBgColor: 'bg-[rgba(238,68,93,0.1)]',
    valueColor: 'text-[#EE445D]',
    statusColor: 'text-[#EE445D]'
  },
  {
    title: 'Medication Adherence',
    value: '85%',
    unit: '',
    statusText: 'Good Compliance',
    icon: CheckCircle,
    iconBgColor: 'bg-[rgba(63,177,133,0.1)]',
    valueColor: 'text-[#00B77D]',
    statusColor: 'text-[#00B77D]'
  }
];

const activityColumns = [
  { header: 'Date & Time', key: 'time' },
  { header: 'Activity', key: 'activity' },
  { header: 'Details', key: 'details' }
];

const Vitals = ({ quickStats }) => (
  <>
    {/* Quick Stats */}
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-4 w-full flex-wrap lg:flex-nowrap">
        {quickStats.map((stat, index) => (
          <QuickStatCard key={index} {...stat} />
        ))}
      </div>
    </div>

    {/* Daily Vitals Table */}
    <ActivityTable
      title="Daily Vital Readings"
      data={dailyVitalsData}
      columns={activityColumns}
    />


    {/* Extended Stats */}
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-4 w-full flex-wrap lg:flex-nowrap">
        {extendedStats.map((stat, index) => (
          <ExtendedStatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  </>
);

export default Vitals;
