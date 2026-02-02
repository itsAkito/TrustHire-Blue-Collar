import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../hooks/useAlert';
import { authService } from '../services/api';

const LoginWorker = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });
      login(response.data.user, response.data.token, response.data.user.role || 'worker');
      showSuccess('Login successful!', 'Welcome to TrustHire');
      // Navigate to home (which will redirect based on role)
      navigate('/');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMsg);
      showError(errorMsg, 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl">
                👷
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Worker Login</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
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
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">New here?</span>
            </div>
          </div>

          {/* Registration Link */}
          <button
            onClick={() => navigate('/worker-signup')}
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-3 rounded-lg transition duration-200 border border-blue-200"
          >
            Create Worker Account
          </button>

          {/* Back Button */}
          <button
            onClick={() => navigate('/role-selection')}
            className="w-full text-gray-600 hover:text-gray-800 font-semibold py-2 transition"
          >
            ← Back to Role Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginWorker;
