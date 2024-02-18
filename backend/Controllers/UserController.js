const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../Models/user.js');

module.exports = {
	getAllUsers: async (req, res, next) => {
		try {
			const results = await User.find({});
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

	findUserById: async (req, res, next) => {
		const id = req.params.id;
		try {
			const user = await User.findById(id);
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
	}
};