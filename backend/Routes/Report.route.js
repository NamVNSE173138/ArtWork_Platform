const express = require("express");
const router = express.Router();
const ReportController = require("../Controllers/ReportController");

router.get("/", ReportController.getAllReport);

router.get("/user/artwork", ReportController.getReportWithUserAndArtwork)

router.post("/", ReportController.createNewReport);

router.get("/:id", ReportController.findReportById);

router.patch("/:id", ReportController.updateReport);

router.delete("/:id", ReportController.deleteReport);

module.exports = router;