angular.module('services', ['ngResource']).factory('searchService', [
		'$resource', function($resource) {
			return $resource('http://localhost:3002/');
		}
	]);