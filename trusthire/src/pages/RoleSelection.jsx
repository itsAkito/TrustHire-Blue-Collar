import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Shield } from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  const loginOptions = [
    {
      id: 'user',
      title: 'Regular User / Employer',
      description: 'Post jobs, manage applications, and find workers.',
      icon: '👔',
      gradient: 'from-blue-500 to-cyan-500',
      path: '/login',
      badge: 'Unified Login',
    },
    {
      id: 'worker',
      title: 'Blue Collar Worker',
      description: 'Find jobs, apply to opportunities, and build your career.',
      icon: '👷',
      gradient: 'from-green-500 to-emerald-500',
      path: '/login-worker',
      badge: 'Worker Access',
    },
    {
      id: 'admin',
      title: 'Admin Portal',
      description: 'Secure administrator access for platform management.',
      icon: '🔐',
      gradient: 'from-red-600 to-red-700',
      path: '/admin-login',
      badge: 'Admin Only',
      secure: true,
    },
  ];

  const signupOptions = [
    {
      id: 'user',
      title: 'Create User Account',
      description: 'Sign up as a regular user or employer.',
      icon: '👤',
      gradient: 'from-blue-500 to-cyan-500',
      path: '/user-signup',
      badge: 'New User',
    },
    {
      id: 'worker',
      title: 'Create Worker Account',
      description: 'Register as a blue collar professional.',
      icon: '🔨',
      gradient: 'from-green-500 to-emerald-500',
      path: '/worker-signup',
      badge: 'New Worker',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to TrustHire</h1>
          <p className="text-xl text-gray-300 mb-8">Choose how you want to connect</p>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <LogIn size={20} />
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/50'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <UserPlus size={20} />
              Sign Up
            </button>
          </div>
        </div>

        {/* Login Section */}
        {activeTab === 'login' && (
          <div className="mb-16 animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Login Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loginOptions.map((option) => (
                <div
                  key={option.id}
                  className="group relative"
                >
                  {option.secure && (
                    <div className="absolute -top-4 -right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10 shadow-lg">
                      <Shield size={14} />
                      {option.badge}
                    </div>
                  )}
                  <div
                    className={`bg-gradient-to-br ${option.gradient} p-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-full flex flex-col`}
                  >
                    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
                      <div className="text-6xl">{option.icon}</div>
                      <div>
                        <div className="text-sm font-semibold text-white opacity-75 mb-2 uppercase tracking-wider">
                          {option.badge}
                        </div>
                        <h3 className="text-2xl font-bold text-white text-center">{option.title}</h3>
                        <p className="text-white text-center text-sm mt-3 opacity-90">{option.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(option.path)}
                      className="w-full mt-6 bg-white text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
                    >
                      Login
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Signup Section */}
        {activeTab === 'signup' && (
          <div className="mb-16 animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Create Your Account</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {signupOptions.map((option) => (
                <div
                  key={option.id}
                  className="group"
                >
                  <div
                    className={`bg-gradient-to-br ${option.gradient} p-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-full flex flex-col`}
                  >
                    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
                      <div className="text-6xl">{option.icon}</div>
                      <div>
                        <div className="text-sm font-semibold text-white opacity-75 mb-2 uppercase tracking-wider">
                          {option.badge}
                        </div>
                        <h3 className="text-2xl font-bold text-white text-center">{option.title}</h3>
                        <p className="text-white text-center text-sm mt-3 opacity-90">{option.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(option.path)}
                      className="w-full mt-6 bg-white text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center mt-16 border-t border-gray-700 pt-8">
          <p className="text-gray-400 mb-4">Looking for something different?</p>
          <button
            onClick={() => navigate('/')}
            className="text-cyan-400 font-semibold hover:text-cyan-300 transition duration-200"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RoleSelection;
