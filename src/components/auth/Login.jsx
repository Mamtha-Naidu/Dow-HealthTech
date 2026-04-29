import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [savePassword, setSavePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password, savePassword });

    // Determine role: admin credentials route to HCP-Home
    const isAdmin =
      email.toLowerCase() === 'admin' ||
      email.toLowerCase().startsWith('admin@');

    const username = email.includes('@') ? email.split('@')[0] : email;
    const role = isAdmin ? 'admin' : 'caregiver';

    login({ email, username, role });

    if (isAdmin) {
      navigate('/hcp-home');
    } else {
      navigate('/caring-across-continents');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20 sm:py-32 bg-login-bg">
      {/* Background Gradient Blur */}
      <div className="absolute inset-0 pointer-events-none bg-login-gradient opacity-20 blur-[300px]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[582px] bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0px_7px_29px_rgba(100,100,111,0.2)] border border-login-border-light">
        {/* Title */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-center text-login-text font-[Inter] -tracking-[0.01em]">
            Log in to your account
          </h1>
          <p className="text-xs sm:text-sm font-medium text-center text-login-text-light">
            Join our community and explore our feature
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          {/* Email Field */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <label htmlFor="email" className="text-sm sm:text-base font-semibold text-login-text">
              Email/Username
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Medium"
              className="w-full h-11 sm:h-12 px-3 sm:px-4 text-sm font-medium rounded-md border border-login-border text-login-text focus:outline-none focus:ring-2 focus:ring-login-button/20"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm sm:text-base font-semibold text-login-text">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs sm:text-sm font-semibold text-login-link hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                className="w-full h-11 sm:h-12 px-3 sm:px-4 pr-12 text-sm font-bold rounded-md border border-login-border text-login-placeholder focus:outline-none focus:ring-2 focus:ring-login-button/20"
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

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="savePassword"
              checked={savePassword}
              onChange={(e) => setSavePassword(e.target.checked)}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded border border-login-border cursor-pointer accent-login-text-light"
            />
            <label htmlFor="savePassword" className="text-xs sm:text-sm font-semibold cursor-pointer select-none text-login-text">
              Save Password?
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-11 sm:h-12 flex items-center justify-center text-sm font-semibold text-white rounded-md bg-login-button transition-all hover:opacity-90 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm sm:text-base font-medium mt-3 text-login-text-light">
          Don't have an Account?{" "}
          <Link to="/register" className="font-semibold hover:underline text-login-text-light">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
