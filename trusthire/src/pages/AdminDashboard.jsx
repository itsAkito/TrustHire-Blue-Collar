import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-10 space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-4xl">
              ⚙️
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome, Admin! Manage the platform here.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">Users</div>
            <div className="text-4xl font-extrabold">--</div>
            <div className="text-sm text-gray-500">Total Registered Users</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">Jobs</div>
            <div className="text-4xl font-extrabold">--</div>
            <div className="text-sm text-gray-500">Total Jobs Posted</div>
          </div>
          <div className="bg-orange-100 border border-orange-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-orange-700 mb-2">Workers</div>
            <div className="text-4xl font-extrabold">--</div>
            <div className="text-sm text-gray-500">Total Workers</div>
          </div>
          <div className="bg-red-100 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-red-700 mb-2">Employers</div>
            <div className="text-4xl font-extrabold">--</div>
            <div className="text-sm text-gray-500">Total Employers</div>
          </div>
        </div>
        <div className="text-center">
          <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200">View Platform Stats</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
