"use strict"

searchApp.controller('HomeController', ['searchService', '$timeout', '$scope' , function(searchService, $timeout) {
	var self = this;

	self.search = function () {
		var startPage = 1;
		searchService.get({q: self.q, start: startPage}, function(data) {
			self.data = data;

			self.startPage = data.queries.request[0].startIndex;
			self.totalCount = data.queries.request[0].totalResults;
			self.count = data.queries.request[0].count;
		}, function(errorData) {
			alert(errorData.data);
		});
	};

	self.selectPage = function(startPage) {
		searchService.get({q: self.q, start: startPage}, function(data) {
			self.data = data;
		}, function(errorData) {
			alert(errorData.data);
		});
	}

	self.timeoutPromise = null;

	self.typeQuery = function (event) {
		var query = event.currentTarget.value;
		if (query.length > 0) {
			if (self.timeoutPromise ) {
				$timeout.cancel(self.timeoutPromise);
			}
			self.timeoutPromise = $timeout((function(query) {
				return function () {
					self.q = query;
					self.search()
				}
			})(query), 800);
		}
	}
}]);