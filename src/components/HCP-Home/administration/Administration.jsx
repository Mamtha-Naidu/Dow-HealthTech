import React, { useState } from 'react';
import {
  BarChart2, ShoppingBag, Bell, Cpu, Calculator,
  Users, Calendar, Home, MessageSquare, FileText,
  ChevronUp, ChevronDown, Plus, Eye, Ban,
} from 'lucide-react';

/* ─── Sidebar nav data ───────────────────────────────────── */
const GENERAL_ITEMS = [
  { id: 'reporting',     label: 'Reporting',     Icon: BarChart2,     hasChildren: true,
    children: ['Overview', 'Analytics'] },
  { id: 'billing',       label: 'Billing',        Icon: ShoppingBag },
  { id: 'notification',  label: 'Notification',   Icon: Bell },
  { id: 'ai',            label: 'AI',             Icon: Cpu },
  { id: 'calculator',    label: 'Calculator',     Icon: Calculator },
];

const PEOPLE_ITEMS = [
  { id: 'staff',         label: 'Staff Management', Icon: Users },
  { id: 'schedule',      label: 'Schedule',          Icon: Calendar },
  { id: 'homecare',      label: 'Home Care Services', Icon: Home },
];

const COMMUNICATION_ITEMS = [
  { id: 'communication', label: 'Communication',  Icon: MessageSquare },
  { id: 'documents',     label: 'Documents',      Icon: FileText },
];

/* ─── Mock table data ────────────────────────────────────── */
const ROWS = [
  { id: 1, name: 'Mary Johnson',  date: 'Jul 2 2025', description: 'Figma ipsum component variant main layer. Flows rectangle.', status: 'Active' },
  { id: 2, name: 'Alan Bishop',   date: 'Jul 3 2025', description: 'Figma ipsum component variant main layer. Flows rectangle.', status: 'Deactivated' },
  { id: 3, name: 'Linda Gomez',   date: 'Jul 4 2025', description: 'Figma ipsum component variant main layer. Flows rectangle.', status: 'Active' },
];

/* ─── Status badge ───────────────────────────────────────── */
function StatusBadge({ status }) {
  const isActive = status === 'Active';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '2px 16px', borderRadius: 32, fontSize: 12, fontWeight: 600, lineHeight: '21px',
      background: isActive ? 'rgba(18,183,106,0.1)' : 'rgba(222,226,230,0.45)',
      border: `1px solid ${isActive ? 'rgba(18,183,106,0.1)' : 'rgba(222,226,230,0.45)'}`,
      color: isActive ? '#12B76A' : 'rgba(103,120,131,0.72)',
      whiteSpace: 'nowrap',
    }}>
      {status}
    </span>
  );
}

/* ─── Sidebar item ───────────────────────────────────────── */
function SidebarItem({ item, activeId, onSelect }) {
  const [open, setOpen] = useState(item.id === 'reporting');
  const isActive = activeId === item.id;

  return (
    <>
      {/* Main row */}
      <div
        onClick={() => {
          onSelect(item.id);
          if (item.hasChildren) setOpen(o => !o);
        }}
        style={{
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          padding: item.hasChildren ? '0px 24px' : '0px 24px',
          gap: 16, width: '100%', height: 56,
          cursor: 'pointer',
          background: 'transparent',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <item.Icon size={24} color={isActive ? '#0D7DC3' : '#022145'} strokeWidth={1.5} />
          <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '23px', color: isActive ? '#0D7DC3' : '#022145' }}>
            {item.label}
          </span>
        </div>
        {item.hasChildren && (
          open
            ? <ChevronUp size={24} color="#022145" />
            : <ChevronDown size={24} color="#022145" />
        )}
      </div>

      {/* Children */}
      {item.hasChildren && open && item.children?.map((child, i) => {
        const childId = `${item.id}-${i}`;
        const childActive = activeId === childId || (i === 0 && activeId === item.id);
        return (
          <div
            key={childId}
            onClick={() => onSelect(childId)}
            style={{
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'row', alignItems: 'center',
              padding: '0px 24px 0px 60px', gap: 16,
              width: '100%', height: 56,
              cursor: 'pointer',
              background: childActive ? 'rgba(13,125,195,0.1)' : 'transparent',
              borderLeft: childActive ? '3px solid #0D7DC3' : '3px solid transparent',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '23px', color: childActive ? '#0D7DC3' : '#022145' }}>
              {child}
            </span>
          </div>
        );
      })}
    </>
  );
}

/* ─── Administration component ──────────────────────────── */
const Administration = () => {
  const [activeId, setActiveId] = useState('reporting');
  const [rows, setRows] = useState(ROWS);

  const deleteRow = (id) => setRows(prev => prev.filter(r => r.id !== id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%' }}>

      {/* ── Page title area ── */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: '42px', color: '#022145', margin: 0 }}>
          Administration
        </h1>
        <p style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#022145', margin: 0 }}>
          Handle billing, staff management, and other operational tasks.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 24, width: '100%' }}>

        {/* ── Left sidebar ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          padding: '24px 0px', gap: 24,
          width: 329, flexShrink: 0,
          background: '#FFFFFF', border: '1px solid #E3E3E3', borderRadius: 12,
        }}>
          {/* GENERAL section */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 0 }}>
            <div style={{ padding: '0px 24px', marginBottom: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '23px', letterSpacing: '0.04em', color: '#767988' }}>
                GENERAL
              </span>
            </div>
            {GENERAL_ITEMS.map(item => (
              <SidebarItem key={item.id} item={item} activeId={activeId} onSelect={setActiveId} />
            ))}
          </div>

          {/* PEOPLE section */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 0 }}>
            <div style={{ padding: '0px 24px', marginBottom: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '23px', letterSpacing: '0.04em', color: '#767988' }}>
                PEOPLE
              </span>
            </div>
            {PEOPLE_ITEMS.map(item => (
              <SidebarItem key={item.id} item={item} activeId={activeId} onSelect={setActiveId} />
            ))}
          </div>

          {/* COMMUNICATION section */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 0 }}>
            <div style={{ padding: '0px 24px', marginBottom: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '23px', letterSpacing: '0.04em', color: '#767988' }}>
                COMMUNICATION
              </span>
            </div>
            {COMMUNICATION_ITEMS.map(item => (
              <SidebarItem key={item.id} item={item} activeId={activeId} onSelect={setActiveId} />
            ))}
          </div>
        </div>

        {/* ── Main content ── */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', padding: 24, gap: 16,
          background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: 12,
          minWidth: 0,
        }}>
          {/* Header row */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span style={{ fontSize: 20, fontWeight: 500, lineHeight: '30px', color: '#222126' }}>
              Staff
            </span>
            <button style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              padding: '12px 16px', gap: 10,
              width: 186, height: 48,
              background: '#0D7DC3', borderRadius: 6, border: 'none',
              cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#0b6fad'}
              onMouseLeave={e => e.currentTarget.style.background = '#0D7DC3'}
            >
              <Plus size={24} color="#FFFFFF" />
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#FFFFFF' }}>
                Add New Staff
              </span>
            </button>
          </div>

          {/* Table */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #DCDFE3' }}>
                  {[
                    { label: 'Patient Name',      width: 193 },
                    { label: 'Notes Date',         width: 166 },
                    { label: 'Notes Description',  width: undefined },
                    { label: 'Status',             width: 151 },
                    { label: 'Action',             width: 125 },
                  ].map(col => (
                    <th key={col.label} style={{
                      textAlign: 'left', padding: '16px 10px',
                      fontSize: 14, fontWeight: 600, lineHeight: '140%',
                      letterSpacing: '1.25px', textTransform: 'uppercase',
                      color: '#9E9E9E',
                      width: col.width,
                    }}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F6F6F6' }}>
                    {/* Name */}
                    <td style={{ padding: '16px 10px', fontSize: 14, fontWeight: 500, lineHeight: '140%', letterSpacing: '0.25px', color: '#1B1B28' }}>
                      {row.name}
                    </td>
                    {/* Date */}
                    <td style={{ padding: '16px 10px', fontSize: 14, fontWeight: 500, lineHeight: '140%', letterSpacing: '0.25px', color: '#1B1B28' }}>
                      {row.date}
                    </td>
                    {/* Description */}
                    <td style={{ padding: '16px 10px', fontSize: 14, fontWeight: 500, lineHeight: '140%', letterSpacing: '0.25px', color: '#1B1B28', maxWidth: 332 }}>
                      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {row.description}
                      </span>
                    </td>
                    {/* Status */}
                    <td style={{ padding: '16px 24px' }}>
                      <StatusBadge status={row.status} />
                    </td>
                    {/* Actions */}
                    <td style={{ padding: '16px 10px' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        {/* View */}
                        <button
                          style={{
                            width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer',
                            background: 'rgba(0,110,239,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,110,239,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,110,239,0.1)'}
                        >
                          <Eye size={16} color="#0D7DC3" />
                        </button>
                        {/* Deactivate / delete */}
                        <button
                          onClick={() => deleteRow(row.id)}
                          style={{
                            width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer',
                            background: '#FFE2E5',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#ffc9ce'}
                          onMouseLeave={e => e.currentTarget.style.background = '#FFE2E5'}
                        >
                          <Ban size={16} color="#921919" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#9E9E9E', fontSize: 14 }}>
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administration;
