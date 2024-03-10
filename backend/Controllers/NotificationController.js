const Notification = require('../Models/notification');

exports.getAllNotification = async (req, res) => {
  try {
    const results = await Notification.find().populate('user artwork', 'nickname user');
    res.send(results);
  } catch (err) {
    console.log(err.message);
  }
}

exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json({ status: 'success', data: notification });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getNotificationsByUser = async (req, res) => {
  try {
    const notifications = await Notification.find({ artist: req.params.userId }).populate('user', 'nickname');
    res.status(200).json({ status: 'success', data: notifications });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.notificationId, { status: true });
    res.status(200).json({ status: 'success', data: notification });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
