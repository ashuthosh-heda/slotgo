angular.module('slotgo', [
	'file-model',
	'ngMessages',
	'ngAria',
	'ngAnimate',
	'ngMaterial',
	'slotgo.config',
	'slotgo.authentication',
	'slotgo.profiles',
	'slotgo.layout',
	'slotgo.routes',
	'slotgo.subjects',
	'slotgo.batches',
	'slotgo.batch-subject',
	'slotgo.student',
	'slotgo.faculty',
	'slotgo.faculty-subject',
	'slotgo.notes',
	'slotgo.downloads'
	]);

angular.module('slotgo.config', []);
angular.module('slotgo.routes', ['ngRoute']);

angular.module('slotgo').run(run);
run.$inject = ['$http'];

function run($http) {
	$http.defaults.xsrfHeaderName = 'X-CSRFToken';
	$http.defaults.xsrfCookieName = 'csrftoken';
}