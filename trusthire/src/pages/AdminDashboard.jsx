import React, { useState, useEffect } from 'react';
import { useAlert } from '../hooks/useAlert';
import { Bell, Users, Briefcase, AlertCircle, CheckCircle, X, BarChart3, Settings, Star, Eye, MessageSquare } from 'lucide-react';
import CreateEmployeeForm from '../components/CreateEmployeeForm';
import AnalyticsDashboard from './AnalyticsDashboard';
import { adminService } from '../services/api';

const AdminDashboard = () => {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [toastNotifications, setToastNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalWorkers: 0,
    totalEmployers: 0,
  });
  const { showSuccess, showError, showInfo } = useAlert();
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [selectedDetailType, setSelectedDetailType] = useState(null);
  const [detailedList, setDetailedList] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fetch real notifications from database
  useEffect(() => {
    fetchStats();
    fetchNotifications();
    // Auto-refresh stats every 15 seconds
    const statsInterval = setInterval(fetchStats, 15000);
    // Auto-refresh notifications every 10 seconds
    const notifyInterval = setInterval(fetchNotifications, 10000);
    return () => {
      clearInterval(statsInterval);
      clearInterval(notifyInterval);
    };
  }, []);

  const fetchStats = async () => {
    try {
      const res = await adminService.getDashboardStats();
      if (res?.data?.success && res.data.data) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard stats', err?.response?.data || err.message);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await adminService.getNotifications?.();
      if (res?.data?.success) {
        const notifications = res.data.data || [];
        setRecentNotifications(notifications.slice(0, 5));
        
        // Add toast notification for each new notification
        notifications.slice(0, 1).forEach(notif => {
          addToastNotification(notif);
        });
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err?.response?.data || err.message);
      setRecentNotifications([]);
    }
  };

  const addToastNotification = (notification) => {
    const id = Date.now();
    const toast = {
      id,
      message: notification.title || 'New notification',
      type: 'success',
      timestamp: new Date(),
    };
    setToastNotifications(prev => [...prev, toast]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToastNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleEmployeeCreated = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    setShowEmployeeForm(false);
    showSuccess(`Employee ${newEmployee.name} added successfully!`, 'Employee Created');
    // Immediately refresh all stats from server
    fetchStats();
    fetchNotifications();
  };

  const handleStatCardClick = async (type) => {
    setSelectedDetailType(type);
    setLoadingDetails(true);
    try {
      let data = [];
      if (type === 'users') {
        const res = await adminService.getAllUsers({ limit: 100 });
        data = res?.data?.data || [];
      } else if (type === 'jobs') {
        const res = await adminService.getAllJobs({ limit: 100 });
        data = res?.data?.data || [];
      } else if (type === 'workers') {
        const res = await adminService.getAllUsers({ role: 'worker', limit: 100 });
        data = res?.data?.data || [];
      } else if (type === 'employers') {
        const res = await adminService.getAllUsers({ role: 'employer', limit: 100 });
        data = res?.data?.data || [];
      }
      setDetailedList(data);
    } catch (err) {
      console.error(`Failed to fetch ${type}:`, err?.response?.data || err.message);
      showError(`Failed to load ${type} details`, 'Error');
      setDetailedList([]);
    } finally {
      setLoadingDetails(false);
    }
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-4 py-8">
      {/* Toast Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-3">
        {toastNotifications.map(toast => (
          <div key={toast.id} className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg border border-green-500 animate-pulse">
            <div className="w-3 h-3 bg-green-300 rounded-full animate-bounce"></div>
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section - Dark Theme with Notifications & Settings */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-slate-400 mt-2">Welcome, Admin! Manage the platform here.</p>
            </div>
            
            {/* Right Side: Settings & Notifications */}
            <div className="flex items-center gap-4">
              {/* Notifications Badge */}
              <div className="relative">
                <button className="relative p-3 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 transition">
                  <Bell className="h-6 w-6 text-cyan-400" />
                  {recentNotifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {recentNotifications.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Settings Icon */}
              <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 transition">
                <Settings className="h-6 w-6 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Stats Grid - Dark Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button onClick={() => handleStatCardClick('users')} className="bg-slate-800/60 border border-slate-700 rounded-lg shadow-md p-6 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition text-left cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-bold text-cyan-400 mb-2">Users</div>
                  <div className="text-4xl font-extrabold text-white">{stats.totalUsers ?? '--'}</div>
                  <div className="text-sm text-slate-400 mt-1">Total Registered Users</div>
                </div>
                <Users className="h-8 w-8 text-cyan-500 opacity-50" />
              </div>
            </button>
            <button onClick={() => handleStatCardClick('jobs')} className="bg-slate-800/60 border border-slate-700 rounded-lg shadow-md p-6 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition text-left cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-2">Jobs</div>
                  <div className="text-4xl font-extrabold text-white">{stats.totalJobs ?? '--'}</div>
                  <div className="text-sm text-slate-400 mt-1">Total Jobs Posted</div>
                </div>
                <Briefcase className="h-8 w-8 text-blue-500 opacity-50" />
              </div>
            </button>
            <button onClick={() => handleStatCardClick('workers')} className="bg-slate-800/60 border border-slate-700 rounded-lg shadow-md p-6 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition text-left cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-bold text-cyan-400 mb-2">Workers</div>
                  <div className="text-4xl font-extrabold text-white">{stats.totalWorkers ?? '--'}</div>
                  <div className="text-sm text-slate-400 mt-1">Total Workers</div>
                </div>
                <Users className="h-8 w-8 text-cyan-500 opacity-50" />
              </div>
            </button>
            <button onClick={() => handleStatCardClick('employers')} className="bg-slate-800/60 border border-slate-700 rounded-lg shadow-md p-6 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition text-left cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-bold text-purple-400 mb-2">Employers</div>
                  <div className="text-4xl font-extrabold text-white">{stats.totalEmployers ?? '--'}</div>
                  <div className="text-sm text-slate-400 mt-1">Total Employers</div>
                </div>
                <Briefcase className="h-8 w-8 text-purple-500 opacity-50" />
              </div>
            </button>
          </div>
        </div>

        {/* Real-time Notifications Section - Dark Theme */}
        <div className="mt-10 bg-slate-800/60 border border-slate-700 rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Real-time Notifications</h2>
            <span className="ml-auto bg-red-500/20 text-red-400 text-sm font-semibold px-3 py-1 rounded-full border border-red-500/30">
              {recentNotifications.length} new
            </span>
            <button onClick={fetchNotifications} className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold">Refresh</button>
          </div>
          <div className="space-y-3">
            {recentNotifications.length > 0 ? (
              recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-cyan-500 cursor-pointer transition hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="flex-shrink-0 mt-1">
                    {notification.type === 'worker_signup' && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    {notification.type === 'job_posted' && (
                      <Briefcase className="h-5 w-5 text-blue-400" />
                    )}
                    {notification.type === 'application' && (
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{notification.title || notification.message}</p>
                    <p className="text-sm text-slate-400">{notification.message || notification.details}</p>
                  </div>
                  <div className="text-xs text-slate-500 whitespace-nowrap">{new Date(notification.createdAt)?.toLocaleTimeString?.() || 'just now'}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400">No notifications at the moment</p>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Section */}
        {showAnalytics && (
          <div className="mt-10">
            <button 
              onClick={() => setShowAnalytics(false)}
              className="mb-6 text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2"
            >
              ← Back to Dashboard
            </button>
            <AnalyticsDashboard />
          </div>
        )}

        {/* Employee Management Section - Dark Theme */}
        {!showEmployeeForm && !showAnalytics ? (
          <div className="bg-slate-800/60 border border-slate-700 rounded-lg shadow-lg p-8 space-y-6 mt-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Employee Management</h2>
                <p className="text-slate-400 mt-1">Create and manage employee records</p>
              </div>
              <button
                onClick={() => setShowEmployeeForm(true)}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md"
              >
                + Add New Employee
              </button>
            </div>

            {/* Employee List */}
            {employees.length > 0 ? (
              <div className="mt-8 overflow-x-auto overflow-hidden">
                <table className="min-w-full bg-slate-700/30 border border-slate-700 rounded-lg">
                  <thead className="bg-slate-700/60 border-b border-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400">Position</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee, index) => (
                      <tr key={index} className="border-t border-slate-700 hover:bg-slate-700/40 transition">
                        <td className="px-6 py-4 text-slate-200">{employee.name}</td>
                        <td className="px-6 py-4 text-slate-400">{employee.email}</td>
                        <td className="px-6 py-4 text-slate-400">{employee.phone}</td>
                        <td className="px-6 py-4 text-slate-400">{employee.position || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            employee.status === 'active' ? 'bg-green-500/20 text-green-400' :
                            employee.status === 'inactive' ? 'bg-slate-500/20 text-slate-400' :
                            employee.status === 'on_leave' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-cyan-400 hover:text-cyan-300 font-semibold mr-4">Edit</button>
                          <button className="text-red-400 hover:text-red-300 font-semibold">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-slate-400 text-lg">No employees added yet. Click the button above to create one!</p>
              </div>
            )}
          </div>
        ) : showEmployeeForm && !showAnalytics ? (
          <CreateEmployeeForm
            onSuccess={handleEmployeeCreated}
            onCancel={() => setShowEmployeeForm(false)}
          />
        ) : null}

        {/* Additional Actions */}
        {!showAnalytics && (
          <div className="mt-10 text-center">
            <button 
              onClick={() => setShowAnalytics(true)}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg hover:shadow-cyan-500/20"
            >
              View Analytics & Reviews
            </button>
          </div>
        )}

        {/* Detailed List Modal - Dark Theme */}
        {selectedDetailType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-auto border border-slate-700">
              {/* Modal Header */}
              <div className="sticky top-0 bg-slate-700/60 border-b border-slate-600 p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white capitalize">{selectedDetailType} Details</h3>
                <button onClick={() => setSelectedDetailType(null)} className="text-slate-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {loadingDetails ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                  </div>
                ) : detailedList.length > 0 ? (
                  <div className="space-y-3">
                    {detailedList.map((item, idx) => (
                      <div key={idx} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-cyan-500 transition">
                        {selectedDetailType === 'users' || selectedDetailType === 'workers' || selectedDetailType === 'employers' ? (
                          <div>
                            <p className="font-semibold text-white">{item.name}</p>
                            <p className="text-sm text-slate-400">Email: {item.email}</p>
                            <p className="text-sm text-slate-400">Phone: {item.phone || 'N/A'}</p>
                            <p className="text-sm text-slate-400 capitalize">Role: {item.role}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-semibold text-white">{item.title}</p>
                            <p className="text-sm text-slate-400">{item.description?.substring(0, 100)}...</p>
                            <p className="text-sm text-slate-400">Location: {item.location}</p>
                            <p className="text-sm text-slate-400">Type: {item.jobType}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-400 py-8">No {selectedDetailType} found</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
