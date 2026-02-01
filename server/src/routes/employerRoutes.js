import express from 'express';
import { authMiddleware, authorize } from '../middleware/authMiddleware.js';
import {
  getProfile,
  updateProfile,
  getDashboardStats,
  getApplicationsForEmployer,
  updateApplicationStatus,
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employerController.js';
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import { ROLES } from '../config/constants.js';
import uploadMiddleware from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(authorize(ROLES.EMPLOYER));

// Employer profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Dashboard stats
router.get('/dashboard/stats', getDashboardStats);

// Job routes
router.post('/jobs', createJob);
router.get('/jobs', getJobs);
router.put('/jobs/:jobId', updateJob);
router.delete('/jobs/:jobId', deleteJob);

// Application routes
router.get('/applications', getApplicationsForEmployer);
router.put('/applications/:applicationId', updateApplicationStatus);

// Employee management routes
router.post('/employees', uploadMiddleware.single('profilePhoto'), addEmployee);
router.get('/employees', getEmployees);
router.get('/employees/:employeeId', getEmployeeById);
router.put('/employees/:employeeId', uploadMiddleware.single('profilePhoto'), updateEmployee);
router.delete('/employees/:employeeId', deleteEmployee);

export default router;
