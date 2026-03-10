import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown,
  Heart,
  Droplets,
  Pill,
  Activity,
  AlertTriangle,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Health Stats Card Component
const HealthStatCard = ({ 
  title, 
  value, 
  unit, 
  status, 
  statusText, 
  icon: Icon, 
  iconBgColor, 
  valueColor,
  borderColor 
}) => {
  const statusColors = {
    good: 'text-[#00B77D]',
    warning: 'text-[#EE445D]',
    normal: 'text-[#828386]'
  };

  return (
    <div className={`flex flex-col items-start p-6 gap-3 bg-white border border-[#E3E3E3] rounded-xl flex-1 ${borderColor || ''}`}>
      <div className="flex flex-row justify-between items-center w-full">
        <p className="font-medium text-base text-[#222126] leading-6 max-w-[160px]">{title}</p>
        <div className={`flex items-center justify-center w-10 h-10 rounded-md ${iconBgColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className={`font-bold text-2xl leading-9 ${valueColor}`}>{value} <span className="text-base font-normal">{unit}</span></p>
        {statusText && (
          <p className={`font-medium text-[10px] leading-[18px] tracking-wide ${statusColors[status] || statusColors.normal}`}>
            {statusText}
          </p>
        )}
      </div>
    </div>
  );
};

// Date Range Picker Component
const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const displayText = startDate && endDate 
    ? `${formatDate(startDate)} - ${formatDate(endDate)}`
    : 'Select Date Range';

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-4 px-4 py-2.5 bg-white border border-[#E3E3E3] rounded-lg cursor-pointer hover:border-[#00B77D] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base text-[#1B1B28]">{displayText}</span>
        <Calendar className="w-6 h-6 text-[#292D32]" />
      </div>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 p-4 bg-white border border-[#E3E3E3] rounded-lg shadow-lg z-50 min-w-[300px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#022145]">Start Date</label>
              <input 
                type="date" 
                value={startDate || ''}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="w-full px-3 py-2 border border-[#E3E3E3] rounded-lg text-[#1B1B28] focus:outline-none focus:border-[#00B77D]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#022145]">End Date</label>
              <input 
                type="date" 
                value={endDate || ''}
                min={startDate || ''}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="w-full px-3 py-2 border border-[#E3E3E3] rounded-lg text-[#1B1B28] focus:outline-none focus:border-[#00B77D]"
              />
            </div>
            <button 
              className="w-full py-2 bg-[#00B77D] text-white rounded-lg font-medium hover:bg-[#009966] transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Bar Chart Component
const BarChart = ({ data, title, legend, startDate, endDate, onStartDateChange, onEndDateChange }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="flex flex-col items-start p-6 gap-6 bg-white border border-[#E3E3E3] rounded-xl w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <h3 className="font-medium text-xl leading-[30px] text-[#222126]">{title}</h3>
          <div className="flex items-center gap-4">
            {/* Date Range Picker */}
            <DateRangePicker 
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
            />
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-row items-start gap-4">
          {legend.map((item, index) => (
            <div key={index} className="flex flex-row items-center gap-2">
              <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }} />
              <span className="text-sm leading-6 text-[#222126]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex flex-row items-end gap-4 w-full h-[394px] relative">
        {/* Y Axis */}
        <div className="flex flex-col items-center gap-6 opacity-40 pb-[34px]">
          {[350, 300, 250, 200, 150, 100, 50, 0].map((val, idx) => (
            <span key={idx} className="text-base leading-6 text-[#222126] w-7">{val}</span>
          ))}
        </div>

        {/* Grid Lines & Bars */}
        <div className="flex-1 relative h-full">
          {/* Grid Lines */}
          {[12, 64, 108, 156, 204, 252, 300].map((top, idx) => (
            <div 
              key={idx} 
              className="absolute w-full border-t border-dashed border-[#E1E3EA]" 
              style={{ top: `${top}px` }} 
            />
          ))}

          {/* Bars */}
          <div className="flex flex-row justify-between items-end h-[358px] gap-4 pt-[36px]">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col justify-end items-center gap-2 flex-1 h-full">
                <div className="flex justify-center items-end w-full" style={{ height: `${(item.value / 350) * 100}%` }}>
                  <div 
                    className="w-12 rounded-t-lg" 
                    style={{ 
                      height: '100%',
                      backgroundColor: item.color 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* X Axis Labels */}
          <div className="flex flex-row justify-between items-center py-2 gap-4 mt-2">
            {data.map((item, index) => (
              <div key={index} className="flex justify-center items-center flex-1">
                <span className="text-sm font-medium text-[#222126] tracking-[0.25px]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Category Summary Card
const CategorySummaryCard = ({ value, title, bgColor, textColor }) => (
  <div className={`flex flex-col items-center p-6 gap-1 rounded-xl flex-1 ${bgColor}`}>
    <span className={`font-bold text-2xl leading-9 ${textColor}`}>{value}</span>
    <span className="font-medium text-base leading-6 text-[#222126]">{title}</span>
  </div>
);

// Recommendations Section
const RecommendationsSection = ({ recommendations }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-[18px] h-[18px] text-[#EE445D]" fill="#EE445D" />;
      case 'warning':
        return <AlertCircle className="w-[18px] h-[18px] text-[#F1950A]" fill="#F1950A" />;
      case 'success':
        return <CheckCircle className="w-[18px] h-[18px] text-[#3FB185]" fill="#3FB185" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-start p-4 gap-4 bg-[rgba(68,133,254,0.1)] border-l-4 border-[#4485FE] rounded-xl w-full">
      <div className="flex flex-col justify-center items-start gap-3 w-full">
        <h4 className="font-bold text-base leading-6 text-[#4485FE]">Recommendations</h4>
        {recommendations.map((rec, index) => (
          <div key={index} className="flex flex-row items-center gap-2 w-full">
            {getIcon(rec.type)}
            <span className="text-sm leading-6 text-[#022145] flex-1">{rec.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Member Selector
const MemberSelector = ({ members, selectedMember, onSelectMember }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="font-medium text-base leading-6 text-[#022145] tracking-wide">
        Select Beneficiary for Health Trends
      </label>
      <div className="relative">
        <div 
          className="flex flex-row justify-between items-center px-4 py-2.5 bg-white border border-[#E3E3E3] rounded-lg cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-base text-[#1B1B28]">
            {selectedMember?.name || 'Select a beneficiary'}
          </span>
          <ChevronDown className={`w-5 h-5 text-[#0A0A0A] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E3E3E3] rounded-lg shadow-lg z-10">
            {members.map((member, index) => (
              <div 
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  onSelectMember(member);
                  setIsOpen(false);
                }}
              >
                {member.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main HealthTrends Component
const HealthTrends = ({ 
  beneficiary = null,
  healthData = null,
  onBeneficiaryChange = null,
  beneficiaries = []
}) => {
  const [selectedMember, setSelectedMember] = useState(beneficiary);
  // Use actual dates instead of hardcoded string
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-01-31');

  // Default health stats data
  const defaultHealthStats = [
    {
      title: 'Average Resting Heart Rate',
      value: '95',
      unit: 'bpm',
      status: 'warning',
      statusText: 'Elevated - Monitor closely',
      icon: Heart,
      iconBgColor: 'bg-[rgba(238,68,93,0.1)]',
      valueColor: 'text-[#EE445D]'
    },
    {
      title: 'Average Blood Pressure',
      value: '142/88',
      unit: 'mmHg',
      status: 'normal',
      statusText: 'Stage 1 Hypertension',
      icon: Activity,
      iconBgColor: 'bg-[rgba(63,177,133,0.1)]',
      valueColor: 'text-[#00B77D]'
    },
    {
      title: 'Blood Sugar Level',
      value: '180',
      unit: 'mg/dL',
      status: 'warning',
      statusText: 'Above normal range',
      icon: Droplets,
      iconBgColor: 'bg-[rgba(238,68,93,0.1)]',
      valueColor: 'text-[#EE445D]'
    },
    {
      title: 'Medication Adherence',
      value: '85%',
      unit: '',
      status: 'good',
      statusText: 'Good compliance',
      icon: Pill,
      iconBgColor: 'bg-[rgba(63,177,133,0.1)]',
      valueColor: 'text-[#00B77D]'
    }
  ];

  // Default chart data
  const defaultHealthTrendData = [
    { label: 'Heart Rate', value: 273, color: '#FF3A5E' },
    { label: 'Blood Pressure', value: 141, color: '#00B77D' },
    { label: 'Blood Sugar', value: 235, color: '#F1950A' },
    { label: 'Oxygen Level', value: 119, color: '#00B77D' },
    { label: 'Weight', value: 313, color: '#FF3A5E' },
    { label: 'Temperature', value: 245, color: '#F1950A' },
    { label: 'Sleep Quality', value: 133, color: '#00B77D' }
  ];

  const defaultBloodSugarData = [
    { label: 'Week 1', value: 273, color: '#FF3A5E' },
    { label: 'Week 2', value: 155, color: '#4485FE' },
    { label: 'Week 3', value: 77, color: '#00B77D' },
    { label: 'Week 4', value: 67, color: '#00B77D' },
    { label: 'Week 5', value: 313, color: '#FF3A5E' },
    { label: 'Week 6', value: 221, color: '#F1950A' },
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

  // Category summary data
  const categorySummary = [
    { value: '12', title: 'Total Metrics', bgColor: 'bg-[rgba(68,133,254,0.1)]', textColor: 'text-[#4485FE]' },
    { value: '4', title: 'Critical Alerts', bgColor: 'bg-[rgba(238,68,93,0.1)]', textColor: 'text-[#EE445D]' },
    { value: '3', title: 'Warnings', bgColor: 'bg-[#FBF4EA]', textColor: 'text-[#F1950A]' },
    { value: '5', title: 'Normal', bgColor: 'bg-[#E5F9F3]', textColor: 'text-[#00B77D]' }
  ];

  // Default recommendations
  const defaultRecommendations = [
    { type: 'critical', text: 'Monitor blood pressure daily until stable' },
    { type: 'warning', text: 'Adjust diabetes medication timing' },
    { type: 'success', text: 'Continue current mobility exercises' }
  ];

  const stats = healthData?.stats || defaultHealthStats;
  const trendData = healthData?.trendData || defaultHealthTrendData;
  const bloodSugarTrend = healthData?.bloodSugarData || defaultBloodSugarData;
  const recommendations = healthData?.recommendations || defaultRecommendations;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Member Selector */}
      {beneficiaries.length > 0 && (
        <MemberSelector 
          members={beneficiaries}
          selectedMember={selectedMember}
          onSelectMember={(member) => {
            setSelectedMember(member);
            onBeneficiaryChange?.(member);
          }}
        />
      )}

      {/* Health Stats Cards */}
      <div className="flex flex-row items-center gap-4 w-full flex-wrap lg:flex-nowrap">
        {stats.map((stat, index) => (
          <HealthStatCard key={index} {...stat} />
        ))}
      </div>

      {/* Health Trend Chart */}
      <BarChart 
        data={trendData}
        title="Health Trend Overview"
        legend={healthTrendLegend}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {/* Blood Sugar Chart */}
      <BarChart 
        data={bloodSugarTrend}
        title="Blood Sugar"
        legend={bloodSugarLegend}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

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
    </div>
  );
};

// Export individual components for reusability
export { 
  HealthStatCard, 
  BarChart,
  DateRangePicker,
  CategorySummaryCard, 
  RecommendationsSection,
  MemberSelector 
};

export default HealthTrends;
