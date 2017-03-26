(function () {
  'use strict';

  angular
    .module('slotgo.faculty.services')
    .factory('Faculty', Faculty);

  Faculty.$inject = ['$http'];

  function Faculty($http) {
    var Faculty = {
      all: all
    };

    return Faculty;

    function all() {
      return $http.get('/api/v1/faculty-user/');
    }
  }
})();