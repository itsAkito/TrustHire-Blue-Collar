import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  // User endpoints
  register: (formData) => api.post('/users/register', formData),
  login: (credentials) => api.post('/users/login', credentials),
  verifyOTP: (data) => api.post('/users/verify-otp', data),
  resendOTP: (email) => api.post('/users/resend-otp', { email }),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.post('/users/change-password', data),
  
  // Admin endpoints
  adminLogin: (credentials) => api.post('/admin/login', credentials),
  
  // Utility functions
  validateToken: (token) => {
    // Check token format
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) {
        return Promise.reject(new Error('Token expired'));
      }
      return Promise.resolve(payload);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  },
};

export const validateToken = (token) => authService.validateToken(token);

// Admin Services
export const adminService = {
  login: (credentials) => api.post('/admin/login', credentials),
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  getAllJobs: (params) => api.get('/admin/jobs', { params }),
  getAllApplications: (params) => api.get('/admin/applications', { params }),
  getAllEmployees: (params) => api.get('/admin/employees', { params }),
  createEmployee: (employeeData) => api.post('/admin/employees', employeeData),
  updateEmployee: (employeeId, employeeData) => api.put(`/admin/employees/${employeeId}`, employeeData),
  deleteEmployee: (employeeId) => api.delete(`/admin/employees/${employeeId}`),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  deleteJob: (jobId) => api.delete(`/admin/jobs/${jobId}`),
  getAdminProfile: () => api.get('/admin/profile'),
  updateAdminProfile: (profileData) => api.put('/admin/profile', profileData),
};

// Mock data for development
const MOCK_JOBS = [
  {
    id: 1,
    title: 'Electrician Needed',
    description: 'Looking for experienced electrician for residential wiring',
    location: 'New York, NY',
    salary: 25000,
    jobType: 'contract',
    employerName: 'ABC Construction',
    rating: 4.5,
    reviews: 12
  },
  {
    id: 2,
    title: 'Plumbing Specialist',
    description: 'Expert plumber required for commercial building',
    location: 'Los Angeles, CA',
    salary: 28000,
    jobType: 'full-time',
    employerName: 'XYZ Services',
    rating: 4.8,
    reviews: 25
  },
  {
    id: 3,
    title: 'HVAC Technician',
    description: 'HVAC installation and maintenance',
    location: 'Chicago, IL',
    salary: 22000,
    jobType: 'part-time',
    employerName: 'Climate Control Inc',
    rating: 4.3,
    reviews: 8
  },
  {
    id: 4,
    title: 'Carpenter',
    description: 'Skilled carpenter for home renovation projects',
    location: 'Houston, TX',
    salary: 24000,
    jobType: 'contract',
    employerName: 'BuildRight Company',
    rating: 4.6,
    reviews: 18
  },
  {
    id: 5,
    title: 'Painter',
    description: 'Professional painter for commercial spaces',
    location: 'Phoenix, AZ',
    salary: 20000,
    jobType: 'full-time',
    employerName: 'ProPaint Services',
    rating: 4.4,
    reviews: 14
  },
];

// Worker Services
export const workerService = {
  getProfile: async () => {
    try {
      return await api.get('/workers/profile');
    } catch (error) {
      return {
        data: {
          id: 'mock-worker-1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 234-567-8900',
          skills: ['Electrical', 'Plumbing', 'HVAC'],
          experience: 8,
          rating: 4.5,
          bio: 'Experienced blue collar worker'
        }
      };
    }
  },
  createWorkerProfile: (formData) => api.post('/workers/profile', formData),
  updateProfile: (formData) => api.put('/workers/profile', formData),
  getAvailableJobs: async (filters) => {
    try {
      return await api.get('/jobs', { params: filters });
    } catch (error) {
      return {
        data: MOCK_JOBS.filter(job => {
          if (filters?.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
          if (filters?.jobType && job.jobType !== filters.jobType) return false;
          if (filters?.search && !job.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
          return true;
        })
      };
    }
  },
  applyForJob: (jobId) => api.post(`/applications/${jobId}`),
  getApplications: () => api.get('/workers/applications'),
  updateLocation: (location) => api.put('/workers/location', location),
  searchJobs: async (searchTerm, filters) => {
    try {
      return await api.get('/jobs', { params: { q: searchTerm, ...filters } });
    } catch (error) {
      return {
        data: MOCK_JOBS.filter(job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      };
    }
  },
};

// Employer Services
export const employerService = {
  getProfile: () => api.get('/employers/profile'),
  updateProfile: (formData) => api.put('/employers/profile', formData),
  createJob: (jobData) => api.post('/employers/jobs', jobData),
  getJobs: () => api.get('/employers/jobs'),
  updateJob: (jobId, jobData) => api.put(`/employers/jobs/${jobId}`, jobData),
  deleteJob: (jobId) => api.delete(`/employers/jobs/${jobId}`),
  getApplications: (jobId) => api.get(`/employers/jobs/${jobId}/applications`),
  reviewApplication: (applicationId, status) =>
    api.put(`/employers/applications/${applicationId}`, { status }),
  getDashboardStats: () => api.get('/employers/dashboard/stats'),
  getWorkers: () => api.get('/employers/workers'),
  hireWorker: (workerId, jobId) => api.post('/employers/hire', { workerId, jobId }),
};

// Job Services
export const jobService = {
  getAllJobs: (filters) => api.get('/jobs', { params: filters }),
  getJobDetails: (jobId) => api.get(`/jobs/${jobId}`),
  getJobApplications: (jobId) => api.get(`/jobs/${jobId}/applications`),
  searchJobs: (query) => api.get('/jobs/search', { params: { q: query } }),
};

// User Services
export const userService = {
  getUserDetails: () => api.get('/users/me'),
  updateUserDetails: (userData) => api.put('/users/me', userData),
  changePassword: (oldPassword, newPassword) =>
    api.post('/users/change-password', { oldPassword, newPassword }),
  deleteAccount: () => api.delete('/users/me'),
};

// Rating/Review Services
export const reviewService = {
  getWorkerReviews: (workerId) => api.get(`/reviews/workers/${workerId}`),
  getEmployerReviews: (employerId) => api.get(`/reviews/employers/${employerId}`),
  addReview: (rating, review, revieweeId, revieweeType) =>
    api.post('/reviews', { rating, review, revieweeId, revieweeType }),
  updateReview: (reviewId, rating, review) =>
    api.put(`/reviews/${reviewId}`, { rating, review }),
};

export default api;
