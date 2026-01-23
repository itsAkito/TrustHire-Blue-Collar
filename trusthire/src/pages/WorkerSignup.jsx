import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const categories = [
  'Maid',
  'Cook',
  'Driver',
  'Security',
  'Gardener',
  'Babysitter',
  'Other',
];

const WorkerSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadhaar: '',
    category: '',
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      await authService.registerWorker(data);
      setSuccess('Account created successfully! Please login.');
      setTimeout(() => navigate('/login-worker'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl">
                👷
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Worker Registration</h1>
            <p className="text-gray-600">Create your worker account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required pattern="[0-9]{10}" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Aadhaar Number</label>
              <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} required pattern="[0-9]{12}" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Photo</label>
              <input type="file" name="photo" accept="image/*" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
            {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? 'Registering...' : 'Register'}</button>
          </form>
          <button onClick={() => navigate('/login-worker')} className="w-full text-gray-600 hover:text-gray-800 font-semibold py-2 transition">Already have an account? Login</button>
          <button onClick={() => navigate('/role-selection')} className="w-full text-gray-600 hover:text-gray-800 font-semibold py-2 transition">← Back to Role Selection</button>
        </div>
      </div>
    </div>
  );
};

export default WorkerSignup;
