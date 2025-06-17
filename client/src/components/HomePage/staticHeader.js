import React, { useState } from 'react';
import { Menu, User } from 'lucide-react';
import NavigationMenu from './Navigartion_menu';
import ProfileMenu from './Profile_menu';
import { useNavigate } from 'react-router-dom';

const StaticHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Handler for navigating to homepage
  const handleHomeNavigation = () => {
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsMenuOpen(true)} className="p-2">
                <Menu className="h-6 w-6 text-black" />
              </button>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleHomeNavigation}
                className="font-semibold text-black hover:text-gray-700 transition-colors duration-200"
                style={{ fontSize: '1.9rem', letterSpacing: '0.1rem' }}
              >
                PRIMESTAGE
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsProfileOpen(true)} className="p-2">
                <User className="h-6 w-6 text-black" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <NavigationMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <ProfileMenu isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
    </>
  );
};

export default StaticHeader;