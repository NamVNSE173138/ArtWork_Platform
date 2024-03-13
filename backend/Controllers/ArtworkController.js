const createError = require("http-errors");
const mongoose = require("mongoose");
const Artwork = require("../Models/artwork");
const FavoriteList = require("../Models/favoriteList");
const { decodeToken } = require("../Config/config.js");
module.exports = {
  getAllArtwork: async (req, res, next) => {
    try {
      const { search } = req.query;
      // const { user } = req.query;
      const condition = search
        ? {
            status: true,
            $or: [
              { name: { $regex: new RegExp(search), $options: "i" } },
              { tags: { $regex: new RegExp(search), $options: "i" } },
              { description: { $regex: new RegExp(search), $options: "i" } },
            ],
          }
        : {
            // user: user, // Filter by user ID
            status: true,
          };

      const results = await Artwork.find(condition, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getPrivateArtwork: async (req, res, next) => {
    try {
      const results = await Artwork.find({ status: false }, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewArtwork: async (req, res, next) => {
    try {
      const artwork = new Artwork(req.body);
      const result = await artwork.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  findArtworkById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Artwork.findById(id, { __v: 0 });
      if (!product) {
        throw createError(404, "Artwork does not exist.");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Artwork id"));
        return;
      }
      next(error);
    }
  },

  updateArtwork: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Artwork.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Artwork does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Artwork Id"));
      }

      next(error);
    }
  },

  deleteArtwork: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Artwork.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Artwork does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Artwork id"));
        return;
      }
      next(error);
    }
  },

  likeArtwork: async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization;
    console.log("token", token);
    try {
      const userInfo = decodeToken(token);
      const userId = userInfo?.data?.checkEmail?._id;
      console.log("USID", userId);

      const checkLikeExist = await FavoriteList.findOne({
        artwork: id,
        user: userId,
      });

      if (!checkLikeExist) {
        const favoriteList = new FavoriteList({ user: userId, artwork: id });
        const result = await favoriteList.save();
        res.send(result);
      } else {
        // console.log("you liked artwork");
        // res
        //   .status(400)
        //   .json({ message: "You have already liked this artwork" });
        const deletedLike = await FavoriteList.findOneAndDelete({
          user: userId,
          artwork: id,
        });
        res.send({ message: "You have unliked this artwork", deletedLike });
      }
    } catch (error) {
      console.log("Loi ne", error.message);
    }
  },

  getUserFavoriteList: async (req, res, next) => {
    const { token } = req.headers;
    try {
      const userInfo = decodeToken(token);
      const userId = userInfo?.data?.checkEmail?._id;
      const artwork = await FavoriteList.find({ user: userId }).populate(
        "artwork",
        "imageUrl"
      );
      res.send({ message: "ok", data: artwork });
    } catch (error) {
      console.log(error.message);
    }
  },
  getArtworksByArtist: async (req, res, next) => {
    try {
      const { artistId } = req.params;
      const artworks = await Artwork.find(
        { user: artistId, status: true },
        { __v: 0 }
      );
      res.send(artworks);
    } catch (error) {
      console.log(error.message);
    }
  },
  getArtworksOfUser: async (req, res, next) => {
    const { token } = req.headers;

    try {
      const userInfo = decodeToken(token);
      const userId = userInfo?.data?.checkEmail?._id;
      console.log(userId);
      const artworks = await Artwork.find(
        { user: userId, status: true },
        { __v: 0 }
      );
      res.send(artworks);
    } catch (error) {
      console.log(error.message);
    }
  },
};
