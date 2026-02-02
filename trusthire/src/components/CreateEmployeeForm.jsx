import React, { useState } from 'react';
import { adminService } from '../services/api';
import Button from './Button';

const CreateEmployeeForm = ({ onSuccess, onCancel }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    aadhaar: '',
    position: '',
    address: '',
    salary: '',
    joiningDate: '',
    status: 'active',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.aadhaar) {
      setError('Name, email, phone, and Aadhaar are required');
      return false;
    }
    if (!/^\d{12}$/.test(formData.aadhaar)) {
      setError('Aadhaar must be 12 digits');
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Phone number must be 10 digits');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email address');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.position) {
      setError('Position is required');
      return false;
    }
    if (formData.salary && isNaN(formData.salary)) {
      setError('Salary must be a valid number');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await adminService.createEmployee({
        ...formData,
        salary: formData.salary ? parseFloat(formData.salary) : null,
      });

      setSuccess('Employee created successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        aadhaar: '',
        position: '',
        address: '',
        salary: '',
        joiningDate: '',
        status: 'active',
      });
      setStep(1);

      setTimeout(() => {
        if (onSuccess) onSuccess(response.data.data);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Add New Employee</h2>
        <p className="text-gray-600">Fill in employee details {step === 1 ? '(Personal Info)' : '(Professional Info)'}</p>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 ? (
          <>
            {/* Step 1: Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-semibold text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter employee name"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-gray-700">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit phone number"
                  maxLength="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-gray-700">Aadhaar Number *</label>
                <input
                  type="text"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleInputChange}
                  placeholder="12-digit Aadhaar"
                  maxLength="12"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Next
              </Button>
              <Button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-semibold text-gray-700">Position *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g., Electrician, Plumber, Carpenter"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-gray-700">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="Monthly salary"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-gray-700">Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_leave">On Leave</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter employee address"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Employee'}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
