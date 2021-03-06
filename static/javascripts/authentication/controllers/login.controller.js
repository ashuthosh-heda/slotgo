(function () {
  'use strict';

  angular
    .module('slotgo.authentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'Authentication'];

  function LoginController($location, $scope, Authentication) {
    var vm = this;

    vm.login = login;
    vm.isAuthenticated = Authentication.isAuthenticated();

    activate();

    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    function login() {
      Authentication.login(vm.username, vm.password);
    }
  }
})();