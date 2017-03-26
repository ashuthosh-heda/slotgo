(function (){

	angular
		.module('slotgo.routes')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider.when('/register', {
			controller: 'RegisterController',
			controllerAs: 'vm',
			templateUrl: '/static/templates/authentication/register.html'
			// resolve: {
			// 	auth: function(Authentication, $q){
			// 	    if(Authentication.isAuthenticated()){ 
			// 	    	$location.url('/');
			//     		return $q.reject();
			// 		}
			// 		return $q.resolve();
			// 	}
			// }
		}).when('/', {
    		controller: 'IndexController',
    		controllerAs: 'vm',
      		templateUrl: '/static/templates/layout/index.html'
    	}).when('/+:username', {
	      controller: 'ProfileController',
	      controllerAs: 'vm',
	      templateUrl: '/static/templates/authentication/profiles.html'
	    }).otherwise('/');
	}

})();