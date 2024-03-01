const express = require("express");
const router = express.Router();
const Artwork = require('../Models/artwork')
const artworkController = require("../Controllers/ArtworkController");

router.get("/", artworkController.getAllArtwork);

router.post("/", artworkController.createNewArtwork);

router.get("/:id", artworkController.findArtworkById);

router.patch("/:id", artworkController.updateArtwork);

router.delete("/:id", artworkController.deleteArtwork);

module.exports = router;