const rtScraper = require("../../utils/scrapers/metadata/rtMetadata");
const actionNames = require("../../utils/constants/actionNames");

exports.getTopMovies = async (req, res, next) => {
	//TODO: Cache this result, refresh the cache once in a TBD timeframe and serve it from the cache
	try {
		const topMovies = await rtScraper.scrapeMostPop(
			actionNames.SCRAPE_MOVIE_METADATA
		);
		return res.send(topMovies);
	} catch (err) {
		next(err);
	}
};
