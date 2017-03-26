(function () {
  'use strict';

  angular
    .module('slotgo.notes.services')
    .factory('Notes', Notes);

  Notes.$inject = ['$http'];

  function Notes($http) {
    var Notes = {
      all: all,
      create: create,
      get: get,
      remove: remove,
      download: download
    };

    return Notes;

    function all() {
      return $http.get('/api/v1/notes/');
    }

    function create(title, file, submitted_by, subject_id) {
      var fd = new FormData();
      fd.append('title', title);
      fd.append('file', file);
      fd.append('submitted_by', submitted_by);
      fd.append('subject_id', subject_id);
      return $http.post('/api/v1/notes/', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      });
    }
    
    function remove(notes_id) {
      return $http.delete('/api/v1/notes/' + notes_id + "/");
    }

    function get(noteID) {
      return $http.get('/api/v1/notes/' + noteID);
    }

    function download(notes_id, user_id){
      return $http.post('/api/v1/downloads/', {
        notes_id: notes_id,
        user_id: user_id
      });
    }
  }
})();