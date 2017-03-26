(function () {
  'use strict';

  angular
    .module('slotgo.subjects.services')
    .factory('Subjects', Subjects);

  Subjects.$inject = ['$http'];

  function Subjects($http) {
    var Subjects = {
      all: all,
      create: create,
      remove: remove
    };

    return Subjects;

    function all() {
      return $http.get('/api/v1/subject/');
    }

    function remove(subject_id) {
      return $http.delete('/api/v1/subject/' + subject_id + "/");
    }

    function create(name, abbreviation) {
      return $http.post('/api/v1/subject/', {
        name: name,
        abbreviation: abbreviation
      });
    }

    // function get(username) {
    //   return $http.get('/api/v1/accounts/' + username + '/Subjects/');
    // }
  }
})();