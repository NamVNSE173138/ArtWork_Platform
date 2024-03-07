const createError = require("http-errors");
const mongoose = require("mongoose");

const Notification = require('../Models/notification');

// module.exports = {
//   getAllNotification: async (req, res, next) => {
//     try {
//       const results = await Notification.find({ status: "false" });
//       res.send(results);
//     } catch (error) {
//       console.log(error.message);
//     }
//   },

//   getNotificationWithUserAndArtwork: async (req, res, next) => {
//     try {
//       const results = await Notification.find().populate({
//         path: 'user artwork',
//         select: 'nickname artist '
//       });
//       res.send(results);
//       // res.status(200).json({ results: [...results], success: true });
//     } catch (error) {
//       console.log(error.message);
//     }
//   },

//   createNewNotification: async (req, res, next) => {
//     try {
//       const notification = new Notification(req.body)
//       const result = await notification.save()
//       res.send(result)
//     } catch (error) {
//       console.log(error.message)
//     }
//   },

//   findNotificationById: async (req, res, next) => {
//     const id = req.params.id;
//     try {
//       const product = await Notification.findById(id).populate('user', 'email nickname role');
//       if (!product) {
//         throw createError(404, "Notification does not exist.");
//       }
//       res.send(product);
//     } catch (error) {
//       console.log(error.message);
//       if (error instanceof mongoose.CastError) {
//         next(createError(400, "Invalid Notification id"));
//         return;
//       }
//       next(error);
//     }
//   },

//   updateNotification: async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const updates = req.body;
//       const options = { new: true };

//       const result = await Notification.findByIdAndUpdate(id, updates, options);
//       if (!result) {
//         throw createError(404, "Notification does not exist");
//       }
//       res.send(result);
//     } catch (error) {
//       console.log(error.message);
//       if (error instanceof mongoose.CastError) {
//         return next(createError(400, "Invalid Notification Id"));
//       }

//       next(error);
//     }
//   },
// };

exports.getAllNotification = async (req, res) => {
  try {
    const results = await Notification.find({ status: "false" }).populate('user artwork', 'nickname user');
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
    const notification = await Notification.findByIdAndUpdate(req.params.notificationId, { isRead: true }, { new: true });
    res.status(200).json({ status: 'success', data: notification });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
