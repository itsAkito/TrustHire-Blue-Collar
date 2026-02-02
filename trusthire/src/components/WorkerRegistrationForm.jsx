import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { workerService } from '../services/api';
import Button from './Button';

const WorkerRegistrationForm = ({ isEditing = false, initialData = null, onSuccess, onCancel }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState(initialData || {
    name: '',
    phone: '',
    aadhaar: '',
    maritalStatus: 'single',
    profilePhoto: null,
    profilePhotoPreview: null,
    skills: '',
    experience: 0,
    bio: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setError('Only JPG, PNG, and GIF formats are allowed');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePhoto: file,
          profilePhotoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const validateForm = () => {
    if (!formData.name && !isEditing) {
      setError('Name is required');
      return false;
    }
    if (!isEditing && (!formData.phone || !/^\d{10}$/.test(formData.phone))) {
      setError('Phone number must be 10 digits');
      return false;
    }
    if (!isEditing && (!formData.aadhaar || !/^\d{12}$/.test(formData.aadhaar))) {
      setError('Aadhaar must be 12 digits');
      return false;
    }
    if (formData.experience && isNaN(formData.experience)) {
      setError('Experience must be a valid number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare form data for submission
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('phone', formData.phone);
      submitData.append('aadhaar', formData.aadhaar);
      submitData.append('maritalStatus', formData.maritalStatus);
      submitData.append('skills', formData.skills);
      submitData.append('experience', formData.experience);
      submitData.append('bio', formData.bio);
      submitData.append('address', formData.address);
      
      if (formData.profilePhoto) {
        submitData.append('profilePhoto', formData.profilePhoto);
      }

      let response;
      if (isEditing) {
        response = await workerService.updateProfile(submitData);
        setSuccess('Profile updated successfully!');
      } else {
        response = await workerService.createWorkerProfile(submitData);
        setSuccess('Worker profile created successfully!');
      }

      setFormData({
        name: '',
        phone: '',
        aadhaar: '',
        maritalStatus: 'single',
        profilePhoto: null,
        profilePhotoPreview: null,
        skills: '',
        experience: 0,
        bio: '',
        address: '',
      });

      setTimeout(() => {
        if (onSuccess) onSuccess(response.data.data);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save worker profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 max-w-3xl mx-auto">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Update Worker Profile' : 'Worker Registration Form'}
        </h2>
        <p className="text-gray-600">Complete your professional profile details</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-gray-700">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                disabled={isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-gray-700">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit phone number"
                maxLength="10"
                disabled={isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-gray-700">Aadhaar Number *</label>
              <input
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleInputChange}
                placeholder="12-digit Aadhaar number"
                maxLength="12"
                disabled={isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-gray-700">Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Profile Photo Upload */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">Profile Photo</label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                  <span className="text-blue-600 font-semibold">Choose Image</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              {formData.profilePhotoPreview && (
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={formData.profilePhotoPreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">Max file size: 5MB. Supported: JPG, PNG, GIF</p>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your complete address"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Professional Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Professional Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-gray-700">Years of Experience</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 5"
                min="0"
                max="70"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">Skills</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="List your skills separated by commas (e.g., Electrical wiring, Plumbing, HVAC repair)"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">Professional Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about your professional background and experience"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-6 border-t">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (isEditing ? 'Updating...' : 'Creating Profile...') : (isEditing ? 'Update Profile' : 'Create Profile')}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkerRegistrationForm;
