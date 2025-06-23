import React, { useState, useEffect } from 'react';
import Header from './Header';
import NavigationMenu from './Navigartion_menu';
import HeroSection from './Video';
import FeaturedCategories from './categories';
import FeaturedArtists from './featured_carousel';
import FeaturedArtists2 from './featured_caraousel2';
import LatestArtists from './latest_artist';
import BestTeam from './BestTeam';
import BestArtist from './BestArtist';
import Footer from './footer';
import MovingBoxes from './testimonials';
import CounterSection from './trust';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);



   // Set metadata from index.html
  useEffect(() => {
    // Primary Meta Tags
    document.title = "PrimeStage - Book Professional Artists & Performers for Events";
    
    // Function to set or update meta tags
    const setMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name';
      let metaTag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attribute, name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    // Primary Meta Tags
    setMetaTag('title', 'PrimeStage - Book Professional Artists & Performers for Events');
    setMetaTag('description', 'Book top professional artists, singers and bands for your events. PrimeStage connects you directly with verified artists for weddings, parties, corporate events & more.');
    setMetaTag('keywords', 'artist booking, live performers, wedding singers, event artists, professional entertainers, party performers, corporate entertainment, book artists online, house party, live singer in chandigarh, Bands for Event, DJ');
    setMetaTag('author', 'PrimeStage');
    setMetaTag('robots', 'index, follow');
    setMetaTag('language', 'English');
    setMetaTag('revisit-after', '7 days');

    // Open Graph / Facebook
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', 'https://primestage.in/', true);
    setMetaTag('og:title', 'PrimeStage - Book Professional Artists & Performers for Events', true);
    setMetaTag('og:description', 'Book top professional artists, singers and bands for your events. PrimeStage connects you directly with verified artists for weddings, parties, corporate events & more.', true);
    setMetaTag('og:image', `${process.env.PUBLIC_URL || ''}/og-logo.jpg`, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:site_name', 'PrimeStage', true);
    setMetaTag('og:locale', 'en_US', true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image', true);
    setMetaTag('twitter:url', 'https://primestage.in/', true);
    setMetaTag('twitter:title', 'PrimeStage - Book Professional Artists & Performers for Events', true);
    setMetaTag('twitter:description', 'Book top professional artists, singers, dancers, and performers for your events. PrimeStage connects you directly with verified artists for weddings, parties, corporate events & more.', true);
    setMetaTag('twitter:image', `${process.env.PUBLIC_URL || ''}/og-logo.jpg`, true);
    setMetaTag('twitter:creator', '@PrimeStage', true);
    setMetaTag('twitter:site', '@PrimeStage', true);

    // Additional SEO Meta Tags
    setMetaTag('application-name', 'PrimeStage');
    setMetaTag('apple-mobile-web-app-title', 'PrimeStage');
    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    setMetaTag('mobile-web-app-capable', 'yes');

  
    // Add structured data (JSON-LD)
    const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
    if (!existingStructuredData) {
      const structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PrimeStage",
        "url": "https://primestage.in",
        "description": "Book top professional artists, singers and bands for your events. PrimeStage connects you directly with verified artists for weddings, parties, corporate events & more.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "category": "Artist Booking Services"
        },
        "creator": {
          "@type": "Organization",
          "name": "PrimeStage"
        }
      });
      document.head.appendChild(structuredDataScript);
    }

    // Cleanup function to remove dynamically added meta tags when component unmounts
    return () => {
      // Note: In most cases, you might want to keep the meta tags even after component unmounts
      // But if you need to clean them up for route changes, you can do it here
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = window.innerHeight * 0.4;
      const progress = Math.min(scrollPosition / triggerPoint, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // // Auto-advance slides
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % 5); // 5 is the number of featured artists
  //   }, 5000);

  //   return () => clearInterval(timer);
  // }, []);

  const mainLogoStyles = {
    transform: `
      translate(
        calc(-50% + ${scrollProgress * 0}px), 
        calc(-50% - ${scrollProgress * 20}vh)
      )
      scale(${1 - scrollProgress * 0.4}) 
    `,
    opacity: scrollProgress >= 0.95 ? 0 : 1,
    position: "fixed",
    top: "20%",
    left: "50%",
    zIndex: 40,
    transformOrigin: "center center",
    transition: "transform 0.1s linear, opacity 0.2s ease-in-out",
    willChange: "transform, opacity",
    whiteSpace: "nowrap",
    fontSize: "max(12vw, 100px)",
    letterSpacing: "0.1em",
    width: "100vw",
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        scrollProgress={scrollProgress} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      <NavigationMenu 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      <HeroSection mainLogoStyles={mainLogoStyles} />

      <FeaturedCategories />

      <FeaturedArtists 
        // currentSlide={currentSlide} 
      />
      <CounterSection/>

      <LatestArtists />

      <FeaturedArtists2 
        // currentSlide={currentSlide} 
      />
      <BestTeam />
      <BestArtist/>
      {/* <MovingBoxes /> */}
      <MovingBoxes/>

      <Footer />
    </div>
  );
};

export default HomePage;

