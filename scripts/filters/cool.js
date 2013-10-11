//*** Filter Example ***
angular.module('app').filter('isCool', function(ISCOOL) {
	return function (name) {
		return name + ' ' + ISCOOL;
	};
});