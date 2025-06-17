import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, X, User, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const SignUpModal = ({ artist, onClose, onOpenLogin }) => {
  const [step, setStep] = useState('details'); // 'details' or 'otp'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // API configuration
  const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return phone.length === 10 && /^\d+$/.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form data
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePhone(formData.phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      // Send OTP for phone verification
      const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, {
        numbers: formData.phoneNumber
      });
     

      if (response.data.message === 'OTP sent successfully') {
        setStep('otp');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      // Verify OTP
      const verifyResponse = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
        numbers: formData.phoneNumber,
        otp: otp
      });
      console.log('sigh is cool');
      console.log(verifyResponse);
      console.log('aman is goat');

      if (verifyResponse.data.message === 'OTP verified successfully') {
        console.log('bhdhbv jnjnfkvkj,nkvn');
        // Create user account
        const signUpResponse = await axios.post(`${API_BASE_URL}/signup/user`, {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phoneNumber,
          fcm_token: 'mohit here' // Add your FCM token here
        });
        console.log(signUpResponse);
        console.log("cool");

        if (signUpResponse.data.message === 'User created successfully') {
          // Automatically log the user in after successful signup
          const userData = signUpResponse.data.user;
          const authToken = signUpResponse.data.token;
          login(userData, authToken);
          
          navigate('/artists/booking', { 
            state: { 
              artist,
              user: userData
            }
          });
        } else {
          setError('Failed to create account. Please try again.');
        }
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to verify OTP or create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    onClose();
    onOpenLogin();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Sign Up to Book {artist.name}</h2>
          <p className="text-gray-600 mt-2">
            {step === 'details' 
              ? 'Create your account to continue' 
              : 'Enter the OTP sent to your phone'}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 'details' ? (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                maxLength={10}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">
                OTP sent to {formData.phoneNumber}
              </p>
            </div>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-center"
              maxLength={6}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Verify & Create Account'}
            </button>
          </form>
        )}

        {/* Login Option */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <button
              onClick={handleLoginClick}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;