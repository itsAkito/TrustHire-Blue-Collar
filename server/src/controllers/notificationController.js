import Notification from '../models/Notification.js';
import User from '../models/User.js';

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 20,
    });

    res.json({
      success: true,
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOne({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();

    res.json({ success: true, message: 'Marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update notification' });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.update({ read: true }, { where: { userId, read: false } });

    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update notifications' });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOne({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    await notification.destroy();

    res.json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete notification' });
  }
};

// Helper function to create notification
export const createNotification = async (userId, type, title, message, relatedId = null, relatedType = null) => {
  try {
    const notification = await Notification.create({
      userId,
      type,
      title,
      message,
      relatedId,
      relatedType,
    });
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};
