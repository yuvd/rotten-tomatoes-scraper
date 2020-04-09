const rtScraper = require("../../utils/scrapers/metadata/rtMetadata");
const actionNames = require("../../utils/constants/actionNames");

exports.getTopTv = async (req, res, next) => {
	//TODO: Cache this result, refresh the cache once in a TBD timeframe and serve it from the cache
	try {
		const topTv = await rtScraper.scrapeMostPop(actionNames.SCRAPE_TV_METADTA);
		return res.send(topTv);
	} catch (err) {
		next(err);
	}
};
