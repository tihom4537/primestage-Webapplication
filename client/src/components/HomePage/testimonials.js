import React from "react";

const MovingBoxes = () => {
  const imageData = [
    '/testimonial1.png',
    '/testimonial2.png', 
    '/testimonial3.PNG',
    '/testimonial4.png',
    '/testimonial5.png',
    '/testimonial6.PNG',
    '/placeholder7.jpg',
    '/placeholder8.jpg',
  ];

  const ImageItem = ({ src, index }) => (
    <div
      key={`image-${index}`}
      className="flex-shrink-0 w-48 h-60 sm:w-64 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-2 sm:mx-3 md:mx-4 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={src}
        alt={`Carousel image ${index + 1}`}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentNode.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          e.target.parentNode.innerHTML = `<div class="flex items-center justify-center h-full text-white text-sm font-medium">Image ${index + 1}</div>`;
        }}
      />
    </div>
  );

  return (
    <div className="bg-white py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-center text-gray-800 mb-8 sm:mb-12 px-4">
        Our Achievements
      </h2>
      <div className="overflow-hidden">
        <div className="flex animate-scroll">
          {/* First set of images */}
          {imageData.map((src, index) => (
            <ImageItem key={`set1-${index}`} src={src} index={index} />
          ))}
          {/* Second set for seamless loop */}
          {imageData.map((src, index) => (
            <ImageItem key={`set2-${index}`} src={src} index={index} />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .animate-scroll {
          animation: scroll 15s linear infinite;
          width: calc(200% + 32px); /* Accommodate for margins */
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Pause animation on hover */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        /* Responsive speed adjustments */
        @media (max-width: 640px) {
          .animate-scroll {
            animation-duration: 20s;
          }
        }
      `}</style>
    </div>
  );
};

export default MovingBoxes;