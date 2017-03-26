(function () {
  'use strict';

  angular
    .module('slotgo.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', '$mdToast', 'Authentication'];

  function RegisterController($location, $scope, $mdToast, Authentication) {
    var vm = this;

    vm.register = register;

    activate();

    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    Authentication.getBatches().then(batchesSuccessFn, batchesErrorFn);
    function batchesSuccessFn(data, status, headers, config) {
      vm.batches = data.data;
    }
    function batchesErrorFn(data, status, headers, config) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Batches Retrival Failed. Connection Problem. Refresh Page.')
          .position('bottom right')
          .hideDelay(3000));  
    }

    function register() {
      if (vm.is_faculty == null){
        $mdToast.show(
          $mdToast.simple()
            .textContent('Is faculty Value Missing. Select Yes or No')
            .position('bottom right')
            .hideDelay(3000));
      }
      else if(vm.is_faculty == "true" && vm.post == null){
        $mdToast.show(
          $mdToast.simple()
            .textContent('Select Your Designation.')
            .position('bottom right')
            .hideDelay(3000));  
      }
      else if(vm.is_faculty == "false" && (vm.batch_id == null || vm.relation == null || vm.relative_phone_number == null)){
        $mdToast.show(
          $mdToast.simple()
            .textContent('Enter relative information correctly')
            .position('bottom right')
            .hideDelay(3000)); 
      }
      else{
        Authentication.register(vm.email, 
            vm.password, 
            vm.username,
            vm.first_name,
            vm.last_name,
            vm.contact_number,
            vm.gender,
            vm.is_faculty,
            vm.post,
            vm.relation,
            vm.relative_name,
            vm.relative_phone_number,
            vm.batch_id);
      }
    }
  }
})();