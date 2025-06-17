import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import StaticHeader from '../HomePage/staticHeader';
import Footer from '../HomePage/footer';

const PanchkulaBandSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get search parameters from URL params first, then fallback to navigation state
  const getSearchParamsFromUrl = () => {
    // const urlLat = searchParams.get('lat');
    // const urlLng = searchParams.get('lng');
     const urlLat = "30.7333";
    const urlLng = "76.7794";
    // const urlSkill = searchParams.get('skill');
    const urlSkill="Band";
    const urlCity = "Panchkula";
    
    if (urlLat && urlLng ) {
      return {
        lat: parseFloat(urlLat),
        lng: parseFloat(urlLng),
        skill: urlSkill,
        city: urlCity
      };
    }
    
    // Fallback to navigation state
    return location.state?.searchParams || {};
  };
  
  const searchData = getSearchParamsFromUrl();
  const { lat, lng, skill, city } = searchData;
  
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const locations = ['Chandigarh', 'Mohali', 'Panchkula', 'Noida', 'New Delhi', 'Gurugram', 'Shimla'];

  // API call to fetch artists
  useEffect(() => {
    const fetchArtists = async () => {
      // If no search parameters, redirect back or show error
      if (!lat || !lng || !skill) {
        setError('Missing search parameters');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/search/fetch-artists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lat: lat,
            lng: lng,
            skill: skill
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }

        const data = await response.json();
        setArtists(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching artists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [lat, lng, skill]);

  const formatSkills = (skills) => skills.split(',').join(', ');
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

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Category</h4>
        <select className="w-full p-2 border border-gray-400 rounded-2xl bg-white" onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Genre Filter */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Genre</h4>
        <select className="w-full p-2 border border-gray-400 rounded-2xl bg-white" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">Select Genre</option>
          {(categories[selectedCategory] || []).map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Pricing Filter */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Pricing</h4>
        <input type="range" min="0" max="100000" step="10000" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)} className="w-full border-gray-400" />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹0</span>
          <span>₹100,000</span>
        </div>
        <p className="text-center text-gray-700 mt-2">Selected Price: ₹{selectedPrice.toLocaleString()}</p>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-primary text-white py-2 rounded-2xl hover:bg-primary-dark">
        Apply Filters
      </button>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading artists...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
        <StaticHeader />
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-50">
        <div className="container px-4 py-4 flex items-center relative">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full absolute left-4">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl md:text-2xl font-light">Artists</h1>
          </div>
        </div>
      </div>

      {/* Full-width Image with Centered Heading */}
      <div className="relative w-full h-[450px] overflow-hidden">
        <img 
          src="/gama-films-IbOcKJsFInE-unsplash.jpg" 
          alt="Header Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 px-4">
          <h2 className="text-4xl md:text-6xl mt-60 font-medium text-white text-center">
              {skill ? skill.charAt(0).toUpperCase() + skill.slice(1) + 's' : 'Artists'} In {city || 'Chandigarh'}
          </h2>
          <p className="text-white text-lg mt-4 text-center">Find the perfect artist for your event</p>
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
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Category</h4>
              <div className="relative">
                <select className="w-full p-3 border border-gray-300 rounded-2xl bg-white appearance-none 
                  focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500
                  text-gray-700 cursor-pointer
                  pr-8"
                  onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Genre Filter */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Genre</h4>
              <div className="relative">
                <select className="w-full p-3 border border-gray-300 rounded-2xl bg-white appearance-none 
                  focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500
                  text-gray-700 cursor-pointer
                  pr-8"
                  value={selectedGenre} 
                  onChange={(e) => setSelectedGenre(e.target.value)}>
                  <option value="">Select Genre</option>
                  {(categories[selectedCategory] || []).map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
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
              <h4 className="text-md font-medium mb-2">Pricing</h4>
              <input type="range" min="0" max="100000" step="10000" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)} className="w-full border-gray-400 rounded-xl" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹0</span>
                <span>₹100,000</span>
              </div>
              <p className="text-center text-gray-700 mt-2">Selected Price: ₹{selectedPrice.toLocaleString()}</p>
            </div>

            {/* Apply Filters Button */}
            <button className="w-full bg-primary text-white py-3 rounded-2xl hover:bg-primary-dark">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <p className="text-gray-600 font-light">
              {artists.length} {artists.length === 1 ? 'artist' : 'artists'} found
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
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
                  <p className="text-primary font-medium">{formatPrice(artist.price_per_hour)}/hr</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* New Section Above Footer */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect {skill ? skill : 'Artist'} in {city || 'Chandigarh'}
          </h2>
          <h3 className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
            Professional Entertainment for Every Occasion
          </h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 text-lg leading-relaxed">
              Discover talented {skill ? skill.toLowerCase() + 's' : 'artists'} in {city || 'Chandigarh'} who can bring your events to life. 
              Whether you're planning a wedding, corporate event, birthday party, or any special celebration, 
              our curated selection of professional {skill ? skill.toLowerCase() + 's' : 'artists'} ensures your event will be memorable. 
              Browse through verified profiles, compare prices, and book directly with confidence. 
              From intimate gatherings to grand celebrations, we have the perfect {skill ? skill.toLowerCase() : 'artist'} for your needs.
            </p>
          </div>
        </div>
      </div>

       {/* New Section Above Footer */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect {skill ? skill : 'Artist'} in {city || 'Chandigarh'}
          </h2>
          <h3 className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
            Professional Entertainment for Every Occasion
          </h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 text-lg leading-relaxed">
              Discover talented {skill ? skill.toLowerCase() + 's' : 'artists'} in {city || 'Chandigarh'} who can bring your events to life. 
              Whether you're planning a wedding, corporate event, birthday party, or any special celebration, 
              our curated selection of professional {skill ? skill.toLowerCase() + 's' : 'artists'} ensures your event will be memorable. 
              Browse through verified profiles, compare prices, and book directly with confidence. 
              From intimate gatherings to grand celebrations, we have the perfect {skill ? skill.toLowerCase() : 'artist'} for your needs.
            </p>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default PanchkulaBandSearchResults;