import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-4 md:py-8">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-medium mb-4 text-xl">HELP</h4>
            <ul className="space-y-2">
              <li><a href="./contact-us" className="hover:underline text-lg">Contact Us</a></li>
              <li><a href="./FAQ" className="hover:underline text-lg">FAQs</a></li>
              <li><a href="./term-conditions" className="hover:underline text-lg">Terms & Conditions</a></li>
              <li><a href="./company-policies" className="hover:underline text-lg">Privacy Policy</a></li>
              <li><a href="./refund-policy" className="hover:underline text-lg">Cancellation and Refund</a></li>
              <li><a href="./Shipping-delivery" className="hover:underline text-lg">Shipping and Delivery</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-xl">SERVICES</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline text-lg">Singers</a></li>
              <li><a href="#" className="hover:underline text-lg">Sound System</a></li>
              <li><a href="#" className="hover:underline text-lg">Anchors</a></li>
              <li><a href="#" className="hover:underline text-lg">Dancers</a></li>
              <li><a href="#" className="hover:underline text-lg">Magicians</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-xl">FOLLOW US</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline text-lg">Instagram</a></li>
              <li><a href="#" className="hover:underline text-lg">Facebook</a></li>
              <li><a href="#" className="hover:underline text-lg">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-xl">ARTIST REGISTRATION</h4>
            <ul className="space-y-2">
              <li><a href="https://primestage.in/" className="hover:underline text-lg">Register as Solo Artist</a></li>
              <li><a href="https://primestage.in/" className="hover:underline text-lg">Register as Team of Artists</a></li>
            </ul>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* 1st - Artist Registration */}
          <div>
            <h4 className="font-medium mb-2 text-lg">ARTIST REGISTRATION</h4>
            <ul className="space-y-1">
              <li><a href="https://primestage.in/" className="hover:underline text-base">Register as Solo Artist</a></li>
              <li><a href="https://primestage.in/" className="hover:underline text-base">Register as Team of Artists</a></li>
            </ul>
          </div>

          {/* 2nd - Help */}
          <div>
            <h4 className="font-medium mb-2 text-lg">HELP</h4>
            <ul className="space-y-1">
              <li><a href="./contact-us" className="hover:underline text-base">Contact Us</a></li>
              <li><a href="#" className="hover:underline text-base">FAQs</a></li>
              <li><a href="./term-conditions" className="hover:underline text-base">Terms & Conditions</a></li>
              <li><a href="./company-policies" className="hover:underline text-base">Privacy Policy</a></li>
              <li><a href="./refund-policy" className="hover:underline text-base">Cancellation and Refund</a></li>
              <li><a href="./Shipping-delivery" className="hover:underline text-base">Shipping and Delivery</a></li>
            </ul>
          </div>

          {/* 3rd - Services and Follow Us side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 text-lg">SERVICES</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline text-base">Singers</a></li>
                <li><a href="#" className="hover:underline text-base">Sound System</a></li>
                <li><a href="#" className="hover:underline text-base">Anchors</a></li>
                <li><a href="#" className="hover:underline text-base">Dancers</a></li>
                <li><a href="#" className="hover:underline text-base">Magicians</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-lg">FOLLOW US</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline text-base">Instagram</a></li>
                <li><a href="#" className="hover:underline text-base">Facebook</a></li>
                <li><a href="#" className="hover:underline text-base">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mx-2 md:mx-4">
        <div className="container mx-auto px-2 md:px-4 py-3 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            
            {/* Mobile Order: 1st - Try Our App Section */}
            <div className="order-1 md:order-2">
              <h4 className="font-medium mb-3 md:mb-6 text-lg md:text-xl">FOR BETTER EXPERIENCE TRY OUR APP</h4>
              <div className="flex flex-col space-y-3 md:space-y-2">
                {/* App Store */}
                <a
                  href="https://primestage.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src="/5a902db97f96951c82922874.png"
                    alt="Download on the App Store"
                    className="cursor-pointer hover:opacity-80 transition-opacity h-12 md:h-14 w-auto"
                  />
                </a>
                {/* Google Play */}
                <a
                  href="https://primestage.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src="/5a902dbf7f96951c82922875.png"
                    alt="Get it on Google Play"
                    className="cursor-pointer hover:opacity-80 transition-opacity h-16 md:h-18 w-auto"
                  />
                </a>
              </div>
            </div>

            {/* Mobile Order: 2nd - Company Address with Logo */}
            <div className="order-2 md:order-1">
              {/* Logo */}
              <div className="mb-3 md:mb-6">
                <img
                  src="/Screenshot 2025-02-16 at 12.20.51 PM.JPEG"
                  alt="Company Logo"
                  className="h-10 md:h-12"
                />
              </div>

              {/* Company Address */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="font-medium mb-2 md:mb-4 text-lg md:text-xl">COMPANY ADDRESS</h4>
                <div className="flex items-start space-x-2 text-gray-600">
                  <MapPin className="w-5 h-5 md:w-5 md:h-5 mt-1 flex-shrink-0" />
                  <p className="text-base md:text-lg">
                    Salogra, Solan<br />
                    Himachal Pradesh, 173212 India
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-5 h-5 md:w-5 md:h-5" />
                  <p className="text-base md:text-lg">+91 9588179288 / 8538948208</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-5 h-5 md:w-5 md:h-5" />
                  <p className="text-base md:text-lg">support@primestage.in</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-2 md:px-4 py-2 md:py-4">
          <p className="text-base md:text-lg text-gray-600 text-center">
            © {new Date().getFullYear()} PrimeStage Live Pvt Lmt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;