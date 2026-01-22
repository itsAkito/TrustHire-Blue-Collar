import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-1000 bg-secondary shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-white text-2xl font-bold">
          <span className="text-3xl">💼</span>
          TrustHire
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="text-gray-200 hover:text-primary transition-colors">
            Home
          </Link>

          {user ? (
            <>
              {user.role === 'worker' && (
                <Link to="/worker-profile" className="text-gray-200 hover:text-primary transition-colors">
                  Profile
                </Link>
              )}

              {user.role === 'employer' && (
                <Link to="/employee-dashboard" className="text-gray-200 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              )}

              <span className="text-gray-200 font-medium">Welcome, {user.name}</span>

              <button 
                onClick={handleLogout} 
                className="bg-danger text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
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
