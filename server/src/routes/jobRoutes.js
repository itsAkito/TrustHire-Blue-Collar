import express from 'express';
import { authMiddleware, authorize } from '../middleware/authMiddleware.js';
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.use(authMiddleware);

// Employer job routes
router.post('/', authorize(ROLES.EMPLOYER), createJob);
router.get('/employer', authorize(ROLES.EMPLOYER), getJobs);
router.put('/:jobId', authorize(ROLES.EMPLOYER), updateJob);
router.delete('/:jobId', authorize(ROLES.EMPLOYER), deleteJob);

export default router;
