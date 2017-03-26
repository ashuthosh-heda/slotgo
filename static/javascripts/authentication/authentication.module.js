(function () {
	'use strict';

	angular
		.module('slotgo.authentication', [
			'slotgo.authentication.controllers',
			'slotgo.authentication.services'
		]);

	angular
		.module('slotgo.authentication.controllers', []);
	angular
		.module('slotgo.authentication.services', ['ngCookies']);
})();