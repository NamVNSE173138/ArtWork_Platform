const express = require("express");
const router = express.Router();
const ArtistRequestController = require("../Controllers/ArtistRequestController");

router.get("/", ArtistRequestController.getAllArtistRequest);

router.post("/", ArtistRequestController.createNewArtistRequest);

router.get("/:id", ArtistRequestController.findArtistRequestById);

router.patch("/:id", ArtistRequestController.updateArtistRequest);

router.delete("/:id", ArtistRequestController.deleteArtistRequest);

module.exports = router;