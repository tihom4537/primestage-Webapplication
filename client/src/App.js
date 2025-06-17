// Add this near the top of client/src/index.js (before any React imports)
// Your existing React imports and render code below...
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SearchResults from './components/SearchResults/SearchResults'; // You'll need to update this path based on where you save the SearchResults component
import ArtistShowcase from './components/ArtistShowcase';
import BookingDetails from './components/Booking';
import { AuthProvider } from './context/AuthContext';
import CompanyPoliciesPage from './components/HomePage/comanyPolicy';
import TermAndCondition from './components/HomePage/termsAndCondition';
import RefundPolicy from './components/HomePage/refundPolicy';
import BookingsAndPerformancePage from './components/HomePage/Shipping_delivery';
import ContactUsPage from './components/HomePage/contact_us';
import  AllBookings from './components/all_bookings';
import  CustomizeSoundSystemPage from './components/sound_system';
import SoundDetails from './components/sound_booking';
import FAQPage from './components/HomePage/fAQ';


import ChandigarhSingerSearchResults from './components/SearchCollection/chandigarh-singer-search';
import ChandigarhInstrumentalistSearchResults from './components/SearchCollection/chandigarh-instrumentalist-search';
import ChandigarhDJSearchResults from './components/SearchCollection/chandigarh-DJ-search';
import ChandigarhBandSearchResults from './components/SearchCollection/chandigarh-band-search';

import MohaliSingerSearchResults from './components/SearchCollection/mohali-singer-search';
import MohaliInstrumentalistSearchResults from './components/SearchCollection/mohali-instrumentalist-search';
import MohaliDJSearchResults from './components/SearchCollection/mohali-DJ-search';
import MohaliBandSearchResults from './components/SearchCollection/mohali-band-search';

import PanchkulaSingerSearchResults from './components/SearchCollection/panchkula-singer-search';
import PanchkulaInstrumentalistSearchResults from './components/SearchCollection/panchkula-instrumentalist-search';
import PanchkulaDJSearchResults from './components/SearchCollection/panchkula-DJ-search';
import PanchkulaBandSearchResults from './components/SearchCollection/panchkula-band-search';

window.onbeforeunload = function() {
  console.log("Page is attempting to reload!");
  return "Are you sure you want to leave?";
};

function App() {
  return (
     <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/artists/:id" element={<ArtistShowcase />} />
        <Route path="/artists/booking" element={<BookingDetails />} />
        <Route path="/company-policies" element={<CompanyPoliciesPage />} />
         <Route path="/search/company-policies" element={<CompanyPoliciesPage />} />
        <Route path="/term-conditions" element={< TermAndCondition />} />
        <Route path="/search/term-conditions" element={< TermAndCondition />} />
        <Route path="/search/refund-policy" element={< RefundPolicy />} />
         <Route path="/refund-policy" element={< RefundPolicy />} />
        <Route path="/search/Shipping-delivery" element={< BookingsAndPerformancePage/>} />
        <Route path="/contact-us" element={<ContactUsPage/>} />
        <Route path="/all-bookings" element={<AllBookings/>} />
        <Route path="/sound-system" element={<CustomizeSoundSystemPage/>} />
        <Route path="/sound-booking" element={<SoundDetails/>} />
        <Route path="/FAQ" element={<FAQPage/>} />
       




        <Route path="/live/singer" element={<ChandigarhSingerSearchResults />} />
        <Route path="/live/instrumentalist" element={<ChandigarhInstrumentalistSearchResults  />} />
        <Route path="/live/DJ" element={<ChandigarhDJSearchResults />} />
        <Route path="/live/band" element={<ChandigarhBandSearchResults />} />

        <Route path="/live/singer/mohali" element={<MohaliSingerSearchResults />} />
        <Route path="/live/instrumentalist/mohali" element={<MohaliInstrumentalistSearchResults/>} />
         <Route path="/live/DJ/mohali" element={<MohaliDJSearchResults />} />
         <Route path="/live/band/mohali" element={<MohaliBandSearchResults  />} />

          <Route path="/live/singer/panchkula" element={<PanchkulaSingerSearchResults />} />
        <Route path="/live/instrumentalist/panchkula" element={<PanchkulaInstrumentalistSearchResults/>} />
         <Route path="/live/DJ/panchkula" element={<PanchkulaDJSearchResults />} />
         <Route path="/live/band/panchkula" element={<PanchkulaBandSearchResults />} />
         
      
      </Routes>
    </BrowserRouter>
     </AuthProvider>
  );
}

export default App;