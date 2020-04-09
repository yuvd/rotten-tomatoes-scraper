const express = require("express");

const router = express.Router();

const moviesController = require("../../controllers/torrents/movieTorrents");

router.get("/movie", moviesController.getMovieTorrents);

module.exports = router;
