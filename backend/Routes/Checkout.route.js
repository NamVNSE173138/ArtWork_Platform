const express = require("express");
const router = express.Router();
const checkoutController = require("../Controllers/CheckoutController");

router.get("/vnpay_ipn", checkoutController.getVnpayIPN)

router.post("/create_payment_url", checkoutController.createPaymentUrl);

router.post("/billDetail", checkoutController.saveBillTransaction);

module.exports = router;