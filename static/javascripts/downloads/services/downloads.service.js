(function () {
  'use strict';

  angular
    .module('slotgo.downloads.services')
    .factory('Downloads', Downloads);

  Downloads.$inject = ['$http'];

  function Downloads($http) {
    var Downloads = {
      all: all,
      getUsers: getUsers
    };

    return Downloads;

    function all() {
      return $http.get('/api/v1/downloads/');
    }

    function getUsers() {
      return $http.get('/api/v1/user/');
    }
  }
})();