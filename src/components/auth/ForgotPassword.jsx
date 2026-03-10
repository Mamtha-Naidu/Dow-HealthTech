import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    motherMaidenName: "",
    placeOfBirth: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset submitted:", formData);
    // Add your password reset logic here
    // Navigate to set new password page after verification
    navigate("/set-new-password");
  };

  const handleCancel = () => {
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

      {/* Forgot Password Card */}
      <div className="relative z-10 w-full max-w-[582px] bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0px_7px_29px_rgba(100,100,111,0.2)] border border-register-border-light">
        {/* Title */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-register-text font-[Inter] -tracking-[0.01em]">
            Forgot Your Password?
          </h1>
          <p className="text-xs sm:text-sm font-medium leading-relaxed text-register-text-light">
            Please enter your email/username, mother's maiden name and place of birth below to verify your identity.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          {/* Email/Username Field */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <label htmlFor="email" className="text-sm sm:text-base font-semibold text-register-text">
              Email/Username
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email or username"
              className="w-full h-11 sm:h-12 px-3 sm:px-4 text-sm font-medium rounded-md border border-register-border text-register-placeholder focus:outline-none focus:ring-2 focus:ring-register-button/20"
              required
            />
          </div>

          {/* Mother Maiden Name Field */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <label htmlFor="motherMaidenName" className="text-sm sm:text-base font-semibold text-register-text">
              Mother Maiden Name
            </label>
            <input
              type="text"
              id="motherMaidenName"
              name="motherMaidenName"
              value={formData.motherMaidenName}
              onChange={handleChange}
              placeholder="Enter mother's maiden name"
              className="w-full h-11 sm:h-12 px-3 sm:px-4 text-sm font-medium rounded-md border border-register-border text-register-placeholder focus:outline-none focus:ring-2 focus:ring-register-button/20"
              required
            />
          </div>

          {/* Place of Birth Field */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <label htmlFor="placeOfBirth" className="text-sm sm:text-base font-semibold text-register-text">
              Place of Birth
            </label>
            <input
              type="text"
              id="placeOfBirth"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handleChange}
              placeholder="Enter your place of birth"
              className="w-full h-11 sm:h-12 px-3 sm:px-4 text-sm font-medium rounded-md border border-register-border text-register-placeholder focus:outline-none focus:ring-2 focus:ring-register-button/20"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-5 mt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 h-11 sm:h-12 flex items-center justify-center text-sm font-semibold rounded-md bg-[#E5E9EB] text-register-text transition-all hover:opacity-90 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 sm:h-12 flex items-center justify-center text-sm font-semibold text-white rounded-md bg-register-button transition-all hover:opacity-90 cursor-pointer"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
