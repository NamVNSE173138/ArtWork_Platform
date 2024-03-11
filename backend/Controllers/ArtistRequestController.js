const createError = require("http-errors");
const mongoose = require("mongoose");

const ArtistRequest = require('../Models/artistRequest');

module.exports = {
    getAllArtistRequest: async (req, res, next) => {
        try {
            const results = await ArtistRequest.find({ status: "false" })
                .populate({
                    path: 'userRequest',
                    populate: [{
                        path: 'user',
                        model: 'User',
                    },
                    {
                        path: 'artist',
                        model: 'User',
                    }
                    ]
                })
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },

    createNewArtistRequest: async (req, res, next) => {
        try {
            const artistRequest = new ArtistRequest(req.body)
            const result = await artistRequest.save()
            res.send(result)
        } catch (error) {
            console.log(error.message)
        }
    },

    findArtistRequestById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const artistRequest = await ArtistRequest.findById(id)
                .populate({
                    path: 'userRequest',
                    populate: [{
                        path: 'user',
                        model: 'User',
                    },
                    {
                        path: 'artist',
                        model: 'User',
                    }
                    ]
                })
            if (!artistRequest) {
                throw createError(404, "ArtistRequest does not exist.");
            }
            res.send(artistRequest);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid ArtistRequest id"));
                return;
            }
            next(error);
        }
    },

    findArtistRequestByUserRequestId: async (req, res, next) => {
        const id = req.params.id;
        try {
            const artistRequest = await ArtistRequest.find({ 'userRequest': id })
                .populate([{
                    path: 'userRequest',
                    populate: [{
                        path: 'user',
                        model: 'User',
                    },
                    {
                        path: 'artist',
                        model: 'User',
                    }
                    ]
                },
                {
                    path: 'artwork',
                    model: 'Artwork',
                }
                ])
            if (!artistRequest) {
                throw createError(404, "ArtistRequest does not exist.");
            }
            if (!id) {
                throw createError(404, "UserRequest does not exist.");
            }
            res.send(artistRequest);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid ArtistRequest id"));
                return;
            }
            next(error);
        }
    },

    updateArtistRequest: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };

            const result = await ArtistRequest.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, "ArtistRequest does not exist");
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid ArtistRequest Id"));
            }
            next(error);
        }
    },

    deleteArtistRequest: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await ArtistRequest.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, "ArtistRequest does not exist.");
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid ArtistRequest id"));
                return;
            }
            next(error);
        }
    },
};