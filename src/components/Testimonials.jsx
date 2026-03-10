import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "As a home health professional, Vicky Cares has been a game-changer for my daily workflow. The platform makes it so easy to manage patient schedules and access their records on the go. It's empowering to know I can provide better care, even in underserved areas.",
      author: "Maria L. Home Health Nurse"
    },
    {
      text: "The lightweight patient management system has transformed how we deliver care. Being able to coordinate with our team in real-time has significantly improved our efficiency and patient outcomes.",
      author: "Dr. James Wilson, Primary Care Physician"
    },
    {
      text: "Scheduling appointments and accessing patient information has never been easier. This platform truly understands the needs of healthcare professionals working in community settings.",
      author: "Sarah Chen, Community Health Worker"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white" data-testid="testimonials-section">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center">
          <span className="inline-block px-4 sm:px-5 py-2 bg-primary/10 text-primary rounded-full text-[0.8rem] sm:text-[0.85rem] font-semibold mb-8 sm:mb-12" data-testid="testimonials-badge">Our Testimonial</span>
        </div>
        
        <div className="relative flex flex-col sm:flex-row items-center justify-center my-6 sm:my-12 gap-4 sm:gap-8" data-testid="testimonial-carousel">
          {/* Navigation buttons - hidden on mobile, shown on sides on larger screens */}
          <button 
            className="hidden sm:flex flex-shrink-0 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full bg-primary/10 border-0 items-center justify-center cursor-pointer transition-all text-primary hover:bg-primary hover:text-white hover:scale-110" 
            onClick={prevTestimonial}
            data-testid="carousel-prev-button"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex-1 text-center animate-fade-in px-2">
            <div className="flex justify-center gap-1 mb-4 sm:mb-6" data-testid="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="sm:w-5 sm:h-5" fill="#FFD700" color="#FFD700" />
              ))}
            </div>
            <p className="text-sm sm:text-base md:text-[1.15rem] leading-relaxed text-gray-700 italic mb-4 sm:mb-6 max-w-[800px] mx-auto" data-testid="testimonial-text">
              "{testimonials[currentTestimonial].text}"
            </p>
            <p className="font-heading text-sm sm:text-base font-bold text-primary" data-testid="testimonial-author">
              {testimonials[currentTestimonial].author}
            </p>
          </div>

          <button 
            className="hidden sm:flex flex-shrink-0 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full bg-primary/10 border-0 items-center justify-center cursor-pointer transition-all text-primary hover:bg-primary hover:text-white hover:scale-110" 
            onClick={nextTestimonial}
            data-testid="carousel-next-button"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile navigation buttons */}
        <div className="flex sm:hidden justify-center gap-4 mt-4">
          <button 
            className="flex-shrink-0 w-[40px] h-[40px] rounded-full bg-primary/10 border-0 flex items-center justify-center cursor-pointer transition-all text-primary active:bg-primary active:text-white" 
            onClick={prevTestimonial}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="flex-shrink-0 w-[40px] h-[40px] rounded-full bg-primary/10 border-0 flex items-center justify-center cursor-pointer transition-all text-primary active:bg-primary active:text-white" 
            onClick={nextTestimonial}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8" data-testid="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 sm:h-2.5 rounded-full border-0 cursor-pointer transition-all ${index === currentTestimonial ? 'w-6 sm:w-[30px] bg-primary rounded-md' : 'w-2 sm:w-2.5 bg-gray-300 rounded-full'}`}
              onClick={() => setCurrentTestimonial(index)}
              data-testid={`carousel-indicator-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
