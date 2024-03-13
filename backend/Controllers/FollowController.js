const Follow = require('../Models/follow');
const { decodeToken } = require("../Config/config.js");

exports.getAllFollowers = async (req, res) => {
  try {
    const results = await Follow.find();
    res.send(results);
  } catch (err) {
    console.log(err.message);
  }
}

exports.getFollowersList = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const userId = userInfo?.data?.checkEmail?._id;
    const results = await Follow.find({ following: userId });
    if (results) {
      res.send(results);
    }
    else {
      throw createError(404, "Notifcation does not exist!")
    }

  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Follow Id'))
    }
  }
}

exports.getFollowingList = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const userId = userInfo?.data?.checkEmail?._id;
    const results = await Follow.find({ follower: userId });
    if (results) {
      res.send(results);
    }
    else {
      throw createError(404, "Following does not exist!")
    }

  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Following Id'))
    }
  }
};

exports.createFollower = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const userId = userInfo?.data?.checkEmail?._id;
    const follow = await Follow.create({ follower: userId, following: req.params.id, status: true });
    res.status(201).json({ status: 'success', data: follow });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deleteFollower = async (req, res) => {
  try {
    const follow = await Follow.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success', data: follow });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
}
