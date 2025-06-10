import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BestArtist = () => {
  const [bestArtist, setBestArtist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/bestArtist');
        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }
        const data = await response.json();
        setBestArtist(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError('Failed to load artists');
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Extract artist ID from item_name and handle navigation
  const handleArtistClick = (artist) => {
    // Extract the ID part after the slash
    const nameParts = artist.item_name.split('/');
    const artistId = nameParts.length > 1 ? nameParts[1].trim() : artist.id;
    
    navigate('/artists/showcase', {
      state: {
        artist: {
          ...artist,
          id: artistId // Use the extracted ID instead of the record ID
        },
        source: 'latestArtists'
      },
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-100 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4 flex items-center justify-center">
          <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 animate-spin text-primary" />
          <span className="ml-2 text-xs sm:text-sm md:text-base text-gray-600">Loading best artists...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-6 sm:py-8 md:py-12 lg:py-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-normal mb-4 sm:mb-6 md:mb-8 text-center text-gray-800 px-3 sm:px-4">
        OUR BEST ARTISTS
      </h2>
      <div className="container mx-auto px-2 sm:px-4 md:ml-6 lg:ml-10">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={12}
          slidesPerView={1.4}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            375: {
              slidesPerView: 1.5,
              spaceBetween: 14,
            },
            480: {
              slidesPerView: 1.7,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.2,
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
              slidesPerView: 3.8,
              spaceBetween: 24,
            },
          }}
          className="pl-1 sm:pl-2 md:pl-4"
        >
          {bestArtist.map((artist) => (
            <SwiperSlide 
              key={artist.id} 
              className="pb-10 sm:pb-12 pt-1 sm:pt-2"
            >
              <div 
                className="bg-white rounded-xl sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full"
                onClick={() => handleArtistClick(artist)}
              >
                <div className="relative aspect-square">
                  <img
                    src={artist.item_data || '/api/placeholder/400/400'}
                    alt={artist.item_name.split('/')[0].trim()}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/400/400';
                    }}
                  />
                </div>
                
                <div className="p-3 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                    {artist.item_name.split('/')[0].trim()}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2">{artist.role}</p>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-xs sm:text-sm md:text-base text-primary font-medium">
                      {artist.experience} years exp.
                    </p>
                    {artist.performance_rating && (
                      <div className="flex items-center bg-gray-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 font-medium">
                          {artist.performance_rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {bestArtist.length === 0 && (
          <div className="text-center mt-4 sm:mt-6 md:mt-8">
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">
              No artists available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestArtist;