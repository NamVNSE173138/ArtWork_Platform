const express = require("express");
const router = express.Router();
const ArtistRequestController = require("../Controllers/ArtistRequestController");

router.get("/", ArtistRequestController.getAllArtistRequest);

router.post("/", ArtistRequestController.createNewArtistRequest);

router.get("/:id", ArtistRequestController.findArtistRequestById);

router.get("/userRequest/:id", ArtistRequestController.findArtistRequestByUserRequestId);

router.get("/user/:id", ArtistRequestController.findArtistRequestByUserId);

router.get("/artist/:id", ArtistRequestController.findArtistRequestByArtistId);

router.get("/artist/purchased/:id", ArtistRequestController.findPurchasedArtistRequestByArtistId);

router.patch("/:id", ArtistRequestController.updateArtistRequest);

router.patch("/status/:id", ArtistRequestController.updateArtistRequestStatus);

router.delete("/:id", ArtistRequestController.deleteArtistRequest);

module.exports = router;