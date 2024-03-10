const express = require("express");
const router = express.Router();
const UserRequestController = require("../Controllers/UserRequestController");

router.get("/", UserRequestController.getAllUserRequest);

router.post("/", UserRequestController.createNewUserRequest);

router.get("/:id", UserRequestController.findUserRequestById);

router.patch("/:id", UserRequestController.updateUserRequest);

router.delete("/:id", UserRequestController.deleteUserRequest);

module.exports = router;