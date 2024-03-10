const createError = require('http-errors')
const mongoose = require('mongoose')
const CartItem = require('../Models/cart')
const { decodeToken } = require("../Config/config.js");

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
      const { token } = req.headers;
      const userInfo = decodeToken(token);
      const userId = userInfo?.data?.checkEmail?._id;
      const results = await CartItem.find({ user: userId }).populate('artwork', 'name imageUrl');

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
    // const id = req.params;
    try {
      //   const token = req.headers;
      //   const userInfo = decodeToken(token.authorization);
      //   const userId = userInfo?.data?.checkEmail?._id;
      //   const checkCartExist = await CartItem.findOne({
      //     artwork: id,
      //     user: userId,
      //   });
      //   if (!checkCartExist) {
      //     const cartitem = new CartItem({ user: userId, artwork: id });
      //     const result = await cartitem.save();
      //     res.send(result);
      //   } else {
      //     console.log("you add to cart");
      //     res
      //       .status(400)
      //       .json({ message: "You have already add this artwork" });
      //   }
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