angular.module('services', ['ngResource']).factory('searchService', [
		'$resource', function($resource) {
			return $resource('http://localhost:3002/search?q=:q&start=:start', {q: '@q', start: '@start'}, { get : {method:'GET'}});
		}
	]);