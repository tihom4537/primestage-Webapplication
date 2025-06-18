import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal,Plus } from 'lucide-react';
import StaticHeader  from '../HomePage/staticHeader';
import Footer from '../HomePage/footer';
import MovingBoxes from '../HomePage/testimonials';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const artists = location.state?.artists || [];
  const searchSkill = location.state?.searchSkill || '';
  const searchCity = location.state?.searchCity || 'Chandigarh';

  // Function to format the skill name for display
  const formatSkillForDisplay = (skill) => {
    if (!skill) return '';
    
    // Convert to title case and handle special cases
    const formatted = skill.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    
    // Handle plural forms
    switch (skill.toUpperCase()) {
      case 'INSTRUMENTALISTS':
        return 'Instrumentalists';
      case 'DANCERS':
        return 'Dancers';
      default:
        return formatted;
    }
  };

  const handleArtistClick = (artist) => {
    navigate(`/artists/${artist.id}`, { 
      state: { artist } 
    });
  };

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = {
    'Singer': ['Pop', 'Classical', 'Rock'],
    'Instrumentalist': ['Guitarist', 'Violinist', 'Drummer'],
    'Dancer': ['Ballet', 'Hip-Hop', 'Contemporary'],
  };

  const locations = ['Chandigarh', 'Mohali', 'Panchkula'];


const [expandedFaq, setExpandedFaq] = useState(null);
  
     const toggleFaq = (index) => {
       if (expandedFaq === index) {
         setExpandedFaq(null);
       } else {
         setExpandedFaq(index);
       }
     };


    // FAQ Data
   const faqs = [
    {
                question: 'What is your refund policy?',
                answer: 'We offer a 100% refund if the booking is cancelled at least 3 days before the event. Cancellations made less than 3 days before the event may be subject to partial or no refund as per our cancellation policy.',
              },
              {
                question: 'Will I have to provide accommodation and traveling charges for an artist separately?',
                answer: 'No, accommodation and travel charges are included in the event price. You don\'t need to pay anything extra for these arrangements.',
              },
              {
                question: 'Will the artist perform on requested songs?',
                answer: 'Yes, artists generally accept special song requests. We recommend sharing your preferred songs in advance so the artist can prepare accordingly.',
              },
               {
                question: 'Who will arrange the sound system or audio equipment for my event?',
                answer: 'PrimeStage will handle the complete sound system setup. We offer a wide range of sound and audio options to suit your event size and needs.',
              },
               {
                question: 'Who will be responsible for the artist’s arrival, sound system, and overall event management to ensure my event goes well?',
                answer: 'Your event will be assigned a dedicated event manager from PrimeStage. They will ensure the artist’s timely arrival, sound system setup, and smooth event coordination.',
              },
               {
                question: 'Can the performance time be extended during the event?',
                answer: 'Yes, performance time can be extended based on the artist\'s availability. Additional charges may apply, and extensions should be requested in advance or during the event.',
              },
              {
                question: 'What if the artist does not arrive on time?',
                answer: 'In the rare case of a delay, our event manager will coordinate and keep you updated. We ensure minimal disruption and work proactively to manage timing.',
              },
               {
                question: 'What if the artist cancels the request at the last moment?',
                answer: 'Artist cancellations are extremely rare, but if it happens, PrimeStage will arrange a suitable replacement artist of equal or better quality, at no extra cost.',
              },
               {
                question: 'Where can I discuss the event details with the artists or chefs?',
                answer: 'Once your booking is confirmed, you can discuss all event details directly with the artist or chef through our platform. Our support team is also available to assist you at every step.',
              },
   ];





  // Extract unique skills from all artists for genre filter
  const availableSkills = useMemo(() => {
    const skillsSet = new Set();
    artists.forEach(artist => {
      if (artist.skills && typeof artist.skills === 'string') {
        artist.skills.split(',').forEach(skill => {
          skillsSet.add(skill.trim());
        });
      }
    });
    return Array.from(skillsSet).sort();
  }, [artists]);

  // Filter artists based on selected filters
  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      // Price filter
      const artistPrice = parseInt(artist.price_per_hour) || 0;
      if (selectedPrice > 0 && artistPrice > selectedPrice) {
        return false;
      }

      // Genre/Skills filter
      if (selectedGenre && artist.skills) {
        const artistSkills = artist.skills.split(',').map(skill => skill.trim());
        if (!artistSkills.includes(selectedGenre)) {
          return false;
        }
      }

      return true;
    });
  }, [artists, selectedPrice, selectedGenre]);

  const formatSkills = (skills) => {
    if (!skills || typeof skills !== 'string') {
      return 'No skills listed';
    }
    return skills.split(',').join(', ');
  };

  const formatPrice = (price) => `₹${parseInt(price).toLocaleString()}`;

  const FilterSection = () => (
    <div className="bg-gray-100 p-4 rounded-2xl shadow-sm">
      <h3 className="text-lg font-medium mb-4">Filters</h3>

      {/* Location Filter */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Location</h4>
        <select className="w-full p-2 border border-gray-400 rounded-2xl bg-white">
          <option value="">Select Location</option>
          {locations.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Genre Filter - Updated to use artist skills */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Skills</h4>
        <select 
          className="w-full p-2 border border-gray-400 rounded-2xl bg-white" 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Skills</option>
          {availableSkills.map((skill) => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>

      {/* Pricing Filter */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Max Price</h4>
        <input 
          type="range" 
          min="0" 
          max="100000" 
          step="10000" 
          value={selectedPrice} 
          onChange={(e) => setSelectedPrice(e.target.value)} 
          className="w-full border-gray-400" 
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹0</span>
          <span>₹100,000</span>
        </div>
        <p className="text-center text-gray-700 mt-2">
          {selectedPrice > 0 ? `Max Price: ₹${selectedPrice.toLocaleString()}` : 'No price limit'}
        </p>
      </div>

      {/* Reset Filters Button */}
      <button 
        onClick={() => {
          setSelectedGenre('');
          setSelectedPrice(0);
        }}
        className="w-full bg-gray-300 text-gray-700 py-2 rounded-2xl hover:bg-gray-400 mb-2"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <StaticHeader/>
      
      {/* Full-width Image with Centered Heading */}
      <div className="relative w-full h-[450px] overflow-hidden">
        <img 
          src="/gama-films-IbOcKJsFInE-unsplash.jpg" 
          alt="Header Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end bg-black bg-opacity-50 px-4 pb-8 sm:pb-12 md:pb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-2">
           Live {formatSkillForDisplay(searchSkill)} In {searchCity}
          </h1>
        </div>
      </div>

      {/* Mobile Filter Icon */}
      <button 
        onClick={() => setIsMobileFilterOpen(true)} 
        className="md:hidden fixed bottom-4 right-4 z-50 bg-white border border-gray-300 p-3 rounded-xl shadow-lg"
      >
        <SlidersHorizontal className="h-6 w-6 text-primary" />
      </button>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-white z-[100] md:hidden overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-medium">Filters</h2>
              <button 
                onClick={() => setIsMobileFilterOpen(false)} 
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            </div>
            <FilterSection />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-6 flex">
        {/* Filter Section */}
        <div className="hidden md:block w-1/4 pr-8">
          <div className="sticky top-20 bg-gray-100 px-4 py-4 shadow-sm rounded-2xl">
            <h3 className="text-lg font-medium mb-4">Filters</h3>

            {/* Location Filter */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Location</h4>
              <div className="relative">
                <select className="w-full p-3 border border-gray-300 rounded-2xl bg-white appearance-none 
                  focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500
                  text-gray-700 cursor-pointer
                  pr-8">
                  <option value="">Select Location</option>
                  {locations.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            

            {/* Skills Filter - Updated */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Skills</h4>
              <div className="relative">
                <select className="w-full p-3 border border-gray-300 rounded-2xl bg-white appearance-none 
                  focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500
                  text-gray-700 cursor-pointer
                  pr-8"
                  value={selectedGenre} 
                  onChange={(e) => setSelectedGenre(e.target.value)}>
                  <option value="">All Skills</option>
                  {availableSkills.map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pricing Filter */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Max Price</h4>
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="10000" 
                value={selectedPrice} 
                onChange={(e) => setSelectedPrice(e.target.value)} 
                className="w-full border-gray-400 rounded-xl" 
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹0</span>
                <span>₹100,000</span>
              </div>
              <p className="text-center text-gray-700 mt-2">
                {selectedPrice > 0 ? `Max Price: ₹${selectedPrice.toLocaleString()}` : 'No price limit'}
              </p>
            </div>

            {/* Reset Filters Button */}
            <button 
              onClick={() => {
                setSelectedGenre('');
                setSelectedPrice(0);
              }}
              className="w-full bg-gray-300 text-gray-700 py-3 rounded-2xl hover:bg-gray-400 mb-2"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <p className="text-gray-600 font-light">
              {filteredArtists.length} {filteredArtists.length === 1 ? 'artist' : 'artists'} found
              {(selectedGenre || selectedPrice > 0) && (
                <span className="text-sm text-gray-500 ml-2">
                  (filtered from {artists.length} total)
                </span>
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <div 
                key={artist.id} 
                className="group bg-white cursor-pointer rounded-2xl shadow hover:shadow-md transition w-full max-w-sm mx-auto"
                onClick={() => handleArtistClick(artist)}
              >
                <div className="relative w-full h-[250px] md:h-[375px] overflow-hidden mb-4 rounded-t-2xl">
                  <img
                    src={artist.profile_photo || "/api/placeholder/400/300"}
                    alt={artist.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform rounded-t-2xl"
                    onError={(e) => e.target.src = "/api/placeholder/400/300"}
                  />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-lg font-medium">{artist.name}</h3>
                  <p className="text-gray-600">{artist.skill_category}</p>
                  <p className="text-sm text-gray-500">{formatSkills(artist.skills)}</p>
                  <p className="text-primary font-medium">{formatPrice(artist.price_per_hour)}/Event-Price</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MovingBoxes/>


      {/* FAQs Section */}
     <div className="py-12 max-w-7xl mx-auto px-8">
       <h2 className="text-2xl font-bold mb-4 text-center">FAQs</h2>
       <div className="space-y-4">
         {faqs.map((faq, index) => (
           <div key={index} className="border rounded-2xl p-4 bg-white">
             <button
               onClick={() => toggleFaq(index)}
               className="flex justify-between w-full text-left text-gray-700 font-medium">
               <span>{faq.question}</span>
               <Plus className="w-5 h-5" />
             </button>
             {expandedFaq === index && (
               <div className="mt-2 text-gray-600">
                 <p>{faq.answer}</p>
               </div>
             )}
           </div>
         ))}
       </div>
     </div>


    {/* New Section Above Footer */}
                <div className="bg-gray-50 py-16 px-4">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      The process of Booking Live DJs for the Event
                    </h2>
                    <h3 className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
                      How to Book a Live DJs in Chandigarh – Simple & Hassle-Free
                    </h3>
                    <div className="max-w-3xl mx-auto">
                      <div className="text-gray-600 text-lg leading-relaxed space-y-6">
                        <div className="text-center">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">✨ Choose Your DJ</h4>
                          <p>Browse top live DJs in Chandigarh and pick the perfect match for your event.</p>
                        </div>


                        <div className="text-center">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">✨ Share Event Details</h4>
                          <p>Enter your date, venue, and preferences — we'll handle the rest.</p>
                        </div>


                        <div className="text-center">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">✨ We Handle Setup</h4>
                          <p>Sound system? No worries — Primestage provides everything needed.</p>
                        </div>


                        <div className="text-center">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">✨ Relax with Full Support</h4>
                          <p>A dedicated event manager ensures smooth coordination. Need to cancel? We've got you covered.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


        
                <Footer/>

    </div>
  );
};

export default SearchResults;