import React from "react";
import { ArrowRight } from "lucide-react";
import aboutimg from "../../Photos/Caregiver-Website/Article 2.png";

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white" data-testid="about-section">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
        <div className="relative rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-[1.02] order-2 lg:order-1 min-h-[300px] sm:min-h-[420px] lg:min-h-[520px]">
          <img 
            src={aboutimg}
            alt="Doctor with clipboard" 
            className="w-full h-full object-cover absolute inset-0"
            data-testid="about-image"
          />
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 order-1 lg:order-2">
          <span className="inline-block w-fit px-4 sm:px-5 py-2 bg-primary/10 text-primary rounded-full text-[0.8rem] sm:text-[0.85rem] font-semibold" data-testid="about-badge">What Drives Us Forward</span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold leading-tight text-gray-900" data-testid="about-title">
            Inspiring Change, One Patient and One Community at a Time
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-gray-600" data-testid="about-description">
            Our commitment to underserved communities fuels everything we do. Through our platform, 
            we aim to inspire change, deliver better care, and create a brighter future for all.
          </p>
          <button className="px-6 sm:px-8 py-2.5 sm:py-[0.65rem] bg-gradient-to-br from-primary to-primary-light text-white rounded-full font-semibold text-sm sm:text-[0.95rem] transition-all hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(32,178,170,0.25)] hover:shadow-[0_6px_20px_rgba(32,178,170,0.35)] flex items-center gap-2 w-fit cursor-pointer" data-testid="about-learn-more">
            Learn More <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
