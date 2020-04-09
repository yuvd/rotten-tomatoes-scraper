const puppeteer = require("puppeteer");

class PuppeteerScraper {
	static async build() {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		const pupScraper = new PuppeteerScraper(page);

		return new Proxy(pupScraper, {
			// Connect the custom scraper, Puppeteer browser and Puppeteer page to a proxy, in order to abstract some scraping-related logic and stay DRY.
			// The proxy will first to run a given function on the custom scraper (i.e: custom scraping functions), then on the browser,
			// and only if the function doesn't exist on either, then it will try running it on the page.
			get: function (target, property) {
				return pupScraper[property] || browser[property] || page[property];
			},
		});
	}

	constructor(page) {
		this.page = page; // The page object
	}

	loadAndStop = async (url, selector) => {
		// Go to a URL, wait for an element to load, then stop loading the page. Should conserve bandwith.
		await this.page.goto(url);
		await this.page.waitForSelector(selector);
		await this.page.evaluate(() => window.stop());
	};
}

module.exports = PuppeteerScraper;
