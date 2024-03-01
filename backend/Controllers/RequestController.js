const createError = require("http-errors");
const mongoose = require("mongoose");

const Request = require('../Models/request');

module.exports = {
  getAllRequest: async (req, res, next) => {
    try {
      const results = await Request.find({ status: "false" });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewRequest: async (req, res, next) => {
    try {
      const request = new Request(req.body)
      const result = await request.save()
      res.send(result)
    } catch (error) {
      console.log(error.message)
    }
  },

  findRequestById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Request.findById(id).populate('user', 'email nickname role');
      if (!product) {
        throw createError(404, "Request does not exist.");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Request id"));
        return;
      }
      next(error);
    }
  },

  updateRequest: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Request.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Request does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Request Id"));
      }

      next(error);
    }
  },

  deleteRequest: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Request.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Request does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Request id"));
        return;
      }
      next(error);
    }
  },

  countRequest: async (req, res, next) => {
    try {
      const results = await Request.find({})
      const total = results.length;
      res.send({ total });
    } catch (error) {
      console.log(error.message);
    }
  }
};