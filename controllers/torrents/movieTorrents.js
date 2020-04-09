const HttpError = require("../../models/errors/HttpError");
const tsApi = require("../../utils/torrentSearchApi");

exports.getMovieTorrents = async (req, res, next) => {
	// For a given movie title (i.e: "Star Wars"), get a list of torrents
	try {
		const torrents = await tsApi.search(req.query.title, "Movies", 10);
		return res.send(torrents);
	} catch (err) {
		// TODO: Handle different error cases, i.e: user sends a request without a title.
		next(
			new HttpError(
				"Failed to fetch torrents. Our torrent sources may be currently unavailable."
			)
		);
	}
};
