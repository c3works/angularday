angular.module('app', []);


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


	$scope.$watch(
		//** first function is the watched expression
		function () {
			return $scope.firstName + ' ' + $scope.lastName;
		},
		function(current, previous) {
		
		$log.debug('fullName', current);
		$scope.fullName = current;
	});
});



//*** Service Example ***
angular.module('app').service('personService', function($log, peopleValue) {

	$log.debug('init personService');

	this.get = function () {
		return  peopleValue;
	};
});




//*** Filter Example ***
angular.module('app').filter('isCool', function(ISCOOL) {
	return function (name) {
		return name + ' ' + ISCOOL;
	};
});


//*** Config Example ***
// angular.module('app').config(function($logProvider) {
// 	$logProvider.debugEnabled(true);
// });



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



