const Page = require("../../../models/scrapers/PuppeteerScraper");
const HttpError = require("../../../models/errors/HttpError");
const actionNames = require("../../constants/actionNames");

// Note: this scraper is used because TMDB's API doesn't support listing movies & TV shows by popularity in a recent timeframe.
// If this changes in the future, and the data's quality is as high as RT's, this scraper may be deprecated.

const URLS = {
	moviesMostPop: "https://www.rottentomatoes.com/browse/in-theaters",
	tvMostPop: "https://www.rottentomatoes.com/browse/tv-list-2",
};

exports.scrapeMostPop = async (tvOrMovies) => {
	try {
		// Get the most popular movies or TV shows.
		// Most popular movies/TV shows are determined by their box office earnings if movies, or RT user popularity if TV, in a recent timeframe.
		// The structure of the TV and movie pages are identical, so the same scraping function can be used, with only the URL differing

		// Determine whether to scrape movie or TV metadata based on the arg that was sent
		const url =
			tvOrMovies === actionNames.SCRAPE_MOVIE_METADATA
				? URLS.moviesMostPop
				: URLS.tvMostPop;

		// Go to RT's top movies page, load the movies, then stop loading the page
		const page = await Page.build();
		await page.loadAndStop(url, ".mb-movies");

		// Item: either a movie or a TV show
		// Get an array of all the item containers (all ".mb-movie"s) on the page and pass it into a function that will run inside Puppeteer's Chromium instance
		const topItems = await page.$$eval(".mb-movie", (itemConts) => {
			// Receive the containers array, start iterating over it, and send it back from Chromium to Node when you're done
			return itemConts.map((itemCont) => {
				// For each item container, extract the relevant data into an object
				console.log("here");
				console.log(itemConts);
				const itemObj = {
					posterImg: itemCont.querySelector("img").src,
					title: itemCont.querySelector("h3").innerText,
					// Some item containers don't have a score (e.g: they weren't released yet). Trying to get their ".tMeterScore" element will resolve to undefined.
					// Save null to the rating key if that's the case.
					rating: itemCont.querySelector(".tMeterScore")
						? itemCont.querySelector(".tMeterScore").innerText
						: null,
					// TV shows wont have a release date
					releaseDate: itemCont.querySelector(".release-date")
						? itemCont
								.querySelector(".release-date")
								.innerText.replace("In Theaters ", "")
						: null,
				};
				//JSONify the object so that it's ready to be sent over the API
				console.log(itemObj);
				return JSON.stringify(itemObj);
			});
		});
		return topItems;
	} catch (err) {
		throw new HttpError(
			"Failed to fetch item information. Rotten Tomatoes may be currently unavailable."
		);
	}
};
