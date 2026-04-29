import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import SetNewPassword from "./components/auth/SetNewPassword";
import CaringAcrossContinents from "./components/registration-and-information-input/CaringAcrossContinents";
import { CaregiverDashboard } from "./components/Caregive-Home";
import HCPHome from "./components/HCP-Home/HCP-Home";
import Footer from "./components/Footer";
import "./css/App.css";

// Layout component to conditionally render Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/caregiver-dashboard' || location.pathname === '/hcp-home';
  
  return (
    <div className="min-h-screen bg-white">
      {!hideNavFooter && <Navbar />}
      {children}
      {!hideNavFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="/caring-across-continents" element={<CaringAcrossContinents />} />
            <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} />
            <Route path="/hcp-home" element={<HCPHome />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
