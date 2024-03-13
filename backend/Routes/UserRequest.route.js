const express = require("express");
const router = express.Router();
const UserRequestController = require("../Controllers/UserRequestController");

router.get("/", UserRequestController.getAllUserRequest);

router.post("/", UserRequestController.createNewUserRequest);

router.get("/:id", UserRequestController.findUserRequestById);

router.get("/user/:id", UserRequestController.findUserRequestByUserId);

router.get("/artist/:id", UserRequestController.findUserRequestByArtistId);

router.patch("/:id", UserRequestController.updateUserRequest);

router.patch("/status/:id", UserRequestController.updateUserRequestStatus);

router.delete("/:id", UserRequestController.deleteUserRequest);

module.exports = router;