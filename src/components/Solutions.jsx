import React from "react";
import { ArrowRight } from "lucide-react";
import SolutionCard from "./SolutionCard";

const Solutions = () => {
  const solutions = [
    {
      image: "https://images.pexels.com/photos/5664736/pexels-photo-5664736.jpeg",
      title: "Home Health Professional Tools",
      description: "We offer feature-rich, AI-powered healthcare workers in underserved areas with easy-to-use digital systems, enabling them to deliver high-quality care efficiently. From managing patient...",
      testId: "solution-card-1"
    },
    {
      image: "https://images.unsplash.com/photo-1666886573553-6548db92db79?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxkaXZlcnNlJTIwaGVhbHRoY2FyZSUyMHByb2Zlc3Npb25hbHMlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NjkxNzA0NDN8MA&ixlib=rb-4.1.0&q=85",
      title: "Lightweight Patient Management Platform",
      description: "Streamline your unique healthcare journey with our platform designed to help users manage appointments, medications, allergies, and other personal matters.",
      testId: "solution-card-2"
    },
    {
      image: "https://images.unsplash.com/photo-1666886573197-bf6600d15bce?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwc3RldGhvc2NvcGUlMjBmaXJzdCUyMGFpZCUyMGtpdCUyMGhlYWx0aGNhcmV8ZW58MHx8fHwxNzY5MTcwNDU3fDA&ixlib=rb-4.1.0&q=85",
      title: "Patient Scheduling and Management",
      description: "Patients can easily schedule appointments, manage their health records, and communicate with healthcare providers through our user-friendly interface. By simplifying healthcare...",
      testId: "solution-card-3"
    }
  ];

  return (
    <section id="solutions" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-teal-50 to-white" data-testid="solutions-section">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center">
          <span className="inline-block px-4 sm:px-5 py-2 bg-primary/10 text-primary rounded-full text-[0.8rem] sm:text-[0.85rem] font-semibold mb-3 sm:mb-4" data-testid="solutions-badge">What We Do</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold leading-tight text-gray-900 text-center" data-testid="solutions-title">
          Revolutionizing Healthcare with Purpose-Built Solutions
        </h2>
        <p className="text-center text-sm sm:text-base leading-relaxed text-gray-600 max-w-[900px] mx-auto mt-3 sm:mt-4 mb-8 sm:mb-12 md:mb-16 px-2" data-testid="solutions-intro">
          Vicky Cares delivers a patient management platform that empowers healthcare professionals 
          and patients with tools for scheduling, health management, and 24/7 nurse support—designed 
          to serve underserved communities with personalized care.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              image={solution.image}
              title={solution.title}
              description={solution.description}
              testId={solution.testId}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-12">
          <button className="px-8 sm:px-10 py-3 sm:py-[0.85rem] text-sm sm:text-base bg-gradient-to-br from-primary to-primary-light text-white rounded-full font-semibold transition-all hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(32,178,170,0.25)] hover:shadow-[0_6px_20px_rgba(32,178,170,0.35)] flex items-center gap-2 cursor-pointer" data-testid="view-more-button">
            View More <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
