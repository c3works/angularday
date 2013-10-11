
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