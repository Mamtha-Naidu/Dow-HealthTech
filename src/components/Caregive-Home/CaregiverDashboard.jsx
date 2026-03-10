import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Home, 
  Users, 
  Activity, 
  Calendar, 
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import BeneficiariesContent from './Beneficiaries/BeneficiariesContent';
import HealthMonitoring from './Health-Monitoring/HealthMonitoring';
import ServiceScheduling from './Service-Scheduling/ServiceScheduling';
import NotificationPanel from './Notification/NotificationPanel';
import Notification from './Notification/Notification';
import GlobalSearch from './GlobalSearch/GlobalSearch';
import UserProfile from './Profile/Profile';
import { useAuth } from '../../context/AuthContext';

const CaregiverDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showNotificationPage, setShowNotificationPage] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  
  // Get logged-in user from auth context
  const { user } = useAuth();
  
  // Get display name - check name, username, or email
  const getDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.username) return user.username;
    if (user?.email) return user.email.split('@')[0];
    return 'Guest';
  };
  
  // Get user's first name
  const getUserFirstName = () => {
    const displayName = getDisplayName();
    if (displayName === 'Guest') return 'User';
    return displayName.split(' ')[0];
  };
  
  const getUserInitials = () => {
    const displayName = getDisplayName();
    if (displayName === 'Guest') return 'G';
    const names = displayName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };
  
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Sample data
  const beneficiaries = [
    { name: 'Mary Johnson', diagnosis: 'Hypertension, Diabetes', lastVisit: 'Yesterday' },
    { name: 'Alan Bishop', diagnosis: 'Home Visit - Jl. Gajahmada No.132 A, Ketelan', lastVisit: '3 days ago' },
    { name: 'Linda Gomez', diagnosis: '203', lastVisit: '1 week ago' },
  ];

  const recentActivities = [
    { dateTime: 'Jun 28, 5:00 PM', member: 'Mary Johnson', activity: 'Physical Therapy', details: 'Auntie Ama completed exercises' },
    { dateTime: 'Jun 29, 3:30 PM', member: 'Alan Bishop', activity: 'Medication Reminder', details: 'Uncle Ato took morning medication' },
    { dateTime: 'Jun 30, 10:00 AM', member: 'Linda Gomez', activity: 'Blood Pressure Check', details: 'BP: 145/95, HR: 92, Temp: 37.1°C' },
  ];

  const familyMembers = [
    { name: 'Mary Johnson', lastVisit: 'Jun 28, 5:00 PM', upcomingVisit: 'Jul 2, 11 AM', lastDetails: 'BP: 145/95, HR: 92, Temp: 37.1°C' },
    { name: 'Alan Bishop', lastVisit: 'Jun 29, 3:30 PM', upcomingVisit: 'None Scheduled', lastDetails: 'BP: 145/95, HR: 92, Temp: 37.1°C' },
    { name: 'Linda Gomez', lastVisit: 'Jun 30, 10:00 AM', upcomingVisit: 'Jul 1, 2 PM', lastDetails: 'BP: 145/95, HR: 92, Temp: 37.1°C' },
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'beneficiaries', label: 'Beneficiaries', icon: Users },
    { id: 'health', label: 'Health Monitoring', icon: Activity },
    { id: 'scheduling', label: 'Service & Scheduling', icon: Calendar },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* Dashboard Navigation */}
      <div className="w-full max-w-[1500px]">
        {/* Header */}
        <header className="flex flex-row justify-between items-center px-4 sm:px-6 lg:px-14 py-4 sm:py-5 border-b border-gray-200 bg-white">
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
                  <circle cx="16" cy="16" r="14" fill="#20B2AA" opacity="0.2"/>
                  <path d="M16 8L20 12L16 16L20 20L16 24L12 20L16 16L12 12L16 8Z" fill="#20B2AA"/>
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
                onClick={() => setNotificationOpen(o => !o)}
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
                onViewAll={() => { setNotificationOpen(false); setShowNotificationPage(true); }}
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

        {/* Subheader */}
        <div className="flex flex-col justify-center items-start px-4 sm:px-6 lg:px-14 pb-6 sm:pb-8 gap-6 sm:gap-8 bg-white">
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
            {navItems.find(item => item.id === activeTab)?.icon && 
              React.createElement(navItems.find(item => item.id === activeTab).icon, { size: 20 })}
            <span>{navItems.find(item => item.id === activeTab)?.label}</span>
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

        {/* Main Content */}
        {activeTab === 'home' && !showProfilePage && !showNotificationPage && !showGlobalSearch && (
        <div className="flex flex-col items-start px-4 sm:px-6 lg:px-14 pb-12 gap-8 sm:gap-12">
          {/* Alert Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 w-full bg-[#FFF5F8] border border-[#FAE8EC] rounded-lg">
            <AlertTriangle size={28} className="text-[#F1416C] flex-shrink-0" />
            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 className="text-base font-bold text-[#F1416C]">Attention Required</h3>
              <p className="text-sm font-medium text-[#F1416C]">
                Your mother's blood pressure reading from yesterday requires follow-up. A nurse will visit today at 2:00 PM.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {/* Family Members Under Care */}
            <div className="flex flex-col p-5 sm:p-6 gap-3 bg-white rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#222126]">Family Members Under Care</span>
                <div className="flex items-center justify-center w-10 h-10 bg-[#006EEF]/10 rounded-md">
                  <Users size={20} className="text-[#006EEF]" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-[28px] font-bold text-[#006EEF]">3</span>
              </div>
            </div>

            {/* Care Facilities */}
            <div className="flex flex-col p-5 sm:p-6 gap-3 bg-white rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#222126]">Care Facilities Connected</span>
                <div className="flex items-center justify-center w-10 h-10 bg-[#3FB185]/10 rounded-md">
                  <Home size={20} className="text-[#3FB185]" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-[28px] font-bold text-[#3FB185]">2</span>
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center justify-center w-5 h-5 bg-[#3FB185] rounded-full">
                    <ArrowUpRight size={12} className="text-white" />
                  </span>
                  <span className="text-sm text-[#3FB185]">+ 3 than last month</span>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="flex flex-col p-5 sm:p-6 gap-3 bg-white rounded-xl shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#222126]">Upcoming Appointments</span>
                <div className="flex items-center justify-center w-10 h-10 bg-[#F1950A]/10 rounded-md">
                  <Calendar size={20} className="text-[#F1950A]" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-[28px] font-bold text-[#F1950A]">5</span>
              </div>
            </div>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* Beneficiaries Table */}
            <div className="flex flex-col p-4 sm:p-6 gap-4 bg-white border border-[#E0E0E0] rounded-xl">
              <h3 className="text-lg sm:text-xl font-medium text-[#222126]">My Beneficiaries</h3>
              
              {/* Mobile Card View */}
              <div className="lg:hidden flex flex-col gap-4">
                {beneficiaries.map((person, index) => (
                  <div key={index} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-[#1B1B28]">{person.name}</span>
                      <span className="text-sm text-gray-500">{person.lastVisit}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{person.diagnosis}</p>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#DCDFE3]">
                      <th className="text-left py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]">Name</th>
                      <th className="text-left py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]">Diagnosis</th>
                      <th className="text-left py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]">Last Visit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beneficiaries.map((person, index) => (
                      <tr key={index} className={index % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}>
                        <td className="py-4 px-4 text-sm font-medium text-[#1B1B28]">{person.name}</td>
                        <td className="py-4 px-4 text-sm font-medium text-[#1B1B28] truncate max-w-[200px]">{person.diagnosis}</td>
                        <td className="py-4 px-4 text-sm font-medium text-[#1B1B28]">{person.lastVisit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activities Table */}
            <div className="flex flex-col p-4 sm:p-6 gap-4 bg-white border border-[#E0E0E0] rounded-xl">
              <h3 className="text-lg sm:text-xl font-medium text-[#222126]">Recent Activities</h3>
              
              {/* Mobile Card View */}
              <div className="lg:hidden flex flex-col gap-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-[#1B1B28]">{activity.member}</span>
                      <span className="text-xs text-gray-500">{activity.dateTime}</span>
                    </div>
                    <span className="text-sm font-medium text-primary">{activity.activity}</span>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#DCDFE3]">
                      <th className="text-left py-4 px-2 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]">Date & Time</th>
                      <th className="text-left py-4 px-2 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]">Members</th>
                      <th className="text-left py-4 px-2 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]">Activity</th>
                      <th className="text-left py-4 px-2 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((activity, index) => (
                      <tr key={index} className={index % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}>
                        <td className="py-4 px-2 text-sm font-medium text-[#1B1B28] whitespace-nowrap">{activity.dateTime}</td>
                        <td className="py-4 px-2 text-sm font-medium text-[#1B1B28]">{activity.member}</td>
                        <td className="py-4 px-2 text-sm font-medium text-[#1B1B28]">{activity.activity}</td>
                        <td className="py-4 px-2 text-sm font-medium text-[#1B1B28] truncate max-w-[150px]">{activity.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Family Members Overview Table */}
          <div className="flex flex-col p-4 sm:p-6 gap-4 bg-white border border-[#E0E0E0] rounded-xl w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-medium text-[#222126]">Family Members Overview</h3>
              <ChevronDown size={20} className="text-[#0A0A0A]" />
            </div>
            
            {/* Mobile Card View */}
            <div className="lg:hidden flex flex-col gap-4">
              {familyMembers.map((member, index) => (
                <div key={index} className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-[#1B1B28]">{member.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-xs text-gray-500 uppercase">Last Visit</span>
                      <p className="font-medium text-[#1B1B28]">{member.lastVisit}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase">Upcoming</span>
                      <p className="font-medium text-[#1B1B28]">{member.upcomingVisit}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase">Last Visit Details</span>
                    <p className="text-sm font-medium text-[#1B1B28]">{member.lastDetails}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#DCDFE3]">
                    <th className="text-left py-4 px-2 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]">Members</th>
                    <th className="text-left py-4 px-2 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]">Last Visit</th>
                    <th className="text-left py-4 px-2 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]">Upcoming Visit</th>
                    <th className="text-left py-4 px-2 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]">Last Visit Details</th>
                  </tr>
                </thead>
                <tbody>
                  {familyMembers.map((member, index) => (
                    <tr key={index} className={index % 2 === 1 ? 'bg-[#F6F6F6]' : 'bg-white'}>
                      <td className="py-4 px-2 text-sm font-medium text-[#1B1B28]">{member.name}</td>
                      <td className="py-4 px-2 text-sm font-medium text-[#1B1B28] whitespace-nowrap">{member.lastVisit}</td>
                      <td className="py-4 px-2 text-sm font-medium text-[#1B1B28]">{member.upcomingVisit}</td>
                      <td className="py-4 px-2 text-sm font-medium text-[#1B1B28]">{member.lastDetails}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}

        {/* Profile Page */}
        {showProfilePage && <UserProfile onClose={() => setShowProfilePage(false)} />}

        {/* Global Search Page */}
        {!showProfilePage && showGlobalSearch && <GlobalSearch onClose={() => setShowGlobalSearch(false)} />}

        {/* Notification Full Page */}
        {!showProfilePage && !showGlobalSearch && showNotificationPage && <Notification onClose={() => setShowNotificationPage(false)} />}

        {/* Beneficiaries Tab Content */}
        {!showProfilePage && !showGlobalSearch && !showNotificationPage && activeTab === 'beneficiaries' && <BeneficiariesContent />}

        {/* Health Monitoring Tab */}
        {!showProfilePage && !showGlobalSearch && !showNotificationPage && activeTab === 'health' && <HealthMonitoring />}

        {/* Service & Scheduling Tab */}
        {!showProfilePage && !showGlobalSearch && !showNotificationPage && activeTab === 'scheduling' && <ServiceScheduling />}

        {/* Communication Tab */}
        {!showProfilePage && !showGlobalSearch && !showNotificationPage && activeTab === 'communication' && (
          <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-14 py-20">
            <MessageSquare size={64} className="text-[#00B77D] mb-4" />
            <h2 className="text-2xl font-bold text-[#022145] mb-2">Communication</h2>
            <p className="text-[#022145]/70">Coming soon - Messages and notifications</p>
          </div>
        )}

        {/* Footer */}
        <footer className="w-full px-4 sm:px-6 lg:px-14 py-8 border-t border-[#E5E9EB] bg-white">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Logo & Contact */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <Link to="/" className="flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" fill="#20B2AA" opacity="0.2"/>
                  <path d="M16 8L20 12L16 16L20 20L16 24L12 20L16 16L12 12L16 8Z" fill="#20B2AA"/>
                </svg>
                <span className="font-heading text-xl font-bold text-primary">Vicky</span>
              </Link>
              <div className="text-center sm:text-right">
                <p className="text-sm font-bold text-[#22C55E]">info@vickyproject.com</p>
                <p className="text-sm font-medium text-[#022145]">B52348Z</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="text-sm font-medium text-[#022145] hover:text-primary transition-colors">About Us</a>
              <a href="#" className="text-sm font-medium text-[#022145] hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm font-medium text-[#022145] hover:text-primary transition-colors">Terms of Use</a>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm font-medium text-[#022145] mt-6">
            © 2024 Project Vicky. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
