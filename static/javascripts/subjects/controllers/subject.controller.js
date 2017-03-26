(function () {
  'use strict';

  angular
    .module('slotgo.subjects.controllers')
    .controller('SubjectController', SubjectController);

  SubjectController.$inject = ['$rootScope', '$scope', '$route','Authentication', '$mdToast', 'Subjects'];

  function SubjectController($rootScope, $scope, $route, Authentication, $mdToast, Subjects) {
    var ns = this;

    ns.submit = submit;
    ns.delete = remove;

    Subjects.all().then(subjectsSuccessFn, subjectsErrorFn);
    function subjectsSuccessFn(data, status, headers, config) {
      $rootScope.subjects = data.data;
    }
    function subjectsErrorFn(data, status, headers, config) {
    }

    function remove(subject){
      Subjects.remove(subject.id).then(subjectDeleteSuccessFn, subjectDeleteErrorFn);
      function subjectDeleteSuccessFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Subject Deleted Successfull!!')
            .position('bottom right')
            .hideDelay(3000));
        var index = $rootScope.subjects.indexOf(subject);
        $rootScope.subjects.splice(index, 1);
      }
      function subjectDeleteErrorFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Error: ' + JSON.stringify(data.data))
            .position('bottom right')
            .hideDelay(3000));
      }
    }

    function submit() {
      $scope.closeThisDialog();

      Subjects.create(ns.name, ns.abbreviation).then(createSubjectSuccessFn, createSubjectErrorFn);
      function createSubjectSuccessFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Subject Added Successfull!!')
            .position('bottom right')
            .hideDelay(3000));
        $rootScope.subjects.push(data.data);
      }
      
      function createSubjectErrorFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Error: ' + JSON.stringify(data.data))
            .position('bottom right')
            .hideDelay(3000));
      }
    }
  }
})();