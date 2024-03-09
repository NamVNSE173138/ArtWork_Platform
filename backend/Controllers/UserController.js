const createError = require('http-errors');
const mongoose = require('mongoose');
const { createToken, decodeToken } = require('../Config/config.js')
const User = require('../Models/user.js');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const results = await User.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  getArtistList: async (req, res, next) => {
    try {
      const results = await User.find({ role: "artist" }, { __v: 0 }).sort({ 'numOfFollower': -1 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewUser: async (req, res, next) => {
    try {
      const user = new User(req.body);
      const result = await user.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  userLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Check if the email already exists
      const checkEmail = await User.findOne({ email });

      if (checkEmail.password === password) {
        const token = createToken({ checkEmail, password: "" });
        res.send(token);
      } else {
        res.status(404).send("Email not found");
      }
    } catch (error) {
      console.error(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findUserById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id, { __v: 0 });
      if (!user) {
        throw createError(404, 'User does not exist.');
      }
      res.send(user);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await User.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'User does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid User Id'));
      }

      next(error);
    }
  },

  updateArtistRole: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = {
        role: "artist"
      };
      const options = { new: true };

      const result = await User.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'User does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid User Id'));
      }

      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'User does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  },

  // getUserInfo: async (req, res, next) => {
  //   try {
  //     const token = req.headers;
  //     const id = req.params;
  //     console.log(token)
  //     const userInfo = decodeToken(token);
  //     console.log(userInfo)

  //     res.send(userInfo)
  //   } catch (error) {

  //   }
  // },

  getUserInfo: async (req, res, next) => {
    try {
      const { token } = req.headers;
      console.log(token)

      const userInfo = decodeToken(token);
      const data = {
        id: userInfo?.data?.checkEmail?._id,
        email: userInfo?.data?.checkEmail?.email,
        password: userInfo?.data?.checkEmail?.password,
        nickname: userInfo?.data?.checkEmail?.nickname,
        avatar: userInfo?.data?.checkEmail?.avatar,
        role: userInfo?.data?.checkEmail?.role,
        numOfFollower: userInfo?.data?.checkEmail?.numOfFollower
      }
      console.log(data)
      if (!userInfo) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      res.json(data);
    } catch (error) {
      // Handle errors
      console.error('Error in getUserInfo:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  countUser: async (req, res, next) => {
    try {
      const results = await User.find({ role: 'user' })
      const total = results.length;
      res.send({ total });
    } catch (error) {
      console.log(error.message);
    }
  },

  countArtist: async (req, res, next) => {
    try {
      const results = await User.find({ role: 'artist' })
      const total = results.length;
      res.send({ total });
    } catch (error) {
      console.log(error.message);
    }
  }
};

