import express from 'express';
import { authMiddleware, authorize } from '../middleware/authMiddleware.js';
import {
  submitApplication,
  getApplicationStatus,
  withdrawApplication,
} from '../controllers/applicationController.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.use(authMiddleware);

// Worker application routes
router.post('/:jobId', authorize(ROLES.WORKER), submitApplication);
router.get('/:applicationId', authorize(ROLES.WORKER), getApplicationStatus);
router.put('/:applicationId/withdraw', authorize(ROLES.WORKER), withdrawApplication);

export default router;
