angular.module('app', ['ngResource', 'ngRoute']);

//*** Directives
angular.module('app').directive('quote', function() {
	return {
		//* allows implenting through Element, Attribute, Comment, or Class
		restrict: 'E',
		scope: {
			author: '@',   // @ indicates string
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




