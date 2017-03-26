(function () {
  'use strict';

  angular
    .module('slotgo.profiles.services')
    .factory('Profile', Profile);

  Profile.$inject = ['$http'];

  function Profile($http) {
    var Profile = {
      destroy: destroy,
      get: get,
      getFaculty: getFaculty,
      getStudent: getStudent,
      update: update
    };

    return Profile;

    function destroy(profile) {
      if(profile.is_faculty) {
        $http.delete('/api/v1/faculty/' + profile.id + '/').then(facultyDeleteSuccessFn, facultyDeleteErrorFn);
        function facultyDeleteSuccessFn(data, status, config, headers){
        }
        function facultyDeleteErrorFn(data, status, config, headers){
        }
      }
      else{
        if(!profile.is_superuser){
          $http.delete('/api/v1/student/' + profile.id + '/').then(studentDeleteSuccessFn, studentDeleteErrorFn);
          function studentDeleteSuccessFn(data, status, config, headers){
          }
          function studentDeleteErrorFn(data, status, config, headers){
          }
        }
      }
      return $http.delete('/api/v1/user/' + profile.id + '/');
    }

    function get(user_id) {
      return $http.get('/api/v1/user/' + user_id + '/');
    }

    function update(profile, profile_extra_info) {
      if(profile.is_faculty){
        $http.put('/api/v1/faculty/' + profile.id + '/', profile_extra_info).then(facultyUpdateSuccessFn, facultyUpdateErrorFn);
        function facultyUpdateSuccessFn(data, status, config, headers){
        }
        function facultyUpdateErrorFn(data, status, config, headers){
        }
      }
      else{
        if(!profile.is_superuser){
          $http.put('/api/v1/student/' + profile.id + '/', profile_extra_info).then(studentUpdateSuccessFn, studentUpdateErrorFn);
          function studentUpdateSuccessFn(data, status, config, headers){
          }
          function studentUpdateErrorFn(data, status, config, headers){
          }
        }
      }
      return $http.put('/api/v1/user/' + profile.id + '/', profile);
    }

    function getFaculty(faculty_id){
      return $http.get('/api/v1/faculty/' + faculty_id + '/');
    }

    function getStudent(student_id){
      return $http.get('/api/v1/student/' + student_id + '/');
    }
  }
})();