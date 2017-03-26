(function () {
  'use strict';

  angular
    .module('slotgo.faculty-subject.services')
    .factory('FacultySubject', FacultySubject);

  FacultySubject.$inject = ['$http'];

  function FacultySubject($http) {
    var FacultySubject = {
      all: all,
      create: create,
      remove: remove
    };

    return FacultySubject;

    function all() {
      return $http.get('/api/v1/subject-faculty/');
    }

    function remove(FacultySubject_id) {
      return $http.delete('/api/v1/subject-faculty/' + FacultySubject_id + "/");
    }

    function create(faculty_id, subject_id) {
      return $http.post('/api/v1/subject-faculty/', {
        faculty_id: faculty_id,
        subject_id: subject_id
      });
    }
  }
})();