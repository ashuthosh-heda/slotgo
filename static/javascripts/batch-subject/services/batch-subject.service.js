(function () {
  'use strict';

  angular
    .module('slotgo.batch-subject.services')
    .factory('BatchSubject', BatchSubject);

  BatchSubject.$inject = ['$http'];

  function BatchSubject($http) {
    var BatchSubject = {
      all: all,
      create: create,
      remove: remove
    };

    return BatchSubject;

    function all() {
      return $http.get('/api/v1/batch-subject/');
    }

    function remove(batchsubject_id) {
      return $http.delete('/api/v1/batch-subject/' + batchsubject_id + "/");
    }

    function create(batch_id, subject_id) {
      return $http.post('/api/v1/batch-subject/', {
        batch_id: batch_id,
        subject_id: subject_id
      });
    }
  }
})();