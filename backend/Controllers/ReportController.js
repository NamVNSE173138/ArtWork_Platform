const createError = require("http-errors");
const mongoose = require("mongoose");

const Report = require('../Models/report');

module.exports = {
  getAllReport: async (req, res, next) => {
    try {
      const results = await Report.find({ status: "false" });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  getReportWithUserAndArtwork: async (req, res, next) => {
    try {
      const results = await Report.find().populate({
        path: 'user artwork',
        select: 'nickname imageUrl'
      });
      res.send(results);
      // res.status(200).json({ results: [...results], success: true });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewReport: async (req, res, next) => {
    try {
      const report = new Report(req.body)
      const result = await report.save()
      res.send(result)
    } catch (error) {
      console.log(error.message)
    }
  },

  findReportById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Report.findById(id).populate('user', 'email nickname role');
      if (!product) {
        throw createError(404, "Report does not exist.");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Report id"));
        return;
      }
      next(error);
    }
  },

  updateReport: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Report.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Report does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Report Id"));
      }

      next(error);
    }
  },

  deleteReport: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Report.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Report does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Report id"));
        return;
      }
      next(error);
    }
  },

  countReport: async (req, res, next) => {
    try {
      const results = await Report.find({})
      const total = results.length;
      res.send({ total });
    } catch (error) {
      console.log(error.message);
    }
  }
};