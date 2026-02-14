import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../hooks/useAlert';
import { authService } from '../services/api';
import Button from '../components/Button';

const EmployerSignup = () => {
  const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const { login } = useAuth();
  const { showSuccess, showError } = useAlert();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.companyName || !formData.password) {
      showError('All fields are required', 'Validation Error');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match', 'Password Mismatch');
      return false;
    }
    if (formData.password.length < 6) {
      showError('Password must be at least 6 characters', 'Password Too Short');
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      showError('Phone number must be 10 digits', 'Invalid Phone');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showError('Invalid email address', 'Invalid Email');
      return false;
    }
    return true;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: 'employer',
        companyName: formData.companyName,
      });

      showSuccess('Registration successful! Check your email for OTP.', 'Registration Complete');
      setSuccess('Registration successful! Check your email for OTP.');
      setStep(2);
      startResendTimer();
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMsg);
      showError(errorMsg, 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    try {
      await authService.resendOTP(formData.email);
      setSuccess('OTP resent to your email');
      startResendTimer();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.verifyOTP({
        email: formData.email,
        otp: otp,
      });

      // Now login the user
      const loginResponse = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      showSuccess('Email verified successfully! Please log in to your account.', 'Signup Complete');
      setSuccess('Email verified successfully! Please log in to your account.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl">
                💼
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Employer Registration</h1>
            <p className="text-gray-600">
              {step === 1 ? 'Create your employer account' : 'Verify your email'}
            </p>
          </div>

          {step === 1 ? (
            // Registration Form
            <form onSubmit={handleRegistration} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="company@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Company Ltd."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registering...' : 'Create Account'}
              </button>
            </form>
          ) : (
            // OTP Verification Form
            <form onSubmit={handleOTPVerification} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm">
                <p>We've sent a 6-digit OTP to <strong>{formData.email}</strong></p>
              </div>

              {/* OTP Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.slice(0, 6));
                    setError('');
                  }}
                  required
                  placeholder="000000"
                  maxLength="6"
                  pattern="[0-9]{6}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition text-center text-2xl tracking-widest"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-gray-600 text-sm">
                    Resend OTP in <strong>{resendTimer}s</strong>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-purple-600 hover:text-purple-700 font-semibold text-sm transition disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Navigation Links */}
          <div className="space-y-2 border-t pt-4">
            <button
              onClick={() => {
                if (step === 2) setStep(1);
                else navigate('/login-employer');
              }}
              className="w-full text-purple-600 hover:text-purple-700 font-semibold py-2 transition text-sm"
            >
              {step === 2 ? '← Back to Registration' : 'Already have an account? Login'}
            </button>
            <button
              onClick={() => navigate('/role-selection')}
              className="w-full text-gray-600 hover:text-gray-800 font-semibold py-2 transition text-sm"
            >
              ← Back to Role Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignup;
