const express = require("express");

const router = express.Router();

const moviesMetadataRoutes = require("./moviesMetadataRoutes");
const tvMetadataRoutes = require("./tvMetadataRoutes");

router.use(moviesMetadataRoutes);
router.use(tvMetadataRoutes);

module.exports = router;
