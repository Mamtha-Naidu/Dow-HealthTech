import React from 'react';

const DeleteConfirmModal = ({ onCancel, onConfirm, title = 'Are you sure you want to delete this Vital?', description = 'Deleting this Vital will permanently remove it from your Patient Vitals Details.' }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ background: 'rgba(0,0,0,0.3)' }}
    onClick={onCancel}
  >
    <div
      className="flex flex-col items-center"
      style={{
        width: '582px',
        padding: '40px',
        gap: '32px',
        background: '#FFFFFF',
        border: '1px solid #EBEBEB',
        boxShadow: '0px 7px 29px rgba(100, 100, 111, 0.2)',
        borderRadius: '16px',
        boxSizing: 'border-box',
      }}
      onClick={e => e.stopPropagation()}
    >
      {/* Danger icon */}
      <div style={{ width: '56px', height: '56px', position: 'relative', flexShrink: 0 }}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <path
            d="M28 10L50 46H6L28 10Z"
            stroke="#FF555F"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="28" y1="26" x2="28" y2="34" stroke="#FF555F" strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="28" cy="40" r="1.75" fill="#FF555F"/>
        </svg>
      </div>

      {/* Title block */}
      <div
        className="flex flex-col items-center"
        style={{ width: '502px', gap: '15px' }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '24px',
            letterSpacing: '-0.01em',
            textAlign: 'center',
            color: '#022145',
            width: '502px',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '28px',
            textAlign: 'center',
            color: '#545B7E',
            width: '502px',
          }}
        >
          {description}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center" style={{ gap: '16px' }}>
        {/* Cancel */}
        <button
          onClick={onCancel}
          className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{
            width: '120px',
            height: '48px',
            background: '#E5E9EB',
            borderRadius: '6px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#022145',
          }}
        >
          Cancel
        </button>
        {/* Delete */}
        <button
          onClick={onConfirm}
          className="flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          style={{
            width: '120px',
            height: '48px',
            border: '1px solid #FF555F',
            borderRadius: '6px',
            background: 'transparent',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#FF555F',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;
