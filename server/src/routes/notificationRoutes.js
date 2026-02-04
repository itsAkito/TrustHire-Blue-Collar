import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from '../controllers/notificationController.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all notifications for the logged-in user
router.get('/', getNotifications);

// Mark a specific notification as read
router.put('/:notificationId/read', markAsRead);

// Mark all notifications as read
router.put('/read-all', markAllAsRead);

// Delete a notification
router.delete('/:notificationId', deleteNotification);

export default router;
