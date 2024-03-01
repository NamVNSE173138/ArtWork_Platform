const express = require("express");
const router = express.Router();
const Request = require('../Models/request')
const requestController = require("../Controllers/RequestController");

router.get("/", requestController.getAllRequest);

router.get("/count", requestController.countRequest);

router.post("/", requestController.createNewRequest);

router.get("/:id", requestController.findRequestById);

router.patch("/:id", requestController.updateRequest);

router.delete("/:id", requestController.deleteRequest);

module.exports = router;