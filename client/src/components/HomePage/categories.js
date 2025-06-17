import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/artists', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch categories');
          }
      
          const data = await response.json();
          console.log(data);
          setCategories(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
    fetchCategories();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the categories section smoothly
    document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = async (category) => {
    try {
      // Similar to handleSearch in HeroSection, but using category name as the search term
      const response = await fetch('/api/search/fetch-artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skill: category.item_name ,// Using category name as search term
          lat: 30.7333,
          lng: 76.7794,
          
          // Note: We don't have lat/lng here as in HeroSection, you might want to add city selection
          // or use a default location
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch artists');
      }

      const data = await response.json();
      // Navigate to search page with the fetched artists
      navigate('/search', { 
        state: { 
          artists: data,
          searchSkill: category.item_name
        } 
      });
    } catch (err) {
      console.error('Error fetching artists by category:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal mb-4 sm:mb-6 md:mb-8">CATEGORIES</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div key={skeleton} className="animate-pulse rounded-xl overflow-hidden">
              <div className="bg-gray-200 h-28 sm:h-40 md:h-48 lg:h-56 xl:h-64 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div id="categories-section" className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-0">CATEGORIES</h2>
        <div className="text-xs sm:text-sm md:text-base text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, categories.length)} of {categories.length}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {currentCategories.map((category) => (
          <div 
            key={category.id} 
            className="relative group cursor-pointer rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={category.item_data}
                alt={category.item_name}
                className="w-full h-28 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.alt = 'Placeholder';
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
              <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 left-2 sm:left-4 md:left-6 lg:left-8">
                <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light truncate max-w-full">{category.item_name}</h3>
                <button className="text-white flex items-center space-x-1 sm:space-x-2 mt-1 sm:mt-2">
                  <span className="text-xs sm:text-sm md:text-base">Discover</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center items-center space-x-2 sm:space-x-3 md:space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 sm:p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto max-w-xs sm:max-w-none">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base transition-colors ${
                  currentPage === index + 1
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 sm:p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedCategories;