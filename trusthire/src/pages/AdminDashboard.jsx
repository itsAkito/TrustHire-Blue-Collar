import React, { useState, useEffect } from 'react';
import { useAlert } from '../hooks/useAlert';
import { Bell, Users, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';
import CreateEmployeeForm from '../components/CreateEmployeeForm';

const AdminDashboard = () => {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const { showSuccess, showError, showInfo } = useAlert();
  const [recentNotifications, setRecentNotifications] = useState([]);

  // Simulate real-time notifications
  useEffect(() => {
    const notifications = [
      { id: 1, type: 'worker_signup', message: 'New worker registered', details: 'Email: worker@example.com', time: '2 mins ago' },
      { id: 2, type: 'job_posted', message: 'New job posted', details: 'Title: Senior Developer', time: '5 mins ago' },
      { id: 3, type: 'application', message: 'New job application', details: 'From: John Doe', time: '10 mins ago' },
    ];
    setRecentNotifications(notifications);
  }, []);

  const handleEmployeeCreated = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    setShowEmployeeForm(false);
    showSuccess(`Employee ${newEmployee.name} added successfully!`, 'Employee Created');
  };

  const handleNotificationClick = (notification) => {
    if (notification.type === 'worker_signup') {
      showInfo(notification.details, 'New Worker Registration');
    } else if (notification.type === 'job_posted') {
      showInfo(notification.details, 'New Job Posted');
    } else if (notification.type === 'application') {
      showInfo(notification.details, 'New Application');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome, Admin! Manage the platform here.</p>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-4xl shadow-lg">
              ⚙️
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">Users</div>
                  <div className="text-4xl font-extrabold text-gray-800">--</div>
                  <div className="text-sm text-gray-500 mt-1">Total Registered Users</div>
                </div>
                <Users className="h-8 w-8 text-orange-500 opacity-50" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-bold text-red-600 mb-2">Jobs</div>
                  <div className="text-4xl font-extrabold text-gray-800">--</div>
                  <div className="text-sm text-gray-500 mt-1">Total Jobs Posted</div>
                </div>
                <Briefcase className="h-8 w-8 text-red-500 opacity-50" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-bold text-orange-700 mb-2">Workers</div>
                  <div className="text-4xl font-extrabold text-gray-800">--</div>
                  <div className="text-sm text-gray-500 mt-1">Total Workers</div>
                </div>
                <Users className="h-8 w-8 text-orange-600 opacity-50" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-bold text-red-700 mb-2">Employers</div>
                  <div className="text-4xl font-extrabold text-gray-800">--</div>
                  <div className="text-sm text-gray-500 mt-1">Total Employers</div>
                </div>
                <Briefcase className="h-8 w-8 text-red-600 opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Notifications Section */}
        <div className="mt-10 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-6 w-6 text-orange-600" />
            <h2 className="text-3xl font-bold text-gray-800">Real-time Notifications</h2>
            <span className="ml-auto bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full">
              {recentNotifications.length} new
            </span>
          </div>
          <div className="space-y-3">
            {recentNotifications.length > 0 ? (
              recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200 hover:border-orange-400 cursor-pointer transition hover:shadow-md"
                >
                  <div className="flex-shrink-0 mt-1">
                    {notification.type === 'worker_signup' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {notification.type === 'job_posted' && (
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    )}
                    {notification.type === 'application' && (
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{notification.message}</p>
                    <p className="text-sm text-gray-600">{notification.details}</p>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No notifications at the moment</p>
              </div>
            )}
          </div>
        </div>

        {/* Employee Management Section */}
        {!showEmployeeForm ? (
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Employee Management</h2>
                <p className="text-gray-600 mt-1">Create and manage employee records</p>
              </div>
              <button
                onClick={() => setShowEmployeeForm(true)}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md"
              >
                + Add New Employee
              </button>
            </div>

            {/* Employee List */}
            {employees.length > 0 ? (
              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gradient-to-r from-orange-100 to-red-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Position</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee, index) => (
                      <tr key={index} className="border-t hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-800">{employee.name}</td>
                        <td className="px-6 py-4 text-gray-600">{employee.email}</td>
                        <td className="px-6 py-4 text-gray-600">{employee.phone}</td>
                        <td className="px-6 py-4 text-gray-600">{employee.position || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            employee.status === 'active' ? 'bg-green-100 text-green-800' :
                            employee.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                            employee.status === 'on_leave' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-orange-600 hover:text-orange-800 font-semibold mr-4">Edit</button>
                          <button className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-gray-600 text-lg">No employees added yet. Click the button above to create one!</p>
              </div>
            )}
          </div>
        ) : (
          <CreateEmployeeForm
            onSuccess={handleEmployeeCreated}
            onCancel={() => setShowEmployeeForm(false)}
          />
        )}

        {/* Additional Actions */}
        <div className="mt-10 text-center">
          <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
            View Platform Stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
