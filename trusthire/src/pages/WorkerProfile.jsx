import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { workerService } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';

const WorkerProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await workerService.getProfile();
        setProfile(response.data);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'worker') {
      fetchProfile();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await workerService.updateProfile(formData);
      setProfile(response.data);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-secondary">Worker Profile</h1>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="primary"
          >
            Edit Profile
          </Button>
        )}
      </div>

      {error && <div className="error-message mb-6">{error}</div>}
      {successMessage && <div className="success-message mb-6">{successMessage}</div>}

      <div>
        {isEditing ? (
          <Card title="Edit Profile">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-semibold text-secondary">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-secondary">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-secondary">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-secondary">Skills</label>
                <textarea
                  name="skills"
                  value={formData.skills || ''}
                  onChange={handleInputChange}
                  placeholder="List your skills (comma-separated)"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-secondary">Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience || 0}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-secondary">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  variant="success"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(profile);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <Card title="Personal Information">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="text-gray-600">{profile?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Email:</span>
                  <span className="text-gray-600">{profile?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Phone:</span>
                  <span className="text-gray-600">{profile?.phone || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Experience:</span>
                  <span className="text-gray-600">{profile?.experience || 0} years</span>
                </div>
              </div>
            </Card>

            <Card title="Skills">
              <div className="flex flex-wrap gap-2">
                {profile?.skills ? (
                  profile.skills.split(',').map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">No skills added yet</p>
                )}
              </div>
            </Card>

            <Card title="Bio" className="md:col-span-2 lg:col-span-1">
              <p className="text-gray-600">{profile?.bio || 'No bio provided'}</p>
            </Card>

            <Card title="Rating" className="md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{'⭐'.repeat(Math.floor(profile?.rating || 0))}</span>
                <span className="text-2xl font-bold text-primary">{profile?.rating || 0} / 5</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerProfile;


