(function () {
  'use strict';

  angular
    .module('slotgo.batch-subject.controllers')
    .controller('BatchSubjectController', BatchSubjectController);

  BatchSubjectController.$inject = ['$rootScope', '$scope', '$mdToast', 'Batches', 'Subjects', 'BatchSubject'];

  function BatchSubjectController($rootScope, $scope, $mdToast, Batches, Subjects, BatchSubject) {
    var nbs = this;

    nbs.submit = submit;
    nbs.delete = remove;

    Batches.all().then(batchesSuccessFn, batchesErrorFn);
    function batchesSuccessFn(data, status, headers, config) {
      nbs.batches = data.data;
    }
    function batchesErrorFn(data, status, headers, config) {
    }

    Subjects.all().then(subjectsSuccessFn, subjectsErrorFn);
    function subjectsSuccessFn(data, status, headers, config) {
      nbs.subjects = data.data;
      BatchSubject.all().then(batchSubjectSuccessFn, batchSubjectErrorFn);
      function batchSubjectSuccessFn(data, status, headers, config) {
        $rootScope.batchsubject = data.data;
        for (var i = $rootScope.batchsubject.length - 1; i >= 0; i--) {
          $rootScope.batchsubject[i].subject_name = (nbs.subjects.filter(function(obj){return obj.id == $rootScope.batchsubject[i].subject_id; }))[0].name;
          var tempBatch = (nbs.batches.filter(function(obj){return obj.id == $rootScope.batchsubject[i].batch_id; }))[0];
          $rootScope.batchsubject[i].batch_name = tempBatch.batch + ":" + tempBatch.sem_number;
        }
      }
      function batchSubjectErrorFn(data, status, headers, config) {
      }
    }
    function subjectsErrorFn(data, status, headers, config) {
    }
    
    function remove(batchsubject){
      BatchSubject.remove(batchsubject.id).then(batchSubjectDeleteSuccessFn, batchSubjectDeleteErrorFn);
      function batchSubjectDeleteSuccessFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Batch-Subject Deleted Successfull!!')
            .position('bottom right')
            .hideDelay(3000));
        var index = $rootScope.batchsubject.indexOf(batchsubject);
        $rootScope.batchsubject.splice(index, 1);
      }
      function batchSubjectDeleteErrorFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Error: ' + JSON.stringify(data.data))
            .position('bottom right')
            .hideDelay(3000));
      }
    }

    function submit() {
      $scope.closeThisDialog();

      BatchSubject.create(nbs.batch_id, nbs.subject_id).then(createBatchSubjectSuccessFn, createBatchSubjectErrorFn);
      function createBatchSubjectSuccessFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('BatchSubject Added Successfull!!')
            .position('bottom right')
            .hideDelay(3000));
        $rootScope.batchsubject.push(data.data);
        var i = $rootScope.batchsubject.length - 1;
        $rootScope.batchsubject[i].subject_name = (nbs.subjects.filter(function(obj){return obj.id == $rootScope.batchsubject[i].subject_id; }))[0].name;
        var tempBatch = (nbs.batches.filter(function(obj){return obj.id == $rootScope.batchsubject[i].batch_id; }))[0];
        $rootScope.batchsubject[i].batch_name = tempBatch.batch + ":" + tempBatch.sem_number;
      }
      
      function createBatchSubjectErrorFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Error: ' + JSON.stringify(data.data))
            .position('bottom right')
            .hideDelay(3000));
      }
    }
  }
})();