const express = require("express");
const router = express.Router();
const Artwork = require('../Models/artwork')
const artworkController = require("../Controllers/ArtworkController");

router.get("/", artworkController.getAllArtwork);

router.post("/", artworkController.createNewArtwork);

router.get("/getUserFavoriteList", artworkController.getUserFavoriteList);

router.get("/:id", artworkController.findArtworkById);

router.patch("/:id", artworkController.updateArtwork);

router.delete("/:id", artworkController.deleteArtwork);

router.post("/favoriteList/:id", artworkController.likeArtwork);

router.get("/getUserFavoriteList", artworkController.getUserFavoriteList)


module.exports = router;


// chạy file backend pk fen
// mà tui chạy npm run dev nó ms start backend á
// đúng chưua fen
// tạo cái button r viết cái hàm để sao nx fen :)))
// chưa fen



// FE:
// viết page thanh toán j nx hok fen
// amount, bankcode, language
// redirect
// 