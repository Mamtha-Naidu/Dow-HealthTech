import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8" data-testid="footer">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr] gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col gap-3 sm:gap-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start" data-testid="footer-logo">
              <div className="flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" fill="#20B2AA" opacity="0.2"/>
                  <path d="M16 8L20 12L16 16L20 20L16 24L12 20L16 16L12 12L16 8Z" fill="#20B2AA"/>
                </svg>
              </div>
              <span className="font-heading text-xl sm:text-2xl font-bold">Vicky</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-[400px] text-xs sm:text-sm mx-auto md:mx-0" data-testid="footer-description">
              Empowering healthcare through innovative solutions for underserved communities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <h4 className="font-heading text-sm sm:text-base font-bold mb-3 sm:mb-4" data-testid="footer-column-title-1">Company</h4>
              <a href="#about" className="block text-gray-400 text-[0.85rem] sm:text-[0.95rem] mb-2 sm:mb-3 transition-colors hover:text-primary" data-testid="footer-link-about">About Us</a>
              <a href="#solutions" className="block text-gray-400 text-[0.85rem] sm:text-[0.95rem] mb-2 sm:mb-3 transition-colors hover:text-primary" data-testid="footer-link-careers">Careers</a>
              <a href="#" className="block text-gray-400 text-[0.85rem] sm:text-[0.95rem] mb-2 sm:mb-3 transition-colors hover:text-primary" data-testid="footer-link-contact">Contact</a>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="font-heading text-sm sm:text-base font-bold mb-3 sm:mb-4" data-testid="footer-column-title-2">Solutions</h4>
              <a href="#solutions" className="block text-gray-400 text-[0.85rem] sm:text-[0.95rem] mb-2 sm:mb-3 transition-colors hover:text-primary" data-testid="footer-link-professionals">For Professionals</a>
              <a href="#solutions" className="block text-gray-400 text-[0.85rem] sm:text-[0.95rem] mb-2 sm:mb-3 transition-colors hover:text-primary" data-testid="footer-link-patients">For Patients</a>
              <a href="#solutions" className="block text-gray-400 text-[0.85rem] sm:text-[0.95rem] mb-2 sm:mb-3 transition-colors hover:text-primary" data-testid="footer-link-communities">For Communities</a>
            </div>

            <div className="col-span-2 sm:col-span-1 text-center sm:text-left">
              <h4 className="font-heading text-sm sm:text-base font-bold mb-3 sm:mb-4" data-testid="footer-column-title-3">Resources</h4>
              <a href="#" className="block text-gray-400 text-[0.85rem] sm:text-[0.95rem] mb-2 sm:mb-3 transition-colors hover:text-primary" data-testid="footer-link-blog">Blog</a>
              <a href="#" className="block text-gray-400 text-[0.85rem] sm:text-[0.95rem] mb-2 sm:mb-3 transition-colors hover:text-primary" data-testid="footer-link-support">Support</a>
              <a href="#" className="block text-gray-400 text-[0.85rem] sm:text-[0.95rem] mb-2 sm:mb-3 transition-colors hover:text-primary" data-testid="footer-link-privacy">Privacy Policy</a>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/10 text-center text-gray-400 text-xs sm:text-sm">
          <p data-testid="footer-copyright">© 2025 Vicky Cares. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
