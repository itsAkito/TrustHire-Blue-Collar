import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { 
  getWorkerProfile, 
  createWorkerProfile, 
  updateWorkerProfile,
  getAvailableJobs,
  searchJobs,
  applyForJob,
  getApplications,
  getWorkerReviews,
} from '../controllers/workerController.js';
import uploadMiddleware from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/jobs/available', getAvailableJobs);
router.get('/jobs/search', searchJobs);

// Protected routes - require authentication
router.get('/profile', authMiddleware, getWorkerProfile);
router.post('/profile', authMiddleware, uploadMiddleware.single('profilePhoto'), createWorkerProfile);
router.put('/profile', authMiddleware, uploadMiddleware.single('profilePhoto'), updateWorkerProfile);

// Job related routes - protected
router.post('/jobs/:jobId/apply', authMiddleware, applyForJob);
router.get('/applications', authMiddleware, getApplications);

// Review routes
router.get('/reviews', authMiddleware, getWorkerReviews);

export default router;
