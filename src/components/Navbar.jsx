import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Handle scroll to section on page load if hash exists
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first with hash
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''} bg-white/95 backdrop-blur-md border-b border-primary/10`} data-testid="navbar">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" data-testid="nav-logo">
          <div className="flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="sm:w-8 sm:h-8">
              <circle cx="16" cy="16" r="14" fill="#20B2AA" opacity="0.2"/>
              <path d="M16 8L20 12L16 16L20 20L16 24L12 20L16 16L12 12L16 8Z" fill="#20B2AA"/>
            </svg>
          </div>
          <span className="font-heading text-xl sm:text-2xl font-bold text-primary">Vicky</span>
        </div>

        {/* Desktop Menu with Login/Register */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection('home')} className="relative py-2 text-gray-600 font-medium transition-colors hover:text-primary nav-link-underline cursor-pointer" data-testid="nav-home">Home</button>
          <button onClick={() => scrollToSection('about')} className="relative py-2 text-gray-600 font-medium transition-colors hover:text-primary nav-link-underline cursor-pointer" data-testid="nav-about">About Us</button>
          <button onClick={() => scrollToSection('solutions')} className="relative py-2 text-gray-600 font-medium transition-colors hover:text-primary nav-link-underline cursor-pointer" data-testid="nav-solutions">Solutions</button>
          
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-full border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                data-testid="user-menu-button"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-semibold">
                  {user.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="font-semibold text-login-text">{user.username}</span>
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-slide-down">
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                      navigate('/');
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            (location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/forgot-password' && location.pathname !== '/set-new-password' && location.pathname !== '/caring-across-continents') && (
              <>
                <Link to="/login" className="px-7 py-[0.65rem] border-2 border-primary text-primary rounded-full font-semibold text-[0.95rem] transition-all hover:bg-primary/10 hover:-translate-y-0.5" data-testid="login-button">Login</Link>
                <Link to="/register" className="px-7 py-[0.65rem] bg-gradient-to-br from-primary to-primary-light text-white rounded-full font-semibold text-[0.95rem] transition-all hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(32,178,170,0.25)] hover:shadow-[0_6px_20px_rgba(32,178,170,0.35)] flex items-center gap-2" data-testid="register-button">
                  Register <ArrowRight size={16} />
                </Link>
              </>
            )
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center justify-center p-2 text-primary cursor-pointer" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="flex flex-col px-4 sm:px-6 py-4 sm:py-6 bg-white border-t border-primary/10 animate-slide-down" data-testid="mobile-menu">
          <button onClick={() => scrollToSection('home')} className="py-3 text-left text-gray-600 font-medium transition-colors hover:text-primary cursor-pointer" data-testid="mobile-nav-home">Home</button>
          <button onClick={() => scrollToSection('about')} className="py-3 text-left text-gray-600 font-medium transition-colors hover:text-primary cursor-pointer" data-testid="mobile-nav-about">About Us</button>
          <button onClick={() => scrollToSection('solutions')} className="py-3 text-left text-gray-600 font-medium transition-colors hover:text-primary cursor-pointer" data-testid="mobile-nav-solutions">Solutions</button>
          {user ? (
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-semibold text-lg">
                  {user.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="font-semibold text-login-text">{user.username}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
                className="w-full px-7 py-[0.65rem] border-2 border-red-500 text-red-500 rounded-full font-semibold text-[0.95rem] transition-all hover:bg-red-50 text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            (location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/forgot-password' && location.pathname !== '/set-new-password' && location.pathname !== '/caring-across-continents') && (
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
                <Link to="/login" className="w-full px-7 py-[0.65rem] border-2 border-primary text-primary rounded-full font-semibold text-[0.95rem] transition-all hover:bg-primary/10 text-center" data-testid="mobile-login-button">Login</Link>
                <Link to="/register" className="w-full px-7 py-[0.65rem] bg-gradient-to-br from-primary to-primary-light text-white rounded-full font-semibold text-[0.95rem] flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(32,178,170,0.25)]" data-testid="mobile-register-button">
                  Register <ArrowRight size={16} />
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
