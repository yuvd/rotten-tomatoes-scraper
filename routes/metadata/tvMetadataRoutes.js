const express = require("express");

const router = express.Router();

const tvMetaDataController = require("../../controllers/metadata/tvMetadata");

router.get("/topTv", tvMetaDataController.getTopTv);

module.exports = router;
