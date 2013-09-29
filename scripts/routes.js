angular.module('app').config(function ($routeProvider, $locationProvider) {

//	$locationProvider.html5Mode(false);

	console.log($routeProvider);

		$routeProvider
			.when('/about/', {
				controller: 'aboutController',
				templateUrl: '/views/about.html'
			})
			.when('/about/:id', {
				controller: 'aboutController',
				templateUrl: '/views/about.html'
			})
			.when ('/home', {
				controller: 'homeController',
				templateUrl: '/views/home.html'
			})
			.otherwise({
				redirectTo: '/home'
			});
		
});

angular.module('app').controller('aboutController', function ($scope, $location, $log) {

	$log.debug('aboutController');
	$scope.about = 'Hello';

});


angular.module('app').controller('homeController', function ($scope, $location, $log) {

	$log.debug('homeController');
	$scope.about = 'Hi from Home';

});