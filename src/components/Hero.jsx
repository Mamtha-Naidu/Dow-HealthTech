import React from "react";
import heroImage from "../../Photos/Caregiver-Website/Hero.png";
import mobileabnner from "../../Photos/Caregiver-Website/Mobile - Banner.png";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 overflow-hidden bg-gradient-to-br from-teal-50 to-white" data-testid="hero-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(32,178,170,0.08)_0%,transparent_50%)] pointer-events-none"></div>
      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        <div className="lg:max-w-[50%]">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-primary/10 text-primary rounded-full text-[0.8rem] sm:text-[0.85rem] font-semibold mb-4 sm:mb-6 animate-fade-in-up" data-testid="hero-badge">
            <span className="text-base">✦</span>
            Fast, Efficient and Productive
          </div>
          <h1 className="font-heading text-[1.75rem] sm:text-[2rem] md:text-4xl lg:text-[3.5rem] font-extrabold leading-tight text-gray-900 mb-4 sm:mb-6 [animation:fadeInUp_0.8s_ease]" data-testid="hero-title">
            Empowering Health and Wellness Through<span className="text-primary"> Compassionate Care and Innovative Solutions</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-[1.15rem] leading-relaxed text-gray-600 mb-6 sm:mb-8 [animation:fadeInUp_1s_ease]" data-testid="hero-description">
            Our mission is to provide personalized, accessible, and innovative healthcare solutions
            that enhance the quality of life for every individual we serve.
          </p>
        </div>
        {/* Mobile Hero Image */}
        <div className="block lg:hidden mt-8 rounded-2xl overflow-hidden shadow-lg">
          <img 
            //src="https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaGVhbHRoY2FyZSUyMHByb2Zlc3Npb25hbHMlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NjkxNzA0NDN8MA&ixlib=rb-4.1.0&q=85" 
            src={mobileabnner}
            alt="Healthcare professionals collaborating" 
            className="w-full h-[250px] sm:h-[300px] object-cover"
            data-testid="hero-image-mobile"
          />
        </div>
      </div>
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-4/5 animate-fade-in z-0">
        <img 
          //src="https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaGVhbHRoY2FyZSUyMHByb2Zlc3Npb25hbHMlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NjkxNzA0NDN8MA&ixlib=rb-4.1.0&q=85" 
          src={heroImage}
          alt="Healthcare professionals collaborating" 
          className="w-full h-full object-cover rounded-l-[20px] shadow-[-20px_20px_60px_rgba(0,0,0,0.15)]"
          data-testid="hero-image"
        />
      </div>
    </section>
  );
};

export default Hero;
