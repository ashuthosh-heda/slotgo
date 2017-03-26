(function () {
  'use strict';

  angular
    .module('slotgo.batches.controllers')
    .controller('BatchController', BatchController);

  BatchController.$inject = ['$rootScope', '$route', '$scope', '$mdToast', 'Batches'];

  function BatchController($rootScope, $route, $scope, $mdToast, Batches) {
    var nb = this;

    nb.submit = submit;
    nb.delete = remove;

    Batches.all().then(batchesSuccessFn, batchesErrorFn);
    function batchesSuccessFn(data, status, headers, config) {
      $rootScope.batches = data.data;
    }
    function batchesErrorFn(data, status, headers, config) {
    }

    function remove(batch){
      Batches.remove(batch.id).then(batchDeleteSuccessFn, batchDeleteErrorFn);
      function batchDeleteSuccessFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Batch Deleted Successfull!!')
            .position('bottom right')
            .hideDelay(3000));
        var index = $rootScope.batches.indexOf(batch);
        $rootScope.batches.splice(index, 1);
      }
      function batchDeleteErrorFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Error: ' + JSON.stringify(data.data))
            .position('bottom right')
            .hideDelay(3000));
      }
    }

    function submit() {
      Batches.create(nb.batch, nb.sem_number).then(createBatchSuccessFn, createBatchErrorFn);
      function createBatchSuccessFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Batch Added Successfull!!')
            .position('bottom right')
            .hideDelay(3000));
        $scope.closeThisDialog();
        $rootScope.batches.push(data.data);
      }
      
      function createBatchErrorFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Error: ' + JSON.stringify(data.data))
            .position('bottom right')
            .hideDelay(3000));
      }
    }
  }
})();