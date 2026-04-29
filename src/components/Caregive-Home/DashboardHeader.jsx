import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Home,
  Users,
  Activity,
  Calendar,
  MessageSquare,
  Menu,
  X,
} from 'lucide-react';
import NotificationPanel from './Notification/NotificationPanel';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'beneficiaries', label: 'Beneficiaries', icon: Users },
  { id: 'health', label: 'Health Monitoring', icon: Activity },
  { id: 'scheduling', label: 'Service & Scheduling', icon: Calendar },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
];

const DashboardHeader = ({
  getUserInitials,
  getDisplayName,
  getUserFirstName,
  getGreeting,
  notificationOpen,
  setNotificationOpen,
  setShowNotificationPage,
  setShowGlobalSearch,
  setShowProfilePage,
  mobileNavOpen,
  setMobileNavOpen,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex flex-col justify-center items-start bg-white">
      {/* Header */}
      <header className="flex flex-row justify-between items-center px-4 sm:px-6 lg:px-14 py-4 sm:py-5 border-b border-gray-200 bg-white w-full">
        {/* Left - Logo */}
        <div className="flex items-center gap-4 sm:gap-8">
          <Link to="/" className="flex items-center">
            <img
              src="/vicky-logo.png"
              alt="Vicky Logo"
              className="h-8 sm:h-10 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-8 h-8 sm:w-10 sm:h-10">
                <circle cx="16" cy="16" r="14" fill="#20B2AA" opacity="0.2" />
                <path d="M16 8L20 12L16 16L20 20L16 24L12 20L16 16L12 12L16 8Z" fill="#20B2AA" />
              </svg>
              <span className="font-heading text-xl sm:text-2xl font-bold text-primary">Vicky</span>
            </div>
          </Link>
        </div>

        {/* Center - Search (hidden on mobile) */}
        <div className="hidden md:flex items-center">
          <div
            className="flex items-center px-4 py-2.5 gap-2.5 w-[300px] lg:w-[407px] border border-[#022145] rounded-full cursor-pointer hover:bg-[#022145]/5 transition-colors"
            onClick={() => setShowGlobalSearch(true)}
          >
            <Search size={20} className="text-[#022145]" />
            <span className="flex-1 text-sm text-center text-[#022145] select-none">
              Global Search
            </span>
          </div>
        </div>

        {/* Right - Notifications & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Search Toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 border border-[#022145] rounded-full cursor-pointer hover:bg-[#022145]/10 transition-colors"
            onClick={() => setShowGlobalSearch(true)}
          >
            <Search size={20} className="text-[#022145]" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen((o) => !o)}
              className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border rounded-full relative cursor-pointer transition-colors ${
                notificationOpen
                  ? 'bg-[#022145] border-[#022145]'
                  : 'bg-white border-[#022145] hover:bg-[#022145]/10'
              }`}
            >
              <Bell size={20} className={notificationOpen ? 'text-white' : 'text-[#022145]'} />
            </button>

            <NotificationPanel
              open={notificationOpen}
              onClose={() => setNotificationOpen(false)}
              onViewAll={() => {
                setNotificationOpen(false);
                setShowNotificationPage(true);
              }}
            />
          </div>

          {/* Profile */}
          <button
            className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setShowProfilePage(true)}
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-[#022145] rounded-full bg-gradient-to-br from-primary to-primary-light text-white font-semibold">
              {getUserInitials()}
            </div>
            <span className="hidden sm:block text-sm font-semibold text-[#022145]">{getDisplayName()}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden flex items-center justify-center p-2 text-[#022145]"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Subheader / Nav */}
      <div className="flex flex-col justify-center items-start px-4 sm:px-6 lg:px-14 pb-6 sm:pb-8 gap-6 sm:gap-8 bg-white w-full">
        {/* Desktop Navigation Menu */}
        <div className="hidden lg:flex items-center py-3 gap-8 lg:gap-12 w-full border-b border-[#DFDFDF] overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 py-3 px-0 whitespace-nowrap transition-colors ${
                activeTab === item.id
                  ? 'text-[#00B77D] border-b-2 border-[#00B77D]'
                  : 'text-[#022145] hover:text-[#00B77D]'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-[#00B77D]' : 'text-[#022145]'} />
              <span className="text-base lg:text-lg font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Navigation Menu */}
        {mobileNavOpen && (
          <div className="lg:hidden flex flex-col w-full border-b border-[#DFDFDF] pb-4 animate-slide-down">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileNavOpen(false);
                }}
                className={`flex items-center gap-3 py-3 px-2 transition-colors ${
                  activeTab === item.id
                    ? 'text-[#00B77D] bg-[#00B77D]/10 rounded-lg'
                    : 'text-[#022145] hover:text-[#00B77D]'
                }`}
              >
                <item.icon size={20} />
                <span className="text-base font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Mobile Tab Indicator */}
        <div className="lg:hidden flex items-center gap-2 text-[#00B77D] font-medium">
          {navItems.find((item) => item.id === activeTab)?.icon &&
            React.createElement(navItems.find((item) => item.id === activeTab).icon, { size: 20 })}
          <span>{navItems.find((item) => item.id === activeTab)?.label}</span>
        </div>

        {/* Greeting Content - Only show on Home tab */}
        {activeTab === 'home' && (
          <div className="flex flex-col gap-1">
            <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#022145] leading-tight">
              {getGreeting()}, {getUserFirstName()}
            </h1>
            <p className="text-sm text-[#022145]">
              Here's how your family's health is doing today
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
