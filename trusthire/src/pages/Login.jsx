import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/api';
import Button from '../components/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
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
      login(response.data.user, response.data.token);
      navigate(response.data.user.role === 'worker' ? '/worker-profile' : '/employee-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-2xl p-8 space-y-6 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-slate-300">Sign in to your TrustHire account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <span className="px-2 bg-white text-gray-500">New to TrustHire?</span>
            </div>
          </div>

          {/* Registration Option */}
          <button
            onClick={() => navigate('/worker-signup')}
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-3 rounded-lg transition duration-200 border border-blue-200"
          >
            Create Account
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

export default Login;
