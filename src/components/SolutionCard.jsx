import React from "react";

const SolutionCard = ({ image, title, description, testId }) => {
  return (
    <div className="bg-white rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-400 cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(32,178,170,0.15)]" data-testid={testId}>
      <div className="w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-5 sm:p-6 md:p-8">
        <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3" data-testid={`${testId}-title`}>{title}</h3>
        <p className="text-[0.875rem] sm:text-[0.95rem] leading-relaxed text-gray-600" data-testid={`${testId}-description`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default SolutionCard;
