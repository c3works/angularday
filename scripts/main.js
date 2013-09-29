angular.module('app', ['ngResource', 'ngRoute']);

//*** Directives
angular.module('app').directive('quote', function() {
	return {
		//* allows implenting through Element, Attribute, Comment, or Class
		restrict: 'E',
		scope: {
			author: '@',
			year: '@',     // @ indicates string
			onClick: '&'  // indicates function   ---  use '=' for expresssions
		},
		//template: '<blockquote><p>Lorem ipsum</p><small>{{author}}</small></blockquote>',
		templateUrl: 'views/quote.html',
		transclude: true
	}
});




//*** Decorator - monkey patching
angular.module('app').config(function ($provide) {

	//** Delegate intercepts $log to 'decorate' it **
	$provide.decorator('$log', function($delegate) {

		// ** modifies the statement going to the log debug - changes the delegate
		$delegate.debug = function (statement) {
			if (statement === 'Boo Angular') {
				$delegate.info('You\'re in the wrong place!');
			}
			else {
				$delegate.info(statement);
			}
		};

		return $delegate;
	});

});

//** tests the Decorator
angular.module('app').run(function ($log) {
	$log.debug('Boo Angular');
	$log.debug('Angular is too cool');
});

//*** Controller Example ***
angular.module('app').controller('personController', function($scope, $log, personService) {

	$log.debug('init personController');
	$scope.people = personService.get();
	$scope.firstName = 'Bill';
	$scope.lastName = 'LaPrise';

	$scope.clickMe = function () {
		window.alert("Uh oh!");
	}


	$scope.$watch(
		//** first function is the watched expression
		function () {
			return $scope.firstName + ' ' + $scope.lastName;
		},
		function(current, previous) {
		
		$log.debug('fullName', current);
		$scope.fullName = current;

		$scope.people = personService.get().success(function (data) {
			console.log(data);
		});

		$log.debug($scope.people);
	});
});


//*** Service Example using HTTP call to filltext.com ***
angular.module('app').service('personService', function($log, $http) {

	$log.debug('init personService');

	this.get = function () {
		var config = {
			params: {
				rows: 10,
				fname: '{firstName}',
            	lname: '{lastName}',
				// firstName: 'Bill',
				// ** NEEDED for using JSONP
				callback: 'JSON_CALLBACK'
				// delay: 2
			}
		};

		return $http.jsonp('http://filltext.com', config);

	};

});
// //*** Original Service Example ***
// angular.module('app').service('personService', function($log, peopleValue) {

// 	$log.debug('init personService');

// 	this.get = function () {
// 		return  peopleValue;
// 	};
// });




//*** Filter Example ***
angular.module('app').filter('isCool', function(ISCOOL) {
	return function (name) {
		return name + ' ' + ISCOOL;
	};
});


//*** Config Example ***
angular.module('app').config(function($logProvider) {
	$logProvider.debugEnabled(true);
});



//*** Value Example
angular.module('app').value('peopleValue', [
			{name: 'Steve Jobs'},
			{name: 'Sponge Bob'},
			{name: 'Bill Gates'},
			{name: 'Tom Jones'}
	]);


// *** Constant Example
angular.module('app').constant('ISCOOL', 'is really cool!');

//**** RUN Example
angular.module('app').run(function($log) {
	$log.debug('starting up');
});


//** Other directives
angular.module('app').directive('badguy', function() {

	return {
		restrict: 'A',
		template: '<strong>Always Clint!</strong>'
	}

});


angular.module('app').directive('loser', function() {

	return {
		restrict: 'A',
		template: '<strong>Weak Soup!</strong>'
	}

});



