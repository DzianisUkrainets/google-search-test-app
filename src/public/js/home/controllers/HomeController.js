searchApp.controller('HomeController', ['searchService', '$timeout', '$scope' , function(searchService, $timeout, $scope) {
	var self = this;

	self.search = function () {
		var startPage = 1;
		searchService.get({q: $scope.q, start: startPage}, function(data) {
			self.data = data;

			$scope.startPage = data.queries.request[0].startIndex;
			$scope.totalCount = data.queries.request[0].totalResults;
			$scope.count = data.queries.request[0].count;
		});
	};

	self.selectPage = function(startPage) {
		searchService.get({q: $scope.q, start: startPage}, function(data) {
			self.data = data;
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
					$scope.q = query;
					self.search()
				}
			})(query), 800);
		}
	}
}]);



searchApp.filter('trustAsHtml', ['$sce', function($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	};
}]);