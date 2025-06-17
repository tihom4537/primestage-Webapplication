import React, { useState, useRef, useEffect } from 'react';
import { Star, Share2, Heart, MapPin, User, ChevronRight, Plus, Calendar, Check, Loader2, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import PhoneAuthModal from './PhoneAuthModel';
import { useAuth } from '../context/AuthContext';
import Footer from './HomePage/footer';
import Header from './HomePage/Header';
// import PhoneAuthModal from './PhoneAuthModal';
import SignUpModal from './SignUpModal';
import StaticHeader from './HomePage/staticHeader';





const ArtistShowcase = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedImage, setSelectedImage] = useState(0);
  const locationData = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [showAuthModal, setShowAuthModal] = useState(false);
  const [artist, setArtist] = useState(locationData.state?.artist || null);
  const [isArtistLoading, setIsArtistLoading] = useState(false);
  const [artistError, setArtistError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const sourceRoute = locationData.state?.source;
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
 const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Sample rating data (replace with actual data)
  const ratingData = {
    averageRating: artist?.average_rating || 4.5,
    totalReviews: 127,
    ratingDistribution: {
      5: 0.65,
      4: 0.20,
      3: 0.10,
      2: 0.03,
      1: 0.02,
    },
  };

  // Add scroll event listener to track scroll progress for the Header
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = currentScroll / totalScroll;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch artist/team details based on source route
  useEffect(() => {
    if (artist?.id) {
      if (sourceRoute === 'latestArtists') {
        fetchArtistDetails(artist.id);
      } else if (sourceRoute === 'team') {
        fetchTeamDetails(artist.id);
      } else {
        // For other navigation sources, just set loading to false
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [sourceRoute, artist?.id]);

  // Add body overflow control when video modal is open
  useEffect(() => {
    if (videoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [videoModalOpen]);

  // Function to fetch complete artist details by ID
  const fetchArtistDetails = async (artistId) => {
    setIsArtistLoading(true);
    try {
      const response = await fetch(`/api/search/artists/${artistId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch artist details');
      }
      
      const data = await response.json();
      setArtist(data);
      setIsArtistLoading(false);
    } catch (err) {
      console.error('Error fetching artist details:', err);
      setArtistError('Failed to load artist information');
      setIsArtistLoading(false);
    }
  };

  // Function to fetch complete team member details by ID
  const fetchTeamDetails = async (teamId) => {
    setIsArtistLoading(true);
    try {
      const response = await fetch(`/api/search/team/${teamId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch team member details');
      }
      
      const data = await response.json();
      setArtist(data);
      setIsArtistLoading(false);
    } catch (err) {
      console.error('Error fetching team member details:', err);
      setArtistError('Failed to load team member information');
      setIsArtistLoading(false);
    }
  };

  const handleBookNowClick = () => {
    if (user) {
      // If user is logged in, navigate directly to booking page
      navigate('/artists/booking', {
        state: {
          artist,
          user,
        },
      });
    } else {
      // If user is not logged in, show the auth modal
      setShowLoginModal(true);
    }
  };


  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const handleOpenSignUp = () => {
    setShowSignUpModal(true);
  };

  const handleOpenLogin = () => {
    setShowLoginModal(true);
  };

  // Video modal handlers
  const openVideoModal = (video, index) => {
    setCurrentVideo(video);
    setCurrentVideoIndex(index);
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setCurrentVideo(null);
  };

  const goToNextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
    setCurrentVideo(videos[nextIndex]);
  };
  
  const goToPrevVideo = () => {
    const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    setCurrentVideoIndex(prevIndex);
    setCurrentVideo(videos[prevIndex]);
  };

  // Simulate loading state for reviews section
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load reviews');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      question: 'All about Live101.',
      answer: 'Detailed information about Live101 services and platform...',
    },
    {
      question: 'All about Pre booking.',
      answer: 'Information about the pre-booking process...',
    },
    {
      question: 'All about post booking.',
      answer: 'Details about what happens after booking...',
    },
  ];

// Function to extract YouTube video ID
const extractYoutubeId = (url) => {
  let videoId = '';
  
  if (url.includes('youtube.com/shorts/')) {
    videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1].split('&')[0];
  }
  
  return videoId;
};


  // Refs for scroll functionality
  const galleryRef = useRef(null);
  const aboutRef = useRef(null);

  // Check if artist data is still loading or if there's an error
  if (isArtistLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">Loading information...</span>
      </div>
    );
  }

  if (artistError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{artistError}</p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Information not found</p>
      </div>
    );
  }

  const formatPrice = (price) => {
    return `₹${parseFloat(price).toLocaleString('en-IN')}`;
  };

  const formatSkills = (skills) => {
    return skills?.split(',').join(' • ');
  };

  // Function to process video URLs
  const processVideoUrls = () => {
    const videoFields = ['video1', 'video2', 'video3', 'video4', 'video5'];
    const processedVideos = [];

    videoFields.forEach((field) => {
      if (artist[field]) {
        // Check if it's a URL with comma (contains both video and thumbnail)
        if (artist[field].includes(',')) {
          const [videoUrl, thumbnailUrl] = artist[field].split(',').map(url => url.trim());
          processedVideos.push({ 
            videoUrl, 
            thumbnailUrl,
            isYoutube: false
          });
        } 
        // Check if it's a YouTube link
        else if (artist[field].includes('youtube.com') || artist[field].includes('youtu.be')) {
          processedVideos.push({ 
            videoUrl: artist[field], 
            thumbnailUrl: null, // YouTube videos will use iframe with default thumbnails
            isYoutube: true
          });
        } 
        // Regular video URL without thumbnail
        else {
          processedVideos.push({ 
            videoUrl: artist[field], 
            thumbnailUrl: null,
            isYoutube: false
          });
        }
      }
    });

    return processedVideos;
  };

  // Determine the images to display based on the source
  const images = sourceRoute === 'team' 
    ? [artist.profile_photo, artist.image1, artist.image2].filter(Boolean)
    : [artist.profile_photo, artist.image1, artist.image2].filter(Boolean);

  // Process videos
  const videos = processVideoUrls();

  // Determine name field based on source
  const name = sourceRoute === 'team' 
    ? artist.team_name
    : artist.name;

  // Event types for displaying tags
  const eventTypes = [
    'Private Event',
    'House Party',
    'Cafes & Lounges',
    'Hotels & Villas',
    'Wedding',
    'Corporate Event',
    'Social Event',
    'Virtual Event',
  ];

  // Scroll to section handler
  const scrollToSection = (section) => {
    setActiveTab(section);
    const ref = section === 'gallery' ? galleryRef : aboutRef;
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to render YouTube embed
  const renderYoutubeEmbed = (url) => {
    // Extract video ID from YouTube URL
    let videoId = '';
    
    if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    }
    
    if (!videoId) return null;
    
    return (
      <iframe
        className="w-full h-64 rounded-2xl"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <StaticHeader/>

      {/* Hero Section */}
<div className="max-w-7xl mx-auto px-4 py-6 pt-16">
  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start lg:h-fit">
    {/* Image Section */}
    <div className="w-full lg:w-3/5 h-[40vh] sm:h-[50vh] lg:h-fit rounded-lg overflow-hidden">
      <img
        src={sourceRoute === 'team' ? artist.profile_photo : artist.profile_photo}
        alt={name}
        className="w-full h-full lg:h-fit lg:max-h-[600px] object-cover rounded-lg"
        style={{ objectFit: 'cover', borderRadius: '10px' }}
      />
    </div>

    {/* Info Card */}
    <div className="w-full lg:w-2/5 lg:max-w-[520px] h-auto lg:h-fit bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg">
      <div className="space-y-3 sm:space-y-4 lg:space-y-5">
        {/* Artist/Team Name */}
        <div>
          <h1 className="text-lg sm:text-xl lg:text-3xl font-bold">
            {name}
          </h1>
        </div>

        {/* Rating */}
        {artist.average_rating && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    i < artist.average_rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
              {artist.average_rating} / 5
            </span>
          </div>
        )}

        {/* Price Per Hour */}
        <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
          <span>Rate:</span> {formatPrice(artist.price_per_hour || 0)} / hour
        </div>

        {/* Category */}
        <div className="flex items-start gap-2 text-sm sm:text-sm lg:text-base font-medium text-gray-700">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="block sm:inline">Category:</span>
            <span className="font-normal text-gray-600 block sm:inline sm:ml-1 break-words">
              {sourceRoute === 'team' ? artist.skill_category : artist.skill_category}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm sm:text-sm lg:text-base font-medium text-gray-700">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="block sm:inline">Location:</span>
            <span className="font-normal text-gray-600 block sm:inline sm:ml-1 break-words">
              {artist.address || 'Not specified'}
            </span>
          </div>
        </div>

        {/* Experience */}
        <div className="flex items-start gap-2 text-sm sm:text-sm lg:text-base font-medium text-gray-700">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="block sm:inline">Experience:</span>
            <span className="font-normal text-gray-600 block sm:inline sm:ml-1 break-words">
              {sourceRoute === 'team' ? `${artist.experience} years` : artist.about_yourself}
            </span>
          </div>
        </div>

        {/* No. of Past Bookings */}
        <div className="flex items-start gap-2 text-sm sm:text-sm lg:text-base font-medium text-gray-700">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="block sm:inline">No. of Past Bookings:</span>
            <span className="font-normal text-gray-600 block sm:inline sm:ml-1">
              {artist.no_of_bookings || 0}
            </span>
          </div>
        </div>

        {/* Skills */}
        {artist.skills && (
          <div className="text-xs sm:text-sm lg:text-sm text-gray-600">
            <span className="font-medium">Skills:</span>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
              {artist.skills?.split(',').map((skill, index) => (
                <div
                  key={index}
                  className="px-3 sm:px-4 lg:px-4 py-1.5 sm:py-2 bg-pink-100 text-pink-800 rounded-xl text-sm sm:text-base lg:text-sm">
                  {skill.trim()}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 pt-2 sm:pt-4 lg:pb-4">
          <button
            onClick={handleBookNowClick}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 text-sm sm:text-base font-medium">
            Book Now
          </button>
        </div>

       // Phone Authentication Modal
        {/* {showAuthModal && (
          <PhoneAuthModal artist={artist} onClose={() => setShowAuthModal(false)} />
        )} */}
      {showLoginModal && (
        <PhoneAuthModal
          artist={artist}
          onClose={handleCloseLoginModal}
          onOpenSignUp={handleOpenSignUp}
        />
      )}


        {/* Sign Up Modal */}
       {showSignUpModal && (
        <SignUpModal
          artist={artist}
          onClose={handleCloseSignUpModal}
          onOpenLogin={handleOpenLogin}
        />
       )}
      </div>
    </div>
  </div>
</div>

    {/* Message for the Host Section */}       
<div className="pt-5 max-w-7xl mx-auto px-4 sm:px-6">         
  <h2 className="text-xl sm:text-2xl font-bold mb-4">Message for the Host</h2>         
  <div className="bg-white text-gray-800 p-3 sm:p-4 rounded-2xl border border-gray-400">           
    <p className="text-base sm:text-lg">             
      {/* Message content goes here */}             
      Looking forward to the event!           
    </p>         
  </div>       
</div>

     {/* Gallery Section */}
{images.length > 0 && (
  <div ref={galleryRef} className="py-14 max-w-7xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-4">Gallery</h2>
    <div className="overflow-x-auto">
      <div className="flex gap-4 pb-4 min-w-max md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:min-w-0">
        {images.map((image, index) => (
          <img
            key={index}
            src={image || '/api/placeholder/400/400'}
            alt={`Image ${index + 1}`}
            className={`cursor-pointer flex-shrink-0 w-72 sm:w-80 md:w-full h-64 object-cover rounded-2xl ${
              selectedImage === index ? 'border-4 border-red-600' : ''
            }`}
            style={{
              marginRight: index === images.length - 1 ? '1rem' : '0'
            }}
            onClick={() => setSelectedImage(index)}
            onError={(e) => {
              e.target.src = '/api/placeholder/400/400';
            }}
          />
        ))}
      </div>
    </div>
  </div>
)}

      {/* Video Carousel Section */}
      {videos.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <h2 className="text-2xl font-bold mb-4">Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((video, index) => (
  <div key={index} className="rounded-lg overflow-hidden">
    {/* Change this part to show thumbnails for both regular and YouTube videos */}
    <div 
      className="relative cursor-pointer group" 
      onClick={() => openVideoModal(video, index)}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      {video.isYoutube ? (
        // For YouTube videos, show thumbnail
        <img 
          src={`https://img.youtube.com/vi/${extractYoutubeId(video.videoUrl)}/hqdefault.jpg`}
          alt="YouTube thumbnail" 
          className="w-full h-64 object-cover rounded-2xl"
          onError={(e) => {
            e.target.src = '/api/placeholder/400/320';
          }}
        />
      ) : (
        // For regular videos
        <img 
          src={video.thumbnailUrl || '/api/placeholder/400/320'} 
          alt="Video thumbnail" 
          className="w-full h-64 object-cover rounded-2xl"
          onError={(e) => {
            e.target.src = '/api/placeholder/400/320';
          }}
        />
      )}
    </div>
  </div>
))}
          </div>
        </div>
      )}

      {/* Video Modal */}
{/* Video Modal */}
{videoModalOpen && currentVideo && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
    <div className="relative w-full max-w-4xl">
      <button 
        onClick={closeVideoModal}
        className="absolute -top-12 right-0 text-white hover:text-red-500"
      >
        <X className="w-8 h-8" />
      </button>
      
      {/* Previous video button */}
      <button 
        onClick={goToPrevVideo}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white hover:text-red-500 bg-black bg-opacity-50 rounded-full p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Render YouTube iframe or regular video based on video type */}
      {currentVideo.isYoutube ? (
        <iframe
          key={`youtube-${currentVideoIndex}`}
          className="w-full rounded-lg shadow-lg"
          style={{ height: '80vh', maxHeight: '80vh' }}
          src={`https://www.youtube.com/embed/${extractYoutubeId(currentVideo.videoUrl)}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <video 
          key={`video-${currentVideoIndex}`} 
          controls 
          autoPlay
          className="w-full rounded-lg shadow-lg"
          style={{ maxHeight: '80vh' }}
        >
          <source src={currentVideo.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Next video button */}
      <button 
        onClick={goToNextVideo}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white hover:text-red-500 bg-black bg-opacity-50 rounded-full p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Video counter indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-1 rounded-full">
        {currentVideoIndex + 1} / {videos.length}
      </div>
    </div>
  </div>
)}

    {/* Reviews Section */}
      <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Reviews</h2>
        <div className="space-y-4">
          {isLoading ? (
            <p>Loading reviews...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6">
              {/* Ratings summary */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <div className="text-4xl sm:text-5xl font-bold text-gray-900">
                  {ratingData.averageRating}
                  <span className="text-base sm:text-lg text-gray-500"> / 5</span>
                </div>
                <div className="text-gray-700 text-base sm:text-lg">
                  Based on {ratingData.totalReviews} reviews
                </div>
              </div>

              {/* Rating breakdown */}
              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                {Object.keys(ratingData.ratingDistribution).map((rating) => (
                  <div key={rating} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-12 sm:w-1/6 text-right text-gray-700 font-medium text-sm sm:text-base">{rating} ⭐</div>
                    <div className="flex-1 sm:w-3/6 bg-gray-200 h-3 sm:h-4 rounded-full overflow-hidden">
                      <div
                        className="h-3 sm:h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                        style={{
                          width: `${ratingData.ratingDistribution[rating] * 100}%`,
                        }}></div>
                    </div>
                    <div className="w-12 sm:w-1/6 text-gray-700 font-medium text-sm sm:text-base">
                      {(ratingData.ratingDistribution[rating] * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>

              {/* See All Reviews Button */}
              <div className="mt-4 sm:mt-6 flex justify-center">
                <button className="px-4 sm:px-6 py-2 border border-black rounded-full text-black bg-white hover:bg-gray-100 transition text-sm sm:text-base">
                  See All Reviews
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Buttons */}
      <div className="flex gap-2 pt-4 px-4">
        <button
          onClick={handleBookNowClick}
          className="flex-1 px-6 sm:px-14 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 text-base sm:text-lg">
          Book Now
        </button>
      </div>

      {/* Phone Authentication Modal
      {showAuthModal && (
        <PhoneAuthModal artist={artist} onClose={() => setShowAuthModal(false)} />
      )} */}

      {showLoginModal && (
        <PhoneAuthModal
          artist={artist}
          onClose={handleCloseLoginModal}
          onOpenSignUp={handleOpenSignUp}
        />
      )}
       {/* Sign Up Modal */}
       {showSignUpModal && (
        <SignUpModal
          artist={artist}
          onClose={handleCloseSignUpModal}
          onOpenLogin={handleOpenLogin}
        />
       )}

      {/* FAQs Section */}
      <div className="py-12 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">FAQs</h2>
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
      <Footer/>
    </div>
  );
};

export default ArtistShowcase;