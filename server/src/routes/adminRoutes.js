import express from 'express';
import {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  getAllJobs,
  getAllApplications,
  getAllEmployees,
  deleteUser,
  deleteJob,
  deleteEmployee,
  getAdminProfile,
  updateAdminProfile,
} from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', adminLogin);

// Protected routes (admin only)
router.get('/dashboard/stats', authMiddleware, getDashboardStats);
router.get('/users', authMiddleware, getAllUsers);
router.get('/jobs', authMiddleware, getAllJobs);
router.get('/applications', authMiddleware, getAllApplications);
router.get('/employees', authMiddleware, getAllEmployees);
router.get('/profile', authMiddleware, getAdminProfile);
router.put('/profile', authMiddleware, updateAdminProfile);

// Delete routes
router.delete('/users/:userId', authMiddleware, deleteUser);
router.delete('/jobs/:jobId', authMiddleware, deleteJob);
router.delete('/employees/:employeeId', authMiddleware, deleteEmployee);

export default router;
