searchApp.controller('HomeController', ['searchService', function(searchService) {
	var self = this;
	
	searchService.get(function(data) {
		self.text = data.message;
	});
}]);