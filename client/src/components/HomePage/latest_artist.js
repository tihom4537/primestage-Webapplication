import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LatestArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const lat = 30.75;
        const lng = 76.78;
        const response = await fetch(`/api/search/featured?lat=${lat}&lng=${lng}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }
        
        const data = await response.json();
        setArtists(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError('Failed to load featured artists');
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Handle navigation to ArtistShowcase when artist card is clicked
  const handleArtistClick = (artist) => {
    navigate('/artists/showcase', {
      state: {
        artist: artist,
        source: 'latestArtists' // Add source information to identify where we're navigating from
      },
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-100 py-4 sm:py-6 md:py-8">
        <div className="container mx-auto px-3 sm:px-4 flex items-center justify-center">
          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 animate-spin text-primary" />
          <span className="ml-2 text-xs sm:text-sm md:text-base text-gray-600">Loading featured artists...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 py-4 sm:py-6 md:py-8">
        <div className="container mx-auto px-3 sm:px-4">
          <Alert variant="destructive">
            <AlertDescription className="text-xs sm:text-sm">{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-12">
      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-normal mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-center text-gray-800 px-3 sm:px-4">
        MASTER PERFORMERS
      </h2>
      <div className="container mx-auto px-3 sm:px-4 sm:ml-6 md:ml-8 lg:ml-10">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={12}
          slidesPerView={1.3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            375: {
              slidesPerView: 1.4,
              spaceBetween: 14,
            },
            480: {
              slidesPerView: 1.6,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.1,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 22,
            },
            1280: {
              slidesPerView: 4.2,
              spaceBetween: 24,
            },
          }}
          className="pl-0 sm:pl-2 md:pl-4"
        >
          {artists.map((artist) => (
            <SwiperSlide 
              key={artist.id} 
              className="pb-10 sm:pb-12 md:pb-14 pt-1 sm:pt-2"
            >
              <div 
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full"
                onClick={() => handleArtistClick(artist)}
              >
                <div className="relative aspect-square">
                  <img
                    src={artist.profile_photo || '/api/placeholder/400/400'}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/400/400';
                    }}
                  />
                </div>
                
                <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-1.5 md:mb-2 line-clamp-1">
                    {artist.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-2.5 line-clamp-1">
                    {artist.skill_category}
                  </p>
                  
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-xs sm:text-sm md:text-base text-primary font-medium flex-shrink-0">
                      Event-Price: {artist.price_per_hour}
                    </p>
                    {artist.average_rating && (
                      <div className="flex items-center bg-gray-50 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 rounded-full text-xs sm:text-sm flex-shrink-0">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-0.5 sm:ml-1 font-medium">
                          {artist.average_rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {artists.length === 0 && (
          <div className="text-center mt-4 sm:mt-5 md:mt-6 lg:mt-8">
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">
              No featured artists available in this region.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestArtists;