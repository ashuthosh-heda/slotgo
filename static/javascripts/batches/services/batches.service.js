(function () {
  'use strict';

  angular
    .module('slotgo.batches.services')
    .factory('Batches', Batches);

  Batches.$inject = ['$http'];

  function Batches($http) {
    var Batches = {
      all: all,
      create: create,
      remove: remove
    };

    return Batches;

    function all() {
      return $http.get('/api/v1/batch/');
    }

    function remove(batch_id) {
      return $http.delete('/api/v1/batch/' + batch_id + "/");
    }

    function create(batch, sem_number) {
      return $http.post('/api/v1/batch/', {
        batch: batch,
        sem_number: sem_number
      });
    }

    // function get(username) {
    //   return $http.get('/api/v1/accounts/' + username + '/Batches/');
    // }
  }
})();