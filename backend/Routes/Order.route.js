const express = require('express');
const router = express.Router();
const OrderController = require('../Controllers/OrderController.js');

router.get("/", OrderController.getAllOrders);

router.get("/:id", OrderController.getOrderById);

router.get("/user/:id", OrderController.getOrderByUserId);

router.post("/", OrderController.postNewOrder);

router.patch("/:id", OrderController.updateOrder);

router.patch("/code/:code", OrderController.updateOrderByCode);

router.delete("/:id", OrderController.deleteOrder);

module.exports = router