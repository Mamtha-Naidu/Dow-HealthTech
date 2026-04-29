import React from 'react';
import { Link } from 'react-router-dom';

const DashboardFooter = () => {
  return (
    <footer className="w-full px-4 sm:px-6 lg:px-14 py-8 border-t border-[#E5E9EB] bg-white">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* Logo & Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <Link to="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="#20B2AA" opacity="0.2" />
              <path d="M16 8L20 12L16 16L20 20L16 24L12 20L16 16L12 12L16 8Z" fill="#20B2AA" />
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
  );
};

export default DashboardFooter;
