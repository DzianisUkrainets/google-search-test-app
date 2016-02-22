function SearchService(obj) {
    this.cx = obj.cx || '';
    this.key = obj.key || '';
    this.url = "https://www.googleapis.com/customsearch/v1";
    this.request = require('request');

    this.search = function(searchOptions, callback) {
        var query = searchOptions.q || '',
            start = searchOptions.start || 1

        return this.request.get(this.url, {
            qs: { q: query, cx: this.cx, key: this.key, start: start }
        }, callback);
    }
}

module.exports = SearchService;