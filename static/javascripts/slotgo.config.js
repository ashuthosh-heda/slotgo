(function(){
	'use strict';

	angular.module('slotgo.config')
		.config(config);

	config.$inject = ['$locationProvider', '$compileProvider', '$mdThemingProvider'];

	function config($locationProvider, $compileProvider, $mdThemingProvider) {
		$mdThemingProvider.theme('default').primaryPalette('grey').accentPalette('grey');
		$locationProvider.html5Mode(true);
    	$locationProvider.hashPrefix('!');
    	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript|tel|blob|):/);
	}
})();