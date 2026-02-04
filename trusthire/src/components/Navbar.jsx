import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User, Home, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-1000 bg-black border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-white text-2xl font-bold hover:text-gray-300 transition-colors">
          <span className="text-3xl">💼</span>
          <span className="font-serif text-gray-100 tracking-wider">TrustHire</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 font-medium text-sm">
            <Home className="h-4 w-4" />
            Home
          </Link>

          {user ? (
            <>
              {user.role === 'worker' && (
                <>
                  <Link to="/worker-profile" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 font-medium text-sm">
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                </>
              )}

              {user.role === 'employer' && (
                <Link to="/employee-dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 font-medium text-sm">
                  <span>📊</span>
                  Dashboard
                </Link>
              )}

              {user.role === 'admin' && (
                <Link to="/admin-dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 font-medium text-sm">
                  <Settings className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}

              <div className="flex items-center gap-4 border-l border-gray-700 pl-8">
                <div className="flex flex-col">
                  <span className="text-gray-200 font-semibold text-sm">{user.name}</span>
                  <span className="text-gray-500 text-xs capitalize">{user.role}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all flex items-center gap-2 font-medium border border-gray-700 hover:border-gray-500"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all font-medium border border-gray-600 hover:border-gray-500"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
