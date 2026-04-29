import React, { useState, useRef, useEffect } from 'react';
import { X, Search, Settings, MoreHorizontal, Plus, Smile, AtSign, Mic, Send } from 'lucide-react';
import CONTACTS from '../../data/hcp/messageContacts.json';
import MESSAGES from '../../data/hcp/messages.json';

/* ─── Avatar circle ─────────────────────────────────────── */
function Avatar({ name, size = 48, bg = '#CFE5F3', textColor = '#0B68A2' }) {
  const initials = name.split(' ').filter(Boolean).map(p => p[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.33, fontWeight: 700, color: textColor,
      letterSpacing: '-0.04em',
    }}>
      {initials}
    </div>
  );
}

/* ─── Messages Panel ─────────────────────────────────────── */
const MessagesPanel = ({ open, onClose }) => {
  const [search, setSearch] = useState('');
  const [activeContact, setActiveContact] = useState(CONTACTS[0]);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState(MESSAGES);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = () => {
    const text = inputMsg.trim();
    if (!text) return;
    setMessages(prev => [...prev, {
      id: Date.now(), sender: 'me',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      text,
    }]);
    setInputMsg('');
  };

  const filtered = CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.35)' }}
      />

      {/* Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', top: 0, right: 0, zIndex: 401,
          width: 1011 + 377, maxWidth: '100vw',
          height: '100vh', display: 'flex', flexDirection: 'row',
          boxShadow: '0px 7px 29px rgba(100,100,111,0.2)',
          borderRadius: '16px 0 0 16px',
          overflow: 'hidden',
        }}
      >
        {/* ── Left: contact list (377px) ── */}
        <div style={{
          width: 377, flexShrink: 0, height: '100%',
          display: 'flex', flexDirection: 'column',
          background: '#FFFFFF',
          border: '1px solid #EBEBEB',
          borderRadius: '16px 0 0 16px',
        }}>
          {/* List header */}
          <div style={{
            boxSizing: 'border-box',
            padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 16,
            borderBottom: '1px solid #EBEBEB',
          }}>
            {/* Title row */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 24, fontWeight: 600, lineHeight: '36px', color: '#000000' }}>Message</span>
              <MoreHorizontal size={24} color="#292D32" style={{ cursor: 'pointer' }} />
            </div>
            {/* Search row */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
              <div style={{
                flex: 1, boxSizing: 'border-box',
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                padding: '8px 20px', gap: 12,
                border: '1px solid #DBDBDB', borderRadius: 35, height: 48,
              }}>
                <Search size={24} color="#022145" style={{ flexShrink: 0 }} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search"
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#595E65', background: 'transparent' }}
                />
              </div>
              <div style={{
                width: 48, height: 48, boxSizing: 'border-box',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#F6F6F6', border: '1px solid #DBDBDB', borderRadius: 8,
                cursor: 'pointer', flexShrink: 0,
              }}>
                <Settings size={24} color="#292D32" />
              </div>
            </div>
          </div>

          {/* Contact list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setActiveContact(c)}
                style={{
                  display: 'flex', flexDirection: 'row', alignItems: 'center',
                  padding: '16px 24px', gap: 12,
                  background: activeContact?.id === c.id ? '#F9F9F9' : (i % 2 === 0 ? '#FFFFFF' : '#FFFFFF'),
                  cursor: 'pointer',
                  borderBottom: '1px solid #F5F5F5',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#F5F9FC'}
                onMouseLeave={e => e.currentTarget.style.background = activeContact?.id === c.id ? '#F9F9F9' : '#FFFFFF'}
              >
                <Avatar name={c.name} bg={c.bg} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
                  {/* Name + time */}
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '-0.02em', color: '#000000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.name}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '21px', color: '#595E65', flexShrink: 0, marginLeft: 8 }}>
                      {c.time}
                    </span>
                  </div>
                  {/* Preview + badge */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.02em', color: '#A1A2A3', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.preview}
                    </span>
                    {c.unread > 0 && (
                      <div style={{
                        width: 14, height: 14, borderRadius: '50%',
                        background: '#22C55E', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{ fontSize: 8, fontWeight: 600, color: '#FFFFFF', lineHeight: 1 }}>{c.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: chat area (flex-1) ── */}
        <div style={{
          flex: 1, height: '100%', display: 'flex', flexDirection: 'column',
          background: '#F9F9F9',
          borderWidth: '0px 1px 1px 0px', borderStyle: 'solid', borderColor: '#EBEBEB',
          borderRadius: '0 0 16px 0',
        }}>
          {/* Chat header */}
          <div style={{
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            padding: '16px 24px', gap: 12,
            height: 85, flexShrink: 0,
            background: '#FFFFFF',
            borderWidth: '1px 1px 1px 0px', borderStyle: 'solid', borderColor: '#EBEBEB',
            borderRadius: '0 16px 0 0',
          }}>
            <Avatar name={activeContact?.name || 'M F'} bg="#000000" textColor="#FFFFFF" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 18, fontWeight: 600, lineHeight: '27px', letterSpacing: '-0.02em', color: '#000000' }}>
                Mary Freund
              </span>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>Patient</span>
                <div style={{ width: 1, height: 16, background: '#D9D9D9' }} />
                <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.02em', color: '#022145' }}>
                  Upcoming Visit: Tuesday 15 April 2025
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{ width: 24, height: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} color="#292D32" />
            </button>
          </div>

          {/* Messages area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {messages.map(msg => (
              msg.sender === 'me' ? (
                /* My message — right aligned */
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 16, justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, maxWidth: '75%' }}>
                    {/* Name + time */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '-0.02em', color: '#000000' }}>You</span>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#595E65' }} />
                      <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '21px', color: '#022145' }}>{msg.time}</span>
                    </div>
                    {/* Bubble */}
                    <div style={{
                      display: 'flex', flexDirection: 'row', alignItems: 'center',
                      padding: 16, gap: 8,
                      background: '#0D7DC3', borderRadius: '12px 0px 12px 12px',
                    }}>
                      <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '24px', color: '#FFFFFF' }}>{msg.text}</span>
                    </div>
                  </div>
                  <Avatar name="JS" size={48} bg="#000000" textColor="#FFFFFF" />
                </div>
              ) : (
                /* Their message — left aligned */
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
                  <Avatar name="MF" size={48} bg="#E0DCFF" textColor="#6941C6" />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, maxWidth: '75%' }}>
                    {/* Name + time */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '-0.02em', color: '#000000' }}>Mary Freund</span>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#595E65' }} />
                      <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '21px', color: '#022145' }}>{msg.time}</span>
                    </div>
                    {/* Bubble */}
                    <div style={{
                      display: 'flex', flexDirection: 'row', alignItems: 'center',
                      padding: 16, gap: 8,
                      background: '#FFFFFF', border: '1px solid #EBEBEB',
                      borderRadius: '0px 12px 12px 12px',
                    }}>
                      <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '24px', color: '#022145' }}>{msg.text}</span>
                    </div>
                  </div>
                </div>
              )
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div style={{ padding: 24, flexShrink: 0 }}>
            <div style={{
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end',
              padding: 16, gap: 8,
              background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: 12,
            }}>
              {/* Text area + toolbar */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                <input
                  value={inputMsg}
                  onChange={e => setInputMsg(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Enter Message"
                  style={{
                    border: 'none', outline: 'none',
                    fontSize: 14, fontWeight: 400, lineHeight: '24px',
                    letterSpacing: '-0.02em', color: '#022145', background: 'transparent',
                    width: '100%',
                  }}
                />
                {/* Toolbar icons */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Plus size={24} color="#292D32" style={{ cursor: 'pointer' }} />
                  <div style={{ width: 1, height: 16, background: '#D9D9D9' }} />
                  <Smile size={24} color="#292D32" style={{ cursor: 'pointer' }} />
                  <AtSign size={24} color="#292D32" style={{ cursor: 'pointer' }} />
                  <Mic size={24} color="#292D32" style={{ cursor: 'pointer' }} />
                </div>
              </div>

              {/* Send button */}
              <button
                onClick={sendMessage}
                style={{
                  display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                  padding: '4px 8px', gap: 8,
                  width: 107, height: 40,
                  background: '#0D7DC3', borderRadius: 6, border: 'none', cursor: 'pointer',
                  flexShrink: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#0b6fad'}
                onMouseLeave={e => e.currentTarget.style.background = '#0D7DC3'}
              >
                <span style={{ fontSize: 14, fontWeight: 600, lineHeight: '21px', color: '#FFFFFF' }}>Send</span>
                <Send size={20} color="#FFFFFF" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagesPanel;
