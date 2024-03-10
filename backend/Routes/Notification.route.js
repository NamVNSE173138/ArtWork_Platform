// const express = require("express");
// const router = express.Router();
// const NotificationController = require("../Controllers/NotificationController");

// router.get("/all", NotificationController.getAllNotification);

// router.get("/", NotificationController.getNotificationWithUserAndArtwork)

// router.post("/", NotificationController.createNewNotification);

// router.get("/:id", NotificationController.findNotificationById);

// router.patch("/:id", NotificationController.updateNotification);

// router.delete("/:id", NotificationController.deleteNotification);

// module.exports = router;

const express = require('express');
const router = express.Router();
const NotificationController = require('../Controllers/NotificationController');

router.get('/', NotificationController.getAllNotification);

router.get('/:id', NotificationController.getNotificationsById);

router.post('/', NotificationController.createNotification);

router.put('/:notificationId', NotificationController.markNotificationAsRead);

module.exports = router;
