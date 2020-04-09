const TorrentSearchApi = require("torrent-search-api");
// tsApi object with some custom configuration for global usage.
// All future configuration should go in here.

TorrentSearchApi.enablePublicProviders();

module.exports = TorrentSearchApi;
