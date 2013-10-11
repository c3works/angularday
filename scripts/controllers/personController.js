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