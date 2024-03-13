const Notification = require('../Models/notification');
const { decodeToken } = require("../Config/config.js");

exports.getAllNotification = async (req, res) => {
  try {
    const results = await Notification.find().populate('user artwork', 'nickname user');
    res.send(results);
  } catch (err) {
    console.log(err.message);
  }
}

exports.getNotificationsById = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const userId = userInfo?.data?.checkEmail?._id;
    const results = await Notification.find({ artist: userId }).populate('user artwork', 'nickname user avatar');
    if (results) {
      res.send(results);
    }
    else {
      throw createError(404, "Notifcation does not exist!")
    }

  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Notification Id'))
    }
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

//TEST
exports.declineNotification = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const userId = userInfo?.data?.checkEmail?._id;
    console.log("CURRET: ", userId);
    const notification = await Notification.create({ user: userId, artist: req.params.id, type: "Decline", status: false });
    res.status(201).json({ status: 'success', data: notification });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
}

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

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success', data: notification });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
}
