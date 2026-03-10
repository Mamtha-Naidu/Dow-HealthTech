import React from 'react';
import { AlertCard, QuickStatCard } from './HealthMonitoring';
import { CategorySummaryCard, RecommendationsSection } from '../Beneficiaries/HealthTrends';

const categorySummary = [
  { value: '12', title: 'Total Metrics', bgColor: 'bg-[rgba(68,133,254,0.1)]', textColor: 'text-[#4485FE]' },
  { value: '4', title: 'Critical Alerts', bgColor: 'bg-[rgba(238,68,93,0.1)]', textColor: 'text-[#EE445D]' },
  { value: '3', title: 'Warnings', bgColor: 'bg-[#FBF4EA]', textColor: 'text-[#F1950A]' },
  { value: '5', title: 'Normal', bgColor: 'bg-[#E5F9F3]', textColor: 'text-[#00B77D]' }
];

const recommendations = [
  { type: 'critical', text: 'Monitor blood pressure daily until stable' },
  { type: 'warning', text: 'Adjust diabetes medication timing' },
  { type: 'success', text: 'Continue current mobility exercises' }
];

const Overview = ({ alerts, dismissAlert, quickStats }) => (
  <>
    {/* Alert Cards */}
    <div className="flex flex-row items-start gap-6 w-full flex-wrap xl:flex-nowrap">
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          {...alert}
          onDismiss={() => dismissAlert(alert.id)}
        />
      ))}
    </div>

    {/* Quick Stats */}
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-4 w-full flex-wrap lg:flex-nowrap">
        {quickStats.map((stat, index) => (
          <QuickStatCard key={index} {...stat} />
        ))}
      </div>
    </div>

    {/* Category Summary */}
    <div className="flex flex-col gap-4 p-6 bg-white border border-[#E3E3E3] rounded-xl w-full">
      <h3 className="font-medium text-xl leading-[30px] text-[#222126]">Health Score Analysis</h3>
      <div className="flex flex-row items-center gap-4 w-full flex-wrap lg:flex-nowrap">
        {categorySummary.map((item, index) => (
          <CategorySummaryCard key={index} {...item} />
        ))}
      </div>
    </div>

    {/* Recommendations */}
    <RecommendationsSection recommendations={recommendations} />
  </>
);

export default Overview;
