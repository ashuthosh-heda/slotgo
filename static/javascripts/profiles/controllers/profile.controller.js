(function () {
  'use strict';

  angular
    .module('slotgo.profiles.controllers')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
    '$location', '$routeParams', '$mdToast', 'Authentication', 'Profile'
  ];

  function ProfileController($location, $routeParams, $mdToast, Authentication, Profile) {
    var vm = this;

    vm.destroy = destroy;
    vm.update = update;
  
    activate();

    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      var username = $routeParams.username.substr(1);

      if (!authenticatedAccount) {
        $location.url('/');
        $mdToast.show(
            $mdToast.simple()
              .textContent('Not authorized')
              .position('bottom right')
              .hideDelay(3000));
      } else {
        // Redirect if logged in, but not the owner of this profile.
        vm.isUserAdmin = authenticatedAccount.is_superuser;
        if (authenticatedAccount.username !== username) {
          $location.url('/');
          Snackbar.error('You are not authorized to view this page.');
        }
      }

      Profile.get(authenticatedAccount.id).then(profileSuccessFn, profileErrorFn);
      function profileSuccessFn(data, status, headers, config) {
        vm.profile = data.data;
        vm.profile.contact_number = Number(vm.profile.contact_number);
      }

      function profileErrorFn(data, status, headers, config) {
        $location.url('/');
      }

      if(authenticatedAccount.is_faculty){
        Profile.getFaculty(authenticatedAccount.id).then(profileFacultySuccessFn, profileFacultyErrorFn);
        function profileFacultySuccessFn(data, status, headers, config) {
          vm.profile_extra_info = data.data;
        }
        function profileFacultyErrorFn(data, status, headers, config) {
          $location.url('/');
        }
      }
      else{
        if(!authenticatedAccount.is_superuser){
          Profile.getStudent(authenticatedAccount.id).then(profileStudentSuccessFn, profileStudentErrorFn);
          function profileStudentSuccessFn(data, status, headers, config) {
            vm.profile_extra_info = data.data;
            vm.profile_extra_info.relative_phone_number = Number(vm.profile_extra_info.relative_phone_number);
          }

          function profileStudentErrorFn(data, status, headers, config) {
            $location.url('/');
          }
        }
      }
    }

    Authentication.getBatches().then(batchesSuccessFn, batchesErrorFn);
    function batchesSuccessFn(data, status, headers, config) {
      vm.batches = data.data;
    }
    function batchesErrorFn(data, status, headers, config) {
    }

    function destroy() {
      Profile.destroy(vm.profile).then(profileSuccessFn, profileErrorFn);
      function profileSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();
        $mdToast.show(
            $mdToast.simple()
              .textContent('Your accound has been deleted')
              .position('bottom right')
              .hideDelay(3000));
        window.location = '/';
      }

      function profileErrorFn(data, status, headers, config) {
        $mdToast.show(
            $mdToast.simple()
              .textContent('Error : ' + JSON.stringify(data.data))
              .position('bottom right')
              .hideDelay(3000));
      }
    }

    function update() {
      Profile.update(vm.profile, vm.profile_extra_info).then(profileSuccessFn, profileErrorFn);
      function profileSuccessFn(data, status, headers, config) {
        $mdToast.show(
            $mdToast.simple()
              .textContent('Your accound has been updated')
              .position('bottom right')
              .hideDelay(3000));
        $location.url('/');
      }

      function profileErrorFn(data, status, headers, config) {
        $mdToast.show(
            $mdToast.simple()
              .textContent('Error : ' + JSON.stringify(data.data))
              .position('bottom right')
              .hideDelay(3000));
      }
    }
  }
})();