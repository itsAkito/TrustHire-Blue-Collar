import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Dashboard Statistics
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalWorkers: 0,
    totalEmployers: 0,
    loading: false,
    error: null,
  });

  // Employees
  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);

  // Workers
  const [workers, setWorkers] = useState([]);
  const [workersLoading, setWorkersLoading] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Form state for employee/worker creation
  const [formState, setFormState] = useState({
    isSubmitting: false,
    error: null,
    success: null,
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Fetch dashboard statistics
  const fetchDashboardStats = useCallback(async () => {
    setStats(prev => ({ ...prev, loading: true, error: null }));
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/admin/dashboard-stats`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard statistics');
      }

      const data = await response.json();
      setStats({
        totalUsers: data.totalUsers || 0,
        totalJobs: data.totalJobs || 0,
        totalWorkers: data.totalWorkers || 0,
        totalEmployers: data.totalEmployers || 0,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, [API_BASE_URL]);

  // Fetch employees from database
  const fetchEmployees = useCallback(async () => {
    setEmployeesLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/admin/employees`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]);
    } finally {
      setEmployeesLoading(false);
    }
  }, [API_BASE_URL]);

  // Fetch workers from database
  const fetchWorkers = useCallback(async () => {
    setWorkersLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/admin/workers`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workers');
      }

      const data = await response.json();
      setWorkers(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Error fetching workers:', error);
      setWorkers([]);
    } finally {
      setWorkersLoading(false);
    }
  }, [API_BASE_URL]);

  // Create employee
  const createEmployee = useCallback(async (employeeData) => {
    setFormState({ isSubmitting: true, error: null, success: null });
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/admin/employees`, {
        method: 'POST',
        headers,
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create employee');
      }

      const newEmployee = await response.json();
      setEmployees(prev => [...prev, newEmployee.data || newEmployee]);
      setFormState({
        isSubmitting: false,
        error: null,
        success: 'Employee created successfully',
      });

      // Refresh stats to update count
      setTimeout(() => fetchDashboardStats(), 500);

      return newEmployee;
    } catch (error) {
      console.error('Error creating employee:', error);
      setFormState({
        isSubmitting: false,
        error: error.message,
        success: null,
      });
      throw error;
    }
  }, [API_BASE_URL, fetchDashboardStats]);

  // Create worker
  const createWorker = useCallback(async (workerData) => {
    setFormState({ isSubmitting: true, error: null, success: null });
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/admin/workers`, {
        method: 'POST',
        headers,
        body: JSON.stringify(workerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create worker');
      }

      const newWorker = await response.json();
      setWorkers(prev => [...prev, newWorker.data || newWorker]);
      setFormState({
        isSubmitting: false,
        error: null,
        success: 'Worker created successfully',
      });

      // Refresh stats to update count
      setTimeout(() => fetchDashboardStats(), 500);

      return newWorker;
    } catch (error) {
      console.error('Error creating worker:', error);
      setFormState({
        isSubmitting: false,
        error: error.message,
        success: null,
      });
      throw error;
    }
  }, [API_BASE_URL, fetchDashboardStats]);

  // Update employee
  const updateEmployee = useCallback(async (employeeId, employeeData) => {
    setFormState({ isSubmitting: true, error: null, success: null });
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/admin/employees/${employeeId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update employee');
      }

      const updatedEmployee = await response.json();
      setEmployees(prev =>
        prev.map(emp => (emp.id === employeeId ? updatedEmployee.data || updatedEmployee : emp))
      );
      setFormState({
        isSubmitting: false,
        error: null,
        success: 'Employee updated successfully',
      });

      return updatedEmployee;
    } catch (error) {
      console.error('Error updating employee:', error);
      setFormState({
        isSubmitting: false,
        error: error.message,
        success: null,
      });
      throw error;
    }
  }, [API_BASE_URL]);

  // Delete employee
  const deleteEmployee = useCallback(async (employeeId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/admin/employees/${employeeId}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete employee');
      }

      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
      setFormState({
        isSubmitting: false,
        error: null,
        success: 'Employee deleted successfully',
      });

      // Refresh stats
      setTimeout(() => fetchDashboardStats(), 500);
    } catch (error) {
      console.error('Error deleting employee:', error);
      setFormState({
        isSubmitting: false,
        error: error.message,
        success: null,
      });
      throw error;
    }
  }, [API_BASE_URL, fetchDashboardStats]);

  // Delete worker
  const deleteWorker = useCallback(async (workerId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/admin/workers/${workerId}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete worker');
      }

      setWorkers(prev => prev.filter(wrk => wrk.id !== workerId));
      setFormState({
        isSubmitting: false,
        error: null,
        success: 'Worker deleted successfully',
      });

      // Refresh stats
      setTimeout(() => fetchDashboardStats(), 500);
    } catch (error) {
      console.error('Error deleting worker:', error);
      throw error;
    }
  }, [API_BASE_URL, fetchDashboardStats]);

  // Clear form message
  const clearFormMessage = useCallback(() => {
    setFormState({ isSubmitting: false, error: null, success: null });
  }, []);

  // Initial load
  useEffect(() => {
    fetchDashboardStats();
    fetchEmployees();
    fetchWorkers();
  }, [fetchDashboardStats, fetchEmployees, fetchWorkers]);

  const value = {
    // Stats
    stats,
    fetchDashboardStats,

    // Employees
    employees,
    employeesLoading,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,

    // Workers
    workers,
    workersLoading,
    fetchWorkers,
    createWorker,
    deleteWorker,

    // Form state
    formState,
    clearFormMessage,

    // Notifications
    notifications,
    setNotifications,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
