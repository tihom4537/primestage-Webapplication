import React, { useState } from 'react';
import { X, ChevronRight, HelpCircle, FileText, Shield, Users, MoreHorizontal, Music, UserPlus, Briefcase, Building, Handshake, PenSquare, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const cities = [
  { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
  { name: 'Mohali', lat: 30.7046, lng: 76.7179 },
  { name: 'Kharar', lat: 30.7460, lng: 76.6454 }
];

const NavigationMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Hardcoded Chandigarh coordinates
  const chandigarh = { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 };

  const navigationItems = [
    "SINGER",
    "DJ",
    "BAND",
    "ANCHOR",
    "INSTRUMENTALIST",
    "MAGICIAN",
    "COMEDIAN",
    "DANCERS"
  ];

  const supportItems = [
    { text: "Customer Support", icon: HelpCircle, path: "/contact-us" },
    { text: "FAQ", icon: FileText , path:"./FAQ" },
    { text: "Terms & Conditions", icon: Shield, path:"./term-conditions" },
    { text: "Company Policies", icon: Users, path:"./company-policies" },
    { text: "Refund Policy", icon: IndianRupee , path:"./refund-policy"},
  ];

  const registrationItems = [
    { text: "Register as an Artist", icon: Music },
    { text: "Join as a Team of Artists", icon: UserPlus },
  ];

  const handleSkillClick = async (skill) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/search/fetch-artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: chandigarh.lat,
          lng: chandigarh.lng,
          skill: skill
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch artists');
      }

      const data = await response.json();
      
      // Close the navigation menu
      setIsMenuOpen(false);
      
      // Navigate to search results
      navigate('/search',
         { state: { 
          artists: data,
          searchSkill: skill,
          searchCity: chandigarh.name
          } });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching artists:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSupportItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
      setIsMenuOpen(false);
    }
  };

  if (!isMenuOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/75 z-40 transition-opacity duration-300"
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Navigation Menu - Made responsive */}
      <div className="fixed inset-y-0 left-0 w-[85%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] bg-white z-50 overflow-y-auto shadow-lg">
        <div className="px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex justify-end">
            <button onClick={() => setIsMenuOpen(false)} className="p-2">
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
          
          {/* Loading indicator */}
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
              <div className="bg-white p-4 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-2 text-sm">Searching in Chandigarh...</p>
              </div>
            </div>
          )}
          
          {/* Error display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="text-sm">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="text-xs underline mt-1"
              >
                Dismiss
              </button>
            </div>
          )}

          <nav className="mt-6 sm:mt-8">
            {/* Main Navigation */}
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => handleSkillClick(item)}
                  className="block w-full py-3 sm:py-4 pl-3 sm:pl-4 text-lg sm:text-xl transition-all duration-300 group-hover:bg-gray-50 group-hover:pl-4 sm:group-hover:pl-6 text-left"
                >
                  <div className="flex items-center justify-between pr-3 sm:pr-4">
                    <span className="relative">
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 transition-all duration-300 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-gray-400" />
                  </div>
                </button>
                <div className="absolute inset-0 bg-gray-50 transform scale-x-0 origin-left transition-transform duration-300 -z-10 group-hover:scale-x-100"></div>
              </div>
            ))}
            
            {/* First Divider */}
            <div className="h-px bg-gray-200 mx-3 sm:mx-4 mt-3 sm:mt-4 mb-3 sm:mb-4"></div>
            
            {/* Support Navigation */}
            <div className="px-3 sm:px-4">
              {supportItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => handleSupportItemClick(item)}
                      className="block w-full py-2.5 sm:py-3 text-gray-600 transition-all duration-300 group-hover:text-gray-900 text-left"
                    >
                      <div className="flex items-center space-x-2.5 sm:space-x-3">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-sm sm:text-base relative">
                          {item.text}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Second Divider */}
            <div className="h-px bg-gray-200 mx-3 sm:mx-4 mt-3 sm:mt-4 mb-3 sm:mb-4"></div>

            {/* Registration Navigation */}
            <div className="px-3 sm:px-4">
              {registrationItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative group">
                    <button
                      className="block w-full py-2.5 sm:py-3 text-gray-600 transition-all duration-300 group-hover:text-gray-900 text-left"
                    >
                      <div className="flex items-center space-x-2.5 sm:space-x-3">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-sm sm:text-base relative">
                          {item.text}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;