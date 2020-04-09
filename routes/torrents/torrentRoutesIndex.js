const express = require("express");
const movieRoutes = require("./movieTorrentsRoutes");

const router = express.Router();

router.use(movieRoutes);

module.exports = router;
