// Module imports
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

// Route imports
const torrentRoutes = require("./routes/torrents/torrentRoutesIndex");
const metadataRoutes = require("./routes/metadata/metadataRoutesIndex");

// Basic setup
const app = express();
app.use(helmet());
app.use(bodyParser.json());

// A lot of extensive file separation because I expect many files to be very big when the app starts scaling

// Routes setup
app.use("/torrents", torrentRoutes);
app.use("/metadata", metadataRoutes);
// app.route("/torrents").use(torrentRoutes);
// app.route("/metadata").use(metadataRoutes);

// Error handling
app.use((err, req, res, next) => {
	const { message, statusCode } = err;
	res.status(statusCode).json({
		statusCode,
		message,
	});
	res.send();
});

app.listen(5000);
