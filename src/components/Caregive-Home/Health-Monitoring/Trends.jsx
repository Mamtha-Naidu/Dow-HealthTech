import React, { useState } from 'react';
import { BarChart } from '../Beneficiaries/HealthTrends';

const healthTrendData = [
  { label: 'Heart Rate', value: 273, color: '#FF3A5E' },
  { label: 'Blood Pressure', value: 141, color: '#00B77D' },
  { label: 'Blood Sugar', value: 235, color: '#F1950A' },
  { label: 'Oxygen Level', value: 119, color: '#00B77D' },
  { label: 'Weight', value: 313, color: '#FF3A5E' },
  { label: 'Temperature', value: 245, color: '#F1950A' },
  { label: 'Sleep Quality', value: 133, color: '#00B77D' }
];

const bloodSugarData = [
  { label: 'Week 1', value: 273, color: '#FF3A5E' },
  { label: 'Week 2', value: 155, color: '#4485FE' },
  { label: 'Week 3', value: 77, color: '#00B77D' },
  { label: 'Week 4', value: 67, color: '#00B77D' },
  { label: 'Week 5', value: 313, color: '#FF3A5E' },
  { label: 'Week 6', value: 172, color: '#F1950A' },
  { label: 'Week 7', value: 182, color: '#4485FE' }
];

const healthTrendLegend = [
  { label: 'Normal', color: '#00B77D' },
  { label: 'Warning', color: '#F1950A' },
  { label: 'High', color: '#FF3A5E' }
];

const bloodSugarLegend = [
  { label: 'Normal', color: '#00B77D' },
  { label: 'Fasting', color: '#4485FE' },
  { label: 'Warning', color: '#F1950A' },
  { label: 'High', color: '#FF3A5E' }
];

const Trends = () => {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-01-31');

  return (
    <>
      {/* Health Trend Chart */}
      <BarChart
        data={healthTrendData}
        title="Health Trend Overview"
        legend={healthTrendLegend}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {/* Blood Sugar Chart */}
      <BarChart
        data={bloodSugarData}
        title="Blood Sugar"
        legend={bloodSugarLegend}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
    </>
  );
};

export default Trends;
