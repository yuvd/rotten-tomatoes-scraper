class HttpError extends Error {
	constructor(message, statusCode) {
		super(message || "Oops, something went wrong. Please try again later.");

		this.statusCode = statusCode || 500;
	}
}

module.exports = HttpError;
