const createError = require('http-errors')
const mongoose = require('mongoose')
const Order = require('../Models/order')

module.exports = {
  getAllOrders: async (req, res, next) => {
    try {
      const results = await Order.find({}, { __v: 0 });

      res.send(results);
    }
    catch (err) {
      console.log(err.message);
    }
  },

  getOrderById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const results = await Order.findById(id);

      if (results) {
        res.send(results);
      }
      else {
        throw createError(404, "Order does not exist!")
      }
    }
    catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Order Id'))
      }
    }
  },

  postNewOrder: async (req, res, next) => {
    try {
      const order = new Order(req.body);
      const result = order.save();

      res.send(result);
    }
    catch (error) {
      console.log(error.message);
    }
  },

  updateOrder: async (req, res, next) => {
    try {
      const id = req.params.id;
      const update = new Order(req.body);
      const options = { new: true };

      const result = await Order.findByIdAndUpdate(id, update, options);

      if (!result) {
        throw createError(404, "Order does not exist!");
      }
      else {
        res.send(result);
      }
    }
    catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Order Id'))
      }
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await Order.findByIdAndDelete(id);

      if (!result) {
        throw createError(404, "Order does not exist!");
      }
      else {
        res.send(result);
      }
    }
    catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Order Id'));
      }
    }
  }
}