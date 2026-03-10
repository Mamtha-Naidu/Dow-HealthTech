import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, X } from 'lucide-react';

// Default empty family member template
export const createEmptyFamilyMember = (id = 1) => ({
  id,
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  relationshipToYou: '',
  addressInGhana: '',
  phoneNumber: '',
  preferredLanguage: '',
  healthConditions: '',
  mobilityLevel: '',
  urgentCare: false,
});

// Custom hook for managing family members state
export const useFamilyMembers = (initialMembers = [createEmptyFamilyMember(1)]) => {
  const [familyMembers, setFamilyMembers] = useState(initialMembers);

  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      createEmptyFamilyMember(familyMembers.length + 1),
    ]);
  };

  const removeFamilyMember = (id) => {
    if (familyMembers.length > 1) {
      setFamilyMembers(familyMembers.filter((member) => member.id !== id));
    }
  };

  const updateFamilyMember = (id, field, value) => {
    setFamilyMembers(
      familyMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const resetFamilyMembers = () => {
    setFamilyMembers([createEmptyFamilyMember(1)]);
  };

  return {
    familyMembers,
    setFamilyMembers,
    addFamilyMember,
    removeFamilyMember,
    updateFamilyMember,
    resetFamilyMembers,
  };
};

// Individual Family Member Card Component
const FamilyMemberCard = ({ 
  member, 
  index, 
  onUpdate, 
  onRemove, 
  canRemove = true,
  variant = 'default' // 'default' | 'compact' | 'modal'
}) => {
  const inputClasses = variant === 'compact' 
    ? "w-full px-3 py-2 bg-white border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-[#00B77D]"
    : "w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#E5E9EE] rounded-md text-sm text-[#595E65] focus:outline-none focus:border-[#00B77D]";

  const labelClasses = variant === 'compact'
    ? "text-sm font-semibold text-[#022145]"
    : "text-sm sm:text-base font-semibold text-[#022145]";

  return (
    <div className={`bg-[#FCFCFC] border border-[rgba(0,0,0,0.05)] rounded-xl ${variant === 'compact' ? 'p-4' : 'sm:rounded-2xl p-4 sm:p-6'} space-y-4 ${variant === 'compact' ? '' : 'sm:space-y-6'}`}>
      {/* Header with Delete Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h3 className={`font-semibold tracking-tight text-[#022145] ${variant === 'compact' ? 'text-lg' : 'text-lg sm:text-xl'}`}>
          Family Member {index + 1}
        </h3>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(member.id)}
            className="flex items-center gap-1 px-3 py-2 bg-[#F1416C] text-white text-xs font-semibold rounded-md hover:opacity-90 transition-all"
          >
            <Trash2 size={14} className="sm:w-4 sm:h-4" />
            Remove
          </button>
        )}
      </div>

      {/* Form Fields */}
      <div className={`space-y-3 ${variant === 'compact' ? '' : 'sm:space-y-4'}`}>
        {/* First Name & Last Name */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${variant === 'compact' ? '' : 'sm:gap-5'}`}>
          <div className="space-y-2 sm:space-y-3">
            <label className={labelClasses}>First Name*</label>
            <input
              type="text"
              value={member.firstName}
              onChange={(e) => onUpdate(member.id, "firstName", e.target.value)}
              placeholder="Enter first name"
              className={inputClasses}
            />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <label className={labelClasses}>Last Name*</label>
            <input
              type="text"
              value={member.lastName}
              onChange={(e) => onUpdate(member.id, "lastName", e.target.value)}
              placeholder="Enter last name"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Age & Gender */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${variant === 'compact' ? '' : 'sm:gap-5'}`}>
          <div className="space-y-2 sm:space-y-3">
            <label className={labelClasses}>Age*</label>
            <input
              type="number"
              value={member.age}
              onChange={(e) => onUpdate(member.id, "age", e.target.value)}
              placeholder="Enter age"
              className={inputClasses}
            />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <label className={labelClasses}>Gender*</label>
            <div className="relative">
              <select
                value={member.gender}
                onChange={(e) => onUpdate(member.id, "gender", e.target.value)}
                className={`${inputClasses} appearance-none`}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#022145] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Relationship to you */}
        <div className="space-y-2 sm:space-y-3">
          <label className={labelClasses}>Relationship to you*</label>
          <div className="relative">
            <select
              value={member.relationshipToYou}
              onChange={(e) => onUpdate(member.id, "relationshipToYou", e.target.value)}
              className={`${inputClasses} appearance-none`}
            >
              <option value="">Select</option>
              <option value="parent">Parent</option>
              <option value="grandparent">Grandparent</option>
              <option value="sibling">Sibling</option>
              <option value="child">Child</option>
              <option value="spouse">Spouse</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#022145] pointer-events-none" />
          </div>
        </div>

        {/* Address in Ghana */}
        <div className="space-y-2 sm:space-y-3">
          <label className={labelClasses}>Address in Ghana*</label>
          <textarea
            value={member.addressInGhana}
            onChange={(e) => onUpdate(member.id, "addressInGhana", e.target.value)}
            placeholder="Enter full address"
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        </div>

        {/* Phone Number & Preferred Language */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${variant === 'compact' ? '' : 'sm:gap-5'}`}>
          <div className="space-y-2 sm:space-y-3">
            <label className={labelClasses}>Phone Number</label>
            <input
              type="tel"
              value={member.phoneNumber}
              onChange={(e) => onUpdate(member.id, "phoneNumber", e.target.value)}
              placeholder="Enter phone number"
              className={inputClasses}
            />
          </div>
          <div className="space-y-2 sm:space-y-3">
            <label className={labelClasses}>Preferred Language*</label>
            <div className="relative">
              <select
                value={member.preferredLanguage}
                onChange={(e) => onUpdate(member.id, "preferredLanguage", e.target.value)}
                className={`${inputClasses} appearance-none`}
              >
                <option value="">Select</option>
                <option value="english">English</option>
                <option value="twi">Twi</option>
                <option value="ga">Ga</option>
                <option value="ewe">Ewe</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#022145] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Known Health Conditions */}
        <div className="space-y-2 sm:space-y-3">
          <label className={labelClasses}>Known Health Conditions</label>
          <textarea
            value={member.healthConditions}
            onChange={(e) => onUpdate(member.id, "healthConditions", e.target.value)}
            placeholder="List any known health conditions"
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        </div>

        {/* Mobility Level */}
        <div className="space-y-2 sm:space-y-3">
          <label className={labelClasses}>Mobility Level*</label>
          <div className="relative">
            <select
              value={member.mobilityLevel}
              onChange={(e) => onUpdate(member.id, "mobilityLevel", e.target.value)}
              className={`${inputClasses} appearance-none`}
            >
              <option value="">Select</option>
              <option value="fully-mobile">Fully Mobile</option>
              <option value="limited-mobility">Limited Mobility</option>
              <option value="wheelchair">Wheelchair</option>
              <option value="bedridden">Bedridden</option>
            </select>
            <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#022145] pointer-events-none" />
          </div>
        </div>

        {/* Urgent Care Checkbox */}
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={member.urgentCare}
            onChange={(e) => onUpdate(member.id, "urgentCare", e.target.checked)}
            className="w-5 h-5 sm:w-6 sm:h-6 border border-[#D9D9D9] rounded-md cursor-pointer accent-[#00B77D]"
          />
          <label className="text-sm sm:text-base font-medium text-[#022145]">
            This person requires immediate/urgent care attention
          </label>
        </div>
      </div>
    </div>
  );
};

// Main Family Members Form Component
const FamilyMembersForm = ({
  familyMembers,
  onAdd,
  onRemove,
  onUpdate,
  showAddButton = true,
  addButtonText = "Add Family Member",
  variant = 'default',
  maxMembers = 10,
}) => {
  const canAddMore = familyMembers.length < maxMembers;

  return (
    <div className={`space-y-6 ${variant === 'compact' ? '' : 'sm:space-y-8'}`}>
      {/* Add Family Member Button */}
      {showAddButton && canAddMore && (
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#00B77D] text-white text-xs sm:text-sm font-semibold rounded-md hover:opacity-90 transition-all"
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
          {addButtonText}
        </button>
      )}

      {/* Family Members List */}
      <div className={`space-y-6 ${variant === 'compact' ? '' : 'sm:space-y-8'}`}>
        {familyMembers.map((member, index) => (
          <FamilyMemberCard
            key={member.id}
            member={member}
            index={index}
            onUpdate={onUpdate}
            onRemove={onRemove}
            canRemove={familyMembers.length > 1}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
};

// Modal for Adding a Single Family Member
export const AddFamilyMemberModal = ({
  isOpen,
  onClose,
  onSave,
  title = "Add New Family Member",
}) => {
  const [member, setMember] = useState(createEmptyFamilyMember(1));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = (id, field, value) => {
    setMember((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await onSave(member);
      setMember(createEmptyFamilyMember(1)); // Reset form
      onClose();
    } catch (error) {
      console.error('Error saving family member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setMember(createEmptyFamilyMember(1)); // Reset form
    onClose();
  };

  const isValid = member.firstName && member.lastName && member.age && member.gender && member.relationshipToYou && member.addressInGhana && member.preferredLanguage && member.mobilityLevel;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-[#E3E3E3] rounded-t-2xl">
          <h2 className="text-xl font-bold text-[#022145]">{title}</h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-[#022145]/50 hover:text-[#022145] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <FamilyMemberCard
            member={member}
            index={0}
            onUpdate={handleUpdate}
            onRemove={() => {}}
            canRemove={false}
            variant="compact"
          />
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-end gap-3 px-6 py-4 bg-white border-t border-[#E3E3E3] rounded-b-2xl">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-3 border border-[#E3E3E3] rounded-md text-[#022145] font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid || isSubmitting}
            className="px-6 py-3 bg-[#00B77D] rounded-md text-white font-semibold text-sm hover:bg-[#00B77D]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Family Member'}
          </button>
        </div>
      </div>
    </div>
  );
};

export { FamilyMemberCard, FamilyMembersForm };
export default FamilyMembersForm;
