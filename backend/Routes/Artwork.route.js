const express = require("express");
const router = express.Router();
const artworkController = require("../Controllers/ArtworkController");

router.get("/", artworkController.getAllArtwork);

router.get("/private", artworkController.getPrivateArtwork);

router.post("/", artworkController.createNewArtwork);

router.get("/getUserFavoriteList", artworkController.getUserFavoriteList);

router.get("/:id", artworkController.findArtworkById);

router.patch("/:id", artworkController.updateArtwork);

router.delete("/:id", artworkController.deleteArtwork);

router.post("/favoriteList/:id", artworkController.likeArtwork);

router.get("/artworkOf/:artistId", artworkController.getArtworksByArtist);

module.exports = router;
