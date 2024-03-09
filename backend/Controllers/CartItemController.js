const createError = require('http-errors')
const mongoose = require('mongoose')
const CartItem = require('../Models/cart')

module.exports = {
  getAllCartItems: async (req, res, next) => {
    try {
      const results = await CartItem.find({}, { __v: 0 });

      res.send(results);
    }
    catch (err) {
      console.log(err.message);
    }
  },

  getCartItemById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const results = await CartItem.findById(id);

      if (results) {
        res.send(results);
      }
      else {
        throw createError(404, "CartItem does not exist!")
      }
    }
    catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid CartItem Id'))
      }
    }
  },

  postNewCartItem: async (req, res, next) => {
    try {
      const cartitem = new CartItem(req.body);
      const result = cartitem.save();

      res.send(result);
    }
    catch (error) {
      console.log(error.message);
    }
  },

  updateCartItem: async (req, res, next) => {
    try {
      const id = req.params.id;
      const update = new CartItem(req.body);
      const options = { new: true };

      const result = await CartItem.findByIdAndUpdate(id, update, options);

      if (!result) {
        throw createError(404, "CartItem does not exist!");
      }
      else {
        res.send(result);
      }
    }
    catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid CartItem Id'))
      }
    }
  },

  deleteCartItem: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await CartItem.findByIdAndDelete(id);

      if (!result) {
        throw createError(404, "CartItem does not exist!");
      }
      else {
        res.send(result);
      }
    }
    catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid CartItem Id'));
      }
    }
  }
}