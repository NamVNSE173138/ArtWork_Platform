const express = require("express");
const router = express.Router();
const artworkController = require("../Controllers/ArtworkController");

router.get("/", artworkController.getAllArtwork);

router.post("/", artworkController.createNewArtwork);

router.get("/:id", artworkController.findArtworkById);

router.put("/:id", artworkController.updateArtwork);

router.delete("/:id", artworkController.deleteArtwork);

module.exports = router;