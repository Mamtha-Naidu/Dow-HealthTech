import React, { useState } from 'react';
import { X } from 'lucide-react';

/* ─── Category tabs ─────────────────────────────────────── */
const TABS = [
  { num: 1, label: 'Vitals' },
  { num: 2, label: 'Medication Adherence' },
  { num: 3, label: 'Nutrition Information' },
  { num: 4, label: 'Environment' },
  { num: 5, label: 'Social' },
  { num: 6, label: 'Cognitive' },
];

/* ─── Checkbox option pill ──────────────────────────────── */
function CheckOption({ label, checked, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        padding: '10px 14px', gap: 14, flex: '1 1 0',
        background: 'rgba(13,125,195,0.1)', borderRadius: 7,
        cursor: 'pointer', userSelect: 'none',
        minWidth: 0,
      }}
    >
      <div style={{
        width: 21, height: 21, flexShrink: 0,
        boxSizing: 'border-box',
        border: `${checked ? '6px' : '0.87px'} solid #0D7DC3`,
        borderRadius: 3.5,
        background: checked ? '#0D7DC3' : 'transparent',
        transition: 'all 0.12s',
      }} />
      <span style={{ fontSize: 14, fontWeight: 400, color: '#022145', lineHeight: '21px' }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Question block ────────────────────────────────────── */
function Question({ text, options, values, onChange, type = 'checkbox' }) {
  const rows = [];
  for (let i = 0; i < options.length; i += 2) rows.push(options.slice(i, i + 2));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      <p style={{ fontSize: 16, fontWeight: 400, color: '#022145', lineHeight: '23px', margin: 0 }}>
        {text}
      </p>
      <div style={{ paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {type === 'text' ? (
          <div style={{
            display: 'flex', alignItems: 'center',
            padding: '10px 14px', background: 'rgba(13,125,195,0.1)', borderRadius: 7,
          }}>
            <input
              type="text"
              value={values['__input__'] || ''}
              onChange={e => onChange('__input__', e.target.value)}
              placeholder="Type Here.."
              style={{
                width: '100%', border: 'none', background: 'transparent',
                fontSize: 14, color: '#022145', outline: 'none',
                lineHeight: '21px',
              }}
            />
          </div>
        ) : (
          rows.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', flexDirection: 'row', gap: 14 }}>
              {row.map(opt => (
                <CheckOption
                  key={opt}
                  label={opt}
                  checked={!!values[opt]}
                  onChange={() => onChange(opt, !values[opt])}
                />
              ))}
              {/* fill empty slot */}
              {row.length === 1 && <div style={{ flex: '1 1 0' }} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Vitals Questionnaire ──────────────────────────────── */
const VitalsQuestionnaire = ({ open, onClose, onBack }) => {
  const [answers, setAnswers] = useState({});

  const setAnswer = (section, key, val) => {
    setAnswers(prev => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [key]: val },
    }));
  };

  if (!open) return null;

  const a = (section) => answers[section] || {};

  const GENERAL_SECTIONS = [
    {
      key: 'appearance',
      text: '1. How does the patient appear today?',
      options: ['Stable', 'Mild Discomfort', 'Moderate Discomfort', 'Severe Distress'],
    },
    {
      key: 'conscious',
      text: '2. Is the patient conscious?',
      options: ['Yes', 'No'],
    },
    {
      key: 'position',
      text: '3. Patient position during measurement',
      options: ['Sitting', 'Laying Down', 'Standing'],
    },
  ];

  const TEMP_SECTIONS = [
    {
      key: 'tempValue',
      text: '1. Body temperature value in °C',
      options: [],
      type: 'text',
    },
    {
      key: 'method',
      text: '2. Measurement method',
      options: ['Oral', 'Axillary', 'Tympanic', 'Forehead'],
    },
    {
      key: 'chills',
      text: '3. Does the patient report chills or fever symptoms?',
      options: ['Yes', 'No'],
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(0,0,0,0.45)',
        }}
      />

      {/* Outer card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
          zIndex: 301,
          width: 1300, maxWidth: '100vw', height: '100vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
          background: '#FFFFFF', borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {/* ── Tab bar ── */}
        <div style={{
          width: '100%', background: '#FFFFFF',
          padding: '21px 80px', boxSizing: 'border-box',
          borderBottom: '1px solid #E5E9EB',
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          order: -2, /* rendered first via absolute trick below */
        }}>
          {/* We render this at the top using flex order trick — swap with content via column-reverse on parent */}
        </div>

        {/* ── Scrollable content ── */}
        <div style={{
          flex: 1, width: '100%', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '0 0 0 0',
        }}>
          {/* Tab bar (inside scroll area, pinned top via sticky) */}
          <div style={{
            position: 'sticky', top: 0, zIndex: 10,
            width: '100%', background: '#FFFFFF',
            padding: '21px 80px', boxSizing: 'border-box',
            borderBottom: '1px solid #E5E9EB',
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 28, flex: 1 }}>
              {TABS.map((tab, i) => {
                const active = tab.num === 1;
                return (
                  <div key={tab.num} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: 7,
                      background: active ? 'rgba(13,125,195,0.1)' : 'rgba(41,45,50,0.05)',
                      borderRadius: 3.5, minWidth: 21, height: 21,
                    }}>
                      <span style={{
                        fontSize: 12, fontWeight: active ? 700 : 600, lineHeight: '21px',
                        color: active ? '#0D7DC3' : 'rgba(0,0,0,0.5)',
                      }}>
                        {tab.num}
                      </span>
                    </div>
                    <span style={{
                      fontSize: 16, fontWeight: active ? 600 : 500,
                      color: active ? '#0D7DC3' : 'rgba(0,0,0,0.5)',
                      lineHeight: '24px', whiteSpace: 'nowrap',
                    }}>
                      {tab.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Close */}
            <button
              onClick={onClose}
              style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
            >
              <X size={20} color="#000000" />
            </button>
          </div>

          {/* ── Questionnaire body ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 21,
            width: 839, padding: '32px 0 32px',
          }}>
            {/* Title */}
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#022145', lineHeight: '42px', margin: 0 }}>
              Vitals Questionnaires
            </h2>

            {/* Questions wrapper */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 17 }}>

              {/* Section A */}
              <div style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                padding: '0 47px', gap: 17, width: '100%', boxSizing: 'border-box',
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#022145', lineHeight: '27px', margin: 0, width: '100%' }}>
                  A. General Condition
                </h3>
                {GENERAL_SECTIONS.map(sec => (
                  <Question
                    key={sec.key}
                    text={sec.text}
                    options={sec.options}
                    type={sec.type || 'checkbox'}
                    values={a(sec.key)}
                    onChange={(k, v) => setAnswer(sec.key, k, v)}
                  />
                ))}
              </div>

              {/* Section B */}
              <div style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                padding: '0 47px', gap: 17, width: '100%', boxSizing: 'border-box',
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#022145', lineHeight: '27px', margin: 0, width: '100%' }}>
                  B. Body Temperature
                </h3>
                {TEMP_SECTIONS.map(sec => (
                  <Question
                    key={sec.key}
                    text={sec.text}
                    options={sec.options}
                    type={sec.type || 'checkbox'}
                    values={a(sec.key)}
                    onChange={(k, v) => setAnswer(sec.key, k, v)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky footer ── */}
        <div style={{
          width: '100%', background: '#FFFFFF',
          borderTop: '1px solid #E5E9EB',
          padding: '14px 231px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
          gap: 14, flexShrink: 0,
        }}>
          {/* Cancel */}
          <button
            onClick={onBack || onClose}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '10px 14px', height: 42, width: 104,
              background: '#E5E9EB', borderRadius: 5.2, border: 'none',
              fontSize: 14, fontWeight: 600, color: '#022145', cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#d0d6d9'}
            onMouseLeave={e => e.currentTarget.style.background = '#E5E9EB'}
          >
            Cancel
          </button>
          {/* Save and Continue */}
          <button
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '10px 14px', height: 42, width: 155,
              background: '#0D7DC3', borderRadius: 5.2, border: 'none',
              fontSize: 14, fontWeight: 600, color: '#FFFFFF', cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#0b6fad'}
            onMouseLeave={e => e.currentTarget.style.background = '#0D7DC3'}
          >
            Save and Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default VitalsQuestionnaire;
