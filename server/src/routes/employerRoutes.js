import express from 'express';
import { authMiddleware, authorize } from '../middleware/authMiddleware.js';
import {
  getDashboardStats,
  getApplicationsForEmployer,
  updateApplicationStatus,
} from '../controllers/employerController.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.use(authMiddleware);
router.use(authorize(ROLES.EMPLOYER));

// Dashboard routes
router.get('/dashboard', getDashboardStats);

// Applications management
router.get('/applications', getApplicationsForEmployer);
router.put('/applications/:applicationId/status', updateApplicationStatus);

export default router;
