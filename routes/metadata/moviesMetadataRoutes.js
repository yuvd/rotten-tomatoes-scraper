const express = require("express");

const router = express.Router();

const moviesMetaDataController = require("../../controllers/metadata/moviesMetadata");

router.get("/topMovies", moviesMetaDataController.getTopMovies);

module.exports = router;
