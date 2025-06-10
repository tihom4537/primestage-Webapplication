import React, { useState, useEffect, useRef } from 'react';

const CounterSection = () => {
  const [bookingsCount, setBookingsCount] = useState(0);
  const [artistsCount, setArtistsCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  // Custom hook for number animation
  const animateCounter = (start, end, duration, setter) => {
    const startTime = Date.now();
    const range = end - start;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + (range * easeOutQuart));
      
      setter(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Start animations with slight delay between them
          setTimeout(() => animateCounter(0, 1250, 2500, setBookingsCount), 200);
          setTimeout(() => animateCounter(0, 580, 2800, setArtistsCount), 400);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const CounterCard = ({ count, label, delay = 0 }) => (
    <div 
      className={`text-center transform transition-all duration-1000 ${
        hasAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600 mb-4">
          {count.toLocaleString()}+
        </div>
        <div className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-medium">
          {label}
        </div>
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 sm:py-16 lg:py-20 xl:py-24"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Our Impact in Numbers
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Trusted by thousands of customers and working with hundreds of talented artists
          </p>
        </div>

        {/* Counter Bar */}
        <div className="max-w-5xl mx-auto px-2">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 lg:p-8 xl:p-10 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="flex justify-between items-center gap-2 sm:gap-4 lg:gap-8">
              {/* Left Side - Bookings */}
              <div className="text-center flex-1 min-w-0">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-1 sm:mb-3">
                  {bookingsCount.toLocaleString()}+
                </div>
                <div className="text-xs xs:text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-medium leading-tight">
                  No of Bookings
                </div>
              </div>
              
              {/* Divider - Always vertical */}
              <div className="w-px h-10 xs:h-12 sm:h-16 md:h-20 bg-gradient-to-b from-transparent via-gray-300 to-transparent flex-shrink-0"></div>
              
              {/* Right Side - Artists */}
              <div className="text-center flex-1 min-w-0">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-purple-600 mb-1 sm:mb-3">
                  {artistsCount.toLocaleString()}+
                </div>
                <div className="text-xs xs:text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-medium leading-tight">
                  Number of Artists
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Add decorative elements */}
        <div className="mt-12 sm:mt-16 flex justify-center space-x-3 sm:space-x-4 opacity-30">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;