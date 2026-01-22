import express from 'express';
import { authMiddleware, authorize } from '../middleware/authMiddleware.js';
import {
  getProfile,
  updateProfile,
  applyForJob,
  getApplications,
} from '../controllers/workerController.js';
import { getAvailableJobs } from '../controllers/jobController.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.use(authMiddleware);

// Worker profile routes
router.get('/profile', authorize(ROLES.WORKER), getProfile);
router.put('/profile', authorize(ROLES.WORKER), updateProfile);

// Job application routes
router.get('/jobs', getAvailableJobs);
router.post('/jobs/:jobId/apply', authorize(ROLES.WORKER), applyForJob);
router.get('/applications', authorize(ROLES.WORKER), getApplications);

export default router;
