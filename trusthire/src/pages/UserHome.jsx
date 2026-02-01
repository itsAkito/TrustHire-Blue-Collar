import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { workerService, employerService } from '../services/api';
import UserProfileCard from '../components/UserProfileCard';
import Button from '../components/Button';
import './UserHome.css';

const UserHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        let response;
        
        if (user?.role === 'worker') {
          response = await workerService.getProfile();
        } else if (user?.role === 'employer') {
          response = await employerService.getProfile();
        } else {
          setUserDetails(user);
          setLoading(false);
          return;
        }

        setUserDetails(response.data);
      } catch (err) {
        console.error('Failed to fetch user details:', err);
        setError('Failed to load user details');
        // Fallback to auth user
        setUserDetails(user);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const handleEditProfile = () => {
    if (user?.role === 'worker') {
      navigate('/worker-profile');
    } else if (user?.role === 'employer') {
      navigate('/employer-profile');
    }
  };

  const handleViewProfile = () => {
    if (user?.role === 'worker') {
      navigate('/worker-profile');
    } else if (user?.role === 'employer') {
      navigate('/employer-dashboard');
    }
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  if (loading) {
    return (
      <div className="user-home-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-home-container">
      <div className="user-home-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, {userDetails?.name || 'User'}!</h1>
          <p className="welcome-subtitle">Here's your profile overview</p>
        </div>

        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* User Profile Card */}
        <div className="profile-card-section">
          <UserProfileCard 
            user={userDetails}
            onEdit={handleEditProfile}
            onViewProfile={handleViewProfile}
          />
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2 className="section-heading">Quick Actions</h2>
          <div className="actions-grid">
            {user?.role === 'worker' ? (
              <>
                <button 
                  className="action-card"
                  onClick={() => handleNavigation('/jobs')}
                >
                  <div className="action-icon">🔍</div>
                  <h3>Browse Jobs</h3>
                  <p>Find available job opportunities</p>
                </button>
                <button 
                  className="action-card"
                  onClick={() => handleNavigation('/worker-applications')}
                >
                  <div className="action-icon">📋</div>
                  <h3>My Applications</h3>
                  <p>Track your job applications</p>
                </button>
                <button 
                  className="action-card"
                  onClick={() => handleNavigation('/worker-reviews')}
                >
                  <div className="action-icon">⭐</div>
                  <h3>Reviews</h3>
                  <p>See your ratings and reviews</p>
                </button>
                <button 
                  className="action-card"
                  onClick={() => handleNavigation('/earnings')}
                >
                  <div className="action-icon">💰</div>
                  <h3>Earnings</h3>
                  <p>View your earnings history</p>
                </button>
              </>
            ) : (
              <>
                <button 
                  className="action-card"
                  onClick={() => handleNavigation('/post-job')}
                >
                  <div className="action-icon">➕</div>
                  <h3>Post a Job</h3>
                  <p>Create a new job posting</p>
                </button>
                <button 
                  className="action-card"
                  onClick={() => handleNavigation('/employer-jobs')}
                >
                  <div className="action-icon">📊</div>
                  <h3>My Jobs</h3>
                  <p>Manage your job postings</p>
                </button>
                <button 
                  className="action-card"
                  onClick={() => handleNavigation('/employer-applications')}
                >
                  <div className="action-icon">👥</div>
                  <h3>Applications</h3>
                  <p>Review worker applications</p>
                </button>
                <button 
                  className="action-card"
                  onClick={() => handleNavigation('/employer-workers')}
                >
                  <div className="action-icon">🔗</div>
                  <h3>Workers</h3>
                  <p>View your hired workers</p>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <h2 className="section-heading">Your Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{userDetails?.rating ? userDetails.rating.toFixed(1) : '0'}</div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userDetails?.experience || 0}</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userDetails?.verified ? '✓' : '✗'}</div>
              <div className="stat-label">Verification</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userDetails?.jobsCompleted || 0}</div>
              <div className="stat-label">Jobs Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
