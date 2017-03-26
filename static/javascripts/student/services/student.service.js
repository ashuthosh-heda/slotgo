(function () {
  'use strict';

  angular
    .module('slotgo.student.services')
    .factory('Student', Student);

  Student.$inject = ['$http'];

  function Student($http) {
    var Student = {
      all: all,
      get: get
    };

    return Student;

    function all() {
      return $http.get('/api/v1/student/');
    }

    function get(user_id) {
      return $http.get('/api/v1/student/' + user_id + '/');
    }
  }
})();