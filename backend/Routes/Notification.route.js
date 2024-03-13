const express = require('express');
const router = express.Router();
const NotificationController = require('../Controllers/NotificationController');

router.get('/', NotificationController.getAllNotification);

router.get('/:id', NotificationController.getNotificationsById);

router.post('/', NotificationController.createNotification);

router.patch('/:notificationId', NotificationController.markNotificationAsRead);

router.delete('/:id', NotificationController.deleteNotification);

router.post('/decline/:id', NotificationController.declineNotification);

module.exports = router;
