import React from 'react';
import Button from './Button';
import './UserProfileCard.css';

const UserProfileCard = ({ user, onEdit, onViewProfile }) => {
  if (!user) return null;

  const skills = user.skills ? (typeof user.skills === 'string' ? user.skills.split(',') : user.skills) : [];

  return (
    <div className="user-profile-card">
      <div className="user-card-header">
        <div className="user-card-image">
          {user.profilePhoto ? (
            <img src={user.profilePhoto} alt={user.name} className="profile-img" />
          ) : (
            <div className="profile-img-placeholder">
              <span className="placeholder-text">{user.name?.charAt(0).toUpperCase()}</span>
            </div>
          )}
          {user.verified && <div className="verified-badge">✓</div>}
        </div>

        <div className="user-info-section">
          <div className="user-name-rating">
            <h2 className="user-name">{user.name}</h2>
            {user.rating > 0 && (
              <div className="rating-section">
                <span className="rating-value">{user.rating.toFixed(1)}</span>
                <span className="rating-stars">★★★★★</span>
              </div>
            )}
          </div>

          <div className="user-badges">
            {user.verified && <span className="badge badge-verified">Verified</span>}
            {user.role && <span className="badge badge-role">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>}
          </div>

          <p className="user-phone">
            <span className="icon">📱</span> {user.phone || 'Not provided'}
          </p>
        </div>
      </div>

      <div className="user-card-body">
        {user.bio && (
          <div className="bio-section">
            <h3 className="section-title">Bio</h3>
            <p className="bio-text">{user.bio}</p>
          </div>
        )}

        {skills.length > 0 && (
          <div className="skills-section">
            <h3 className="section-title">Skills</h3>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="experience-section">
          <div className="exp-item">
            <span className="exp-label">Experience</span>
            <span className="exp-value">{user.experience || 0} years</span>
          </div>
          <div className="exp-item">
            <span className="exp-label">Jobs Completed</span>
            <span className="exp-value">{user.jobsCompleted || 0}</span>
          </div>
        </div>
      </div>

      <div className="user-card-footer">
        <Button 
          variant="primary" 
          onClick={onEdit}
          className="btn-edit"
        >
          Edit Profile
        </Button>
        {onViewProfile && (
          <Button 
            variant="outline" 
            onClick={onViewProfile}
            className="btn-view"
          >
            View Full Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
