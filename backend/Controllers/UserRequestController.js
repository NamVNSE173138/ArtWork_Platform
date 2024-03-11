const createError = require("http-errors");
const mongoose = require("mongoose");

const UserRequest = require('../Models/userRequest');

module.exports = {
    getAllUserRequest: async (req, res, next) => {
        try {
            const results = await UserRequest.find({ status: "false" });
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },

    createNewUserRequest: async (req, res, next) => {
        try {
            const userRequest = new UserRequest(req.body)
            const result = await userRequest.save()
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },

    findUserRequestById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const userRequest = await UserRequest.findById(id).populate("user")
            if (!userRequest) {
                throw createError(404, "UserRequest does not exist.");
            }
            res.send(userRequest);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid UserRequest id"));
                return;
            }
            next(error);
        }
    },

    findUserRequestByUserId: async (req, res, next) => {
        const userId = req.params.id;
        try {
            const userRequest = await UserRequest.find({ user: userId }).populate('artist')
            if (!userRequest) {
                throw createError(404, "UserRequest does not exist.");
            }
            res.send(userRequest);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid UserRequest id"));
                return;
            }
            next(error);
        }
    },

    findUserRequestByArtistId: async (req, res, next) => {
        const artistId = req.params.id;
        try {
            const userRequest = await UserRequest.find({ artist: artistId }).populate('user').sort({ "createdAt": -1 })
            if (!userRequest) {
                throw createError(404, "UserRequest does not exist.");
            }
            res.send(userRequest);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid UserRequest id"));
                return;
            }
            next(error);
        }
    },


    updateUserRequest: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };

            const result = await UserRequest.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, "UserRequest does not exist");
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid UserRequest Id"));
            }
            next(error);
        }
    },

    deleteUserRequest: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await UserRequest.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, "UserRequest does not exist.");
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid UserRequest id"));
                return;
            }
            next(error);
        }
    },
};