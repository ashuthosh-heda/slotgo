(function () {
  'use strict';

  angular
    .module('slotgo.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Authentication'];

  function IndexController($scope, Authentication) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.isUserAdmin = Authentication.isUserAdmin();
    vm.isUserFaculty = Authentication.isUserFaculty();
  }
})();