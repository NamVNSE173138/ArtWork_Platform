const express = require("express");
const router = express.Router();
const checkoutController = require("../Controllers/CheckoutController");



router.post("/create_payment_url", checkoutController.createPaymentUrl);




module.exports = router;