import express from 'express';
import { authMiddleware, authorize } from '../middleware/authMiddleware.js';
import {
  createJob,
  getJobs,
  getJobById,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobApplications,
} from '../controllers/jobController.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:jobId', getJobById);

// Protected routes
router.use(authMiddleware);

// Employer job routes
router.post('/', authorize(ROLES.EMPLOYER), createJob);
router.get('/employer/list', authorize(ROLES.EMPLOYER), getJobs);
router.put('/:jobId', authorize(ROLES.EMPLOYER), updateJob);
router.delete('/:jobId', authorize(ROLES.EMPLOYER), deleteJob);

// Job applications
router.get('/:jobId/applications', authorize(ROLES.EMPLOYER), getJobApplications);

export default router;
