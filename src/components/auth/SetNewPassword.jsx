import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function SetNewPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset:", formData);
    // Add your password reset logic here
    // After success, navigate to login
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20 sm:py-32 bg-register-bg">
      {/* Background Gradient Blur */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-100 blur-[300px]"
        style={{
          background: 'linear-gradient(76.27deg, #AED4EB -0.79%, #F2ECF8 56.03%, #AED4EB 89.29%)'
        }}
      />

      {/* Set New Password Card */}
      <div className="relative z-10 w-full max-w-[582px] bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0px_7px_29px_rgba(100,100,111,0.2)] border border-register-border-light">
        {/* Title */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-center text-register-text font-[Inter] -tracking-[0.01em]">
            Set a New Password
          </h1>
          <p className="text-xs sm:text-sm font-medium text-center leading-relaxed text-register-text-light">
            Enter a strong new password to secure your account. Make sure it's something you'll remember.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 sm:gap-3">
              <label htmlFor="password" className="text-sm sm:text-base font-semibold text-register-text">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="*********"
                  className="w-full h-11 sm:h-12 px-3 sm:px-4 pr-12 text-sm font-bold rounded-md border border-register-border text-register-placeholder focus:outline-none focus:ring-2 focus:ring-register-button/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>
            
            {/* Password Requirements */}
            <div className="flex flex-col gap-1 sm:gap-2 mt-2">
              <p className="text-xs font-bold text-register-text">
                Password must include:
              </p>
              <p className="text-[10px] sm:text-xs font-medium leading-relaxed text-register-text">
                At least 8-12 characters (longer is better for security)<br />
                Uppercase and lowercase letters (e.g., A-Z, a-z)<br />
                At least one number (e.g., 0-9)<br />
                At least one special character (e.g., !, @, #, $, %, &, *)
              </p>
            </div>
          </div>

          {/* Repeat Password Field */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <label htmlFor="confirmPassword" className="text-sm sm:text-base font-semibold text-register-text">
              Repeat Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="*********"
                className="w-full h-11 sm:h-12 px-3 sm:px-4 pr-12 text-sm font-bold rounded-md border border-register-border text-register-placeholder focus:outline-none focus:ring-2 focus:ring-register-button/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-11 sm:h-12 flex items-center justify-center text-sm font-semibold text-white rounded-md bg-register-button transition-all hover:opacity-90 cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetNewPassword;
