import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown, Plus, Trash2 } from "lucide-react";
import { FamilyMembersForm, useFamilyMembers, createEmptyFamilyMember } from "../ui/FamilyMemberForm";

function CaringAcrossContinents() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("comprehensive");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    usAddress: "",
    city: "",
    state: "",
    zipCode: "",
    relationship: "",
  });
  const {
    familyMembers,
    setFamilyMembers,
    addFamilyMember,
    removeFamilyMember,
    updateFamilyMember,
  } = useFamilyMembers([createEmptyFamilyMember(1)]);
  const [emergencyContact, setEmergencyContact] = useState({
    contactName: "",
    phoneNumber: "",
    relationship: "",
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [enableSMS, setEnableSMS] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      // Final submission
      setShowSuccess(true);
    }
  };

  const handleGoToDashboard = () => {
    // Navigate to caregiver dashboard
    navigate("/caregiver-dashboard");
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Family member functions are now provided by useFamilyMembers hook

  const updateEmergencyContact = (field, value) => {
    setEmergencyContact({
      ...emergencyContact,
      [field]: value,
    });
  };

  const handlePaymentInputChange = (field, value) => {
    setPaymentData({
      ...paymentData,
      [field]: value,
    });
  };

  // Plan definitions - add your plans here with their features and pricing
  const plans = [
    {
      id: "essential",
      name: "Essential Care",
      price: "$89/month",
      priceValue: 89,
      description: "Perfect for basic health monitoring and peace of mind",
      features: [
        "Monthly health check-ups",
        "Basic vital signs monitoring",
        "Video call consultations",
        "Emergency contact support",
        "Health reports via email",
      ],
    },
    {
      id: "comprehensive",
      name: "Comprehensive Care",
      price: "$149/month",
      priceValue: 149,
      description: "Complete healthcare oversight with specialized services",
      features: [
        "Bi-weekly health visits",
        "Comprehensive health assessments",
        "Medication management",
        "Physical therapy coordination",
        "24/7 emergency support",
        "Real-time health dashboard",
        "Medical appointment coordination",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium Care",
      price: "$229/month",
      priceValue: 229,
      description: "Ultimate care with dedicated health coordinator",
      features: [
        "Weekly health visits",
        "Dedicated health coordinator",
        "Specialist referrals & coordination",
        "Advanced health monitoring",
        "Family health education",
        "Priority emergency response",
        "Chronic condition management",
        "Monthly family video conferences",
      ],
    },
  ];

  // Calculate pricing based on selected plan and number of beneficiaries
  const getPlanPrice = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    return plan?.priceValue || 149;
  };

  const getAdditionalBeneficiaryCost = () => {
    const additionalMembers = familyMembers.length - 1;
    return additionalMembers > 0 ? additionalMembers * 30 : 0;
  };

  const getTotalCost = () => {
    return getPlanPrice() + getAdditionalBeneficiaryCost();
  };

  const getPlanName = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    return plan?.name || "Comprehensive Care";
  };

  const steps = [
    { number: 1, title: "Choose Plan" },
    { number: 2, title: "Personal Information" },
    { number: 3, title: "Family Details" },
    { number: 4, title: "Payment & Review" },
  ];

  return (
    <>
    <div className="relative min-h-screen bg-white">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 opacity-30 blur-[300px]"
        style={{
          background: "linear-gradient(76.27deg, #ADEBC4 -0.79%, #ADEBC4 89.29%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        {/* Main Content Card */}
        <div className="w-full max-w-[1302px] bg-white border border-[#E5E5E5] rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10 lg:p-14 space-y-6 sm:space-y-8 md:space-y-14">
          {/* Header Section */}
          <div className="space-y-4 sm:space-y-6">
            {/* Title Section */}
            <div className="text-center space-y-2 sm:space-y-3">
              <h1 className="text-xl sm:text-2xl md:text-[32px] lg:text-[40px] font-semibold leading-tight sm:leading-[1.4] md:leading-[60px] tracking-tight text-register-text">
                Caring Across Continents
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-register-text opacity-60 px-2">
                Professional healthcare oversight for your family members in Ghana, managed from anywhere in the United States
              </p>
            </div>

            {/* Progress Steps */}
            <div className="relative pb-6 sm:pb-8">
              {/* Steps Row - Horizontal scroll on mobile */}
              <div className="flex justify-between items-center gap-2 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory -mx-2 px-2">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center gap-2 sm:gap-4 flex-shrink-0 snap-start">
                    <div className="flex items-center gap-2 sm:gap-4">
                      {/* Icon Circle */}
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] lg:w-[88px] lg:h-[88px] rounded-full flex items-center justify-center flex-shrink-0 ${
                          currentStep === step.number
                            ? "bg-[#006EEF]"
                            : "border-2 sm:border-[2.6px] border-[#D8DBE7] bg-white"
                        }`}
                      >
                        {step.number === 1 && (
                          <svg
                            width="35"
                            height="35"
                            viewBox="0 0 35 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.5 8.75H22.5V5.83333C22.5 5.16667 22.5 4.375 20.4167 4.375H14.5833C12.5 4.375 12.5 5.16667 12.5 5.83333V8.75Z"
                              fill={currentStep === step.number ? "white" : "#626886"}
                            />
                            <path
                              d="M22.5 8.75H12.5V30.625H22.5V8.75Z"
                              fill={currentStep === step.number ? "white" : "#626886"}
                            />
                          </svg>
                        )}
                        {step.number === 2 && (
                          <svg
                            width="35"
                            height="35"
                            viewBox="0 0 35 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="17.5" cy="12" r="4.5" stroke={currentStep === step.number ? "white" : "#626886"} strokeWidth="2.2" fill="none" />
                            <path d="M10 25c0-4 3.5-6.5 7.5-6.5s7.5 2.5 7.5 6.5" stroke={currentStep === step.number ? "white" : "#626886"} strokeWidth="2.2" fill="none" strokeLinecap="round" />
                          </svg>
                        )}
                        {step.number === 3 && (
                          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13" cy="11" r="3.5" stroke={currentStep === step.number ? "white" : "#626886"} strokeWidth="2" fill="none" />
                            <circle cx="22" cy="11" r="3.5" stroke={currentStep === step.number ? "white" : "#626886"} strokeWidth="2" fill="none" />
                            <path d="M8 23c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke={currentStep === step.number ? "white" : "#626886"} strokeWidth="2" fill="none" strokeLinecap="round" />
                            <path d="M17 23c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke={currentStep === step.number ? "white" : "#626886"} strokeWidth="2" fill="none" strokeLinecap="round" />
                          </svg>
                        )}
                        {step.number === 4 && (
                          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="13" width="15" height="10" rx="1.5" stroke={currentStep === step.number ? "white" : "#626886"} strokeWidth="2" fill="none" />
                            <path d="M10 16h15" stroke={currentStep === step.number ? "white" : "#626886"} strokeWidth="2" />
                            <path d="M13 19h5" stroke={currentStep === step.number ? "white" : "#626886"} strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      {/* Step Text */}
                      <div className="space-y-0 hidden sm:block">
                        <p
                          className={`text-xs sm:text-sm font-medium tracking-tight ${
                            currentStep === step.number ? "text-[#006EEF]" : "text-register-text opacity-40"
                          }`}
                        >
                          Step {step.number} of 4
                        </p>
                        <p className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-register-text">
                          {step.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile step indicator */}
              <div className="flex sm:hidden justify-center mt-4">
                <p className="text-sm font-semibold text-register-text">
                  Step {currentStep} of 4: <span className="text-[#006EEF]">{steps[currentStep - 1].title}</span>
                </p>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] sm:h-[3px] bg-[#E5E9EE] rounded-full">
                <div className={`h-full bg-[#006EEF] rounded-full relative transition-all duration-300`} style={{ width: `${(currentStep / 4) * 100}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white border-2 sm:border-4 border-[rgba(0,110,239,0.54)] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 1: Pricing Cards */}
          {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative cursor-pointer bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5 transition-all ${
                  selectedPlan === plan.id
                    ? "border-2 border-register-button shadow-[0px_8px_24px_rgba(0,183,125,0.2)]"
                    : "border border-[#DFDFDF] shadow-[0px_8px_24px_rgba(149,157,165,0.2)]"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && selectedPlan === plan.id && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-4 sm:px-8 py-2 sm:py-3 bg-register-button text-white text-xs sm:text-base font-semibold rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className="w-12 h-12 bg-[rgba(0,183,125,0.1)] border border-register-button rounded-md flex items-center justify-center">
                  <div className="relative w-6 h-6">
                    {[1, 2, 3, plan.id === "premium" ? 4 : 0].filter(Boolean).map((i) => (
                      <div
                        key={i}
                        className="absolute w-[13.72px] h-[13.72px] bg-register-button border-[0.57px] border-[#027A54]"
                        style={{
                          transform: `rotate(45deg) translate(${(i - 1) * 4}px, ${(i - 1) * 4}px)`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Plan Details */}
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-register-text">
                    {plan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-register-text opacity-50 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <p
                  className={`text-xl sm:text-2xl md:text-[32px] font-bold leading-[27px] tracking-tight ${
                    selectedPlan === plan.id ? "text-register-button" : "text-register-text"
                  }`}
                >
                  {plan.price}
                </p>

                {/* Divider */}
                <div className="h-px bg-[#D9D9D9]" />

                {/* Features */}
                <div className="space-y-4">
                  <p className="text-sm font-bold tracking-tight text-register-text">
                    What's Included:
                  </p>
                  <div className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center">
                          <Check size={20} className="text-register-button" strokeWidth={2} />
                        </div>
                        <p className="text-sm tracking-tight text-register-text">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}

          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
            <div className="space-y-6 sm:space-y-8">
              {/* Form Header */}
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-register-text">Personal Information</h2>
                <p className="text-xs sm:text-sm text-[#595E65]">Make sure the inputted information is correct</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 sm:space-y-5">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm sm:text-base font-semibold text-register-text">First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F9F9F9] border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm sm:text-base font-semibold text-register-text">Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F9F9F9] border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm sm:text-base font-semibold text-register-text">Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F9F9F9] border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm sm:text-base font-semibold text-register-text">Phone Number*</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F9F9F9] border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                    />
                  </div>
                </div>

                {/* US Address */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm sm:text-base font-semibold text-register-text">US Address*</label>
                  <input
                    type="text"
                    name="usAddress"
                    value={formData.usAddress}
                    onChange={handleInputChange}
                    placeholder="Type your address"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F9F9F9] border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                  />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm sm:text-base font-semibold text-register-text">City*</label>
                    <div className="relative">
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F9F9F9] border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="new-york">New York</option>
                        <option value="los-angeles">Los Angeles</option>
                        <option value="chicago">Chicago</option>
                      </select>
                      <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-register-text pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm sm:text-base font-semibold text-register-text">State*</label>
                    <div className="relative">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F9F9F9] border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="ny">New York</option>
                        <option value="ca">California</option>
                        <option value="il">Illinois</option>
                      </select>
                      <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-register-text pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Zip Code & Relationship */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm sm:text-base font-semibold text-register-text">Zip Code*</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter zip code"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F9F9F9] border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-sm sm:text-base font-semibold text-register-text">Your relationship to beneficiaries</label>
                    <div className="relative">
                      <select
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#F9F9F9] border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="parent">Parent</option>
                        <option value="child">Child</option>
                        <option value="sibling">Sibling</option>
                        <option value="spouse">Spouse</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-register-text pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Family Details */}
          {currentStep === 3 && (
            <div className="space-y-6 sm:space-y-8">
              {/* Family Members Form Component */}
              <FamilyMembersForm
                familyMembers={familyMembers}
                onAdd={addFamilyMember}
                onRemove={removeFamilyMember}
                onUpdate={updateFamilyMember}
                showAddButton={true}
                addButtonText="Add Family Member"
              />

              {/* Emergency Contact */}
              <div className="bg-[#FCFCFC] border border-[rgba(0,0,0,0.05)] rounded-2xl p-6 space-y-6">
                <h3 className="text-xl font-semibold tracking-tight text-register-text">Emergency Contact</h3>
                
                <div className="space-y-4">
                  {/* Contact Name & Phone Number */}
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-3">
                      <label className="text-base font-semibold text-register-text">Contact Name*</label>
                      <input
                        type="text"
                        value={emergencyContact.contactName}
                        onChange={(e) => updateEmergencyContact("contactName", e.target.value)}
                        placeholder="Enter contact name"
                        className="w-full px-4 py-3 bg-white border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-base font-semibold text-register-text">Phone Number*</label>
                      <input
                        type="tel"
                        value={emergencyContact.phoneNumber}
                        onChange={(e) => updateEmergencyContact("phoneNumber", e.target.value)}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 bg-white border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                      />
                    </div>
                  </div>

                  {/* Relationship */}
                  <div className="space-y-3">
                    <label className="text-base font-semibold text-register-text">Relationship*</label>
                    <input
                      type="text"
                      value={emergencyContact.relationship}
                      onChange={(e) => updateEmergencyContact("relationship", e.target.value)}
                      placeholder="Enter relationship"
                      className="w-full px-4 py-3 bg-white border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment & Review */}
          {currentStep === 4 && (
            <div className="space-y-4 sm:space-y-6">
              {/* Summary Cards Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Detail Summary Card */}
                <div className="bg-[#FCFCFC] border border-[rgba(0,0,0,0.05)] rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#022145]">Detail Summary</h3>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {/* Selected Plan */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <span className="text-sm sm:text-lg text-[#022145] opacity-65">Selected Plan</span>
                      <span className="text-sm sm:text-lg font-medium text-[#022145]">{getPlanName()}</span>
                    </div>

                    {/* Number of Beneficiaries */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <span className="text-sm sm:text-lg text-[#022145] opacity-65">Number of Beneficiaries</span>
                      <span className="text-sm sm:text-lg font-medium text-[#022145]">{familyMembers.length}</span>
                    </div>

                    {/* Base Plan Cost */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <span className="text-sm sm:text-lg text-[#022145] opacity-65">Base Plan Cost</span>
                      <span className="text-sm sm:text-lg font-medium text-[#022145]">${getPlanPrice().toFixed(2)}</span>
                    </div>

                    {/* Additional Beneficiaries */}
                    {familyMembers.length > 1 && (
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="text-sm sm:text-lg text-[#022145] opacity-65">
                          Additional Beneficiary ({familyMembers.length - 1} x $30)
                        </span>
                        <span className="text-sm sm:text-lg font-medium text-[#022145]">${getAdditionalBeneficiaryCost().toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#EEEEEE]" />

                  {/* Total */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-sm sm:text-lg font-semibold text-[#022145]">Monthly Subscription Total</span>
                    <span className="text-base sm:text-lg font-semibold text-[#022145]">${getTotalCost().toFixed(2)}</span>
                  </div>
                </div>

                {/* Family Members Summary Card */}
                <div className="bg-[#FCFCFC] border border-[#EFEFEF] rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#022145]">Family Members</h3>
                  
                  <div className="space-y-4">
                    {familyMembers.map((member, index) => (
                      <div key={member.id} className="flex items-center gap-4">
                        {/* Avatar Circle */}
                        <div className="w-[52px] h-[52px] rounded-full border border-[#D9D9D9] flex items-center justify-center bg-white">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#022145"/>
                            <path d="M12 14.5C6.99 14.5 2.91 17.86 2.91 22C2.91 22.28 3.13 22.5 3.41 22.5H20.59C20.87 22.5 21.09 22.28 21.09 22C21.09 17.86 17.01 14.5 12 14.5Z" fill="#022145"/>
                          </svg>
                        </div>

                        {/* Member Info */}
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-[#022145]">
                            {member.firstName || "Family Member"} {member.lastName || `${index + 1}`}
                          </h4>
                          <div className="flex items-center gap-1 text-sm text-[#022145] opacity-50">
                            <span>
                              {member.relationshipToYou || "Relationship"}
                              {member.age && `, ${member.age} years old`}
                            </span>
                            {member.addressInGhana && (
                              <>
                                <div className="w-1 h-1 rounded-full bg-[#022145]" />
                                <span>{member.addressInGhana.split(',')[0] || "Ghana"}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Information Card */}
              <div className="bg-[#FCFCFC] border border-[rgba(0,0,0,0.05)] rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#022145]">Payment Information</h3>

                {/* Credit Card Info Banner */}
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-[rgba(0,110,239,0.1)] border border-[#D3E6FC] rounded-lg">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 9H2" stroke="#006EEF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.5 15H10.5" stroke="#006EEF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 15H17" stroke="#006EEF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.44 3.50024H17.55C21.11 3.50024 22 4.39024 22 7.90024V16.1002C22 19.6002 21.11 20.5002 17.56 20.5002H6.44C2.89 20.5002 2 19.6102 2 16.1002V7.90024C2 4.39024 2.89 3.50024 6.44 3.50024Z" stroke="#006EEF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs sm:text-[13px] font-bold text-[#006EEF]">Your payment information is secure and encrypted</span>
                </div>

                {/* Payment Form Fields */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Card Number and Name on Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-2 sm:space-y-3">
                      <label className="block text-sm sm:text-base font-semibold text-[#022145]">Card Number*</label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) => handlePaymentInputChange("cardNumber", e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-[10px] bg-white border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                      />
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <label className="block text-sm sm:text-base font-semibold text-[#022145]">Name on Card*</label>
                      <input
                        type="text"
                        value={paymentData.nameOnCard}
                        onChange={(e) => handlePaymentInputChange("nameOnCard", e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-[10px] bg-white border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                      />
                    </div>
                  </div>

                  {/* Expiry Date and CVV */}
                  <div className="grid grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-2 sm:space-y-3">
                      <label className="block text-sm sm:text-base font-semibold text-[#022145]">Expiry Date*</label>
                      <input
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={(e) => handlePaymentInputChange("expiryDate", e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-[10px] bg-white border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                      />
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <label className="block text-sm sm:text-base font-semibold text-[#022145]">CVV*</label>
                      <input
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) => handlePaymentInputChange("cvv", e.target.value)}
                        placeholder="123"
                        maxLength="4"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-[10px] bg-white border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm sm:text-base font-semibold text-[#022145]">Billing Address</label>
                    <input
                      type="text"
                      value={paymentData.billingAddress}
                      onChange={(e) => handlePaymentInputChange("billingAddress", e.target.value)}
                      placeholder="Enter billing address"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-[10px] bg-white border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-register-button"
                    />
                  </div>
                </div>
              </div>

              {/* Checkboxes Section */}
              <div className="space-y-3 sm:space-y-4">
                {/* Terms of Service */}
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div
                    onClick={() => setAgreeToTerms(!agreeToTerms)}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md border cursor-pointer flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 ${
                      agreeToTerms ? "bg-register-button border-register-button" : "border-[#D9D9D9] bg-white"
                    }`}
                  >
                    {agreeToTerms && (
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <label className="text-sm sm:text-base font-medium text-[#022145] cursor-pointer" onClick={() => setAgreeToTerms(!agreeToTerms)}>
                    I agree to the <span className="text-[#006EEF]">Terms of Service</span> and <span className="text-[#006EEF]">Privacy Policy</span>
                  </label>
                </div>

                {/* Marketing Updates */}
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div
                    onClick={() => setReceiveUpdates(!receiveUpdates)}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md border cursor-pointer flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 ${
                      receiveUpdates ? "bg-register-button border-register-button" : "border-[#D9D9D9] bg-white"
                    }`}
                  >
                    {receiveUpdates && (
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <label className="text-sm sm:text-base font-medium text-[#022145] cursor-pointer" onClick={() => setReceiveUpdates(!receiveUpdates)}>
                    Send me updates about new features and health tips for my family
                  </label>
                </div>

                {/* SMS Notifications */}
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div
                    onClick={() => setEnableSMS(!enableSMS)}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md border cursor-pointer flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 ${
                      enableSMS ? "bg-register-button border-register-button" : "border-[#D9D9D9] bg-white"
                    }`}
                  >
                    {enableSMS && (
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <label className="text-sm sm:text-base font-medium text-[#022145] cursor-pointer" onClick={() => setEnableSMS(!enableSMS)}>
                    Enable SMS notifications for emergency situations (recommended)
                  </label>
                </div>
              </div>

              {/* What Happens Next Info Box */}
              <div className="bg-[#FCFCFC] border border-[rgba(0,0,0,0.05)] rounded-lg p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#022145" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V13" stroke="#022145" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.9946 16H12.0036" stroke="#022145" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#022145]">What Happens Next?</h4>
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#022145] leading-5 sm:leading-6 space-y-0.5 sm:space-y-1">
                  <p>• Your subscription starts immediately</p>
                  <p>• We'll contact your family members within 24 hours</p>
                  <p>• Initial health assessments will be scheduled</p>
                  <p>• You'll receive login details for your dashboard</p>
                  <p>• Emergency contacts will be verified and activated</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-5">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-[#F2F4F7] text-[#344054] text-sm font-semibold rounded-md hover:opacity-90 transition-all cursor-pointer"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleContinue}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-register-button text-white text-sm font-semibold rounded-md hover:opacity-90 transition-all cursor-pointer"
            >
              {currentStep === 4 ? "Submit" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Success Modal */}
    {showSuccess && (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:py-12 bg-black/20 backdrop-blur-[7.5px]">
        <div className="w-full max-w-[582px] bg-white border border-[#EBEBEB] shadow-[0px_7px_29px_rgba(100,100,111,0.2)] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col items-center gap-6 sm:gap-8">
          {/* Success Icon */}
          <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="125" cy="125" r="120" fill="#E6F9F2" />
              <circle cx="125" cy="125" r="90" fill="#B3EDD7" />
              <circle cx="125" cy="125" r="60" fill="#00B77D" />
              <path d="M95 125L115 145L160 100" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Content */}
          <div className="w-full space-y-3 sm:space-y-4 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-register-text">
              Registration & Payment Confirmed
            </h2>
            <p className="text-sm sm:text-base leading-6 sm:leading-7 text-[#545B7E]">
              Welcome aboard! Your account has been created and you're all set to begin. 
              You can now log in to access your Home dashboard, manage your profile, and 
              explore all available features.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleGoToDashboard}
            className="w-full px-4 py-2.5 sm:py-3 bg-register-button text-white text-sm font-semibold rounded-md hover:opacity-90 transition-all cursor-pointer"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )}
    </>
  );
}

export default CaringAcrossContinents;
