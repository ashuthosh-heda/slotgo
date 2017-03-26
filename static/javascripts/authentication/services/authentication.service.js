(function () {
  'use strict';

  angular
    .module('slotgo.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http', '$mdToast'];

  function Authentication($cookies, $http, $mdToast) {
    var Authentication = {
      getAuthenticatedAccount: getAuthenticatedAccount,
      getBatches: getBatches,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
      register: register,
      registerFaculty: registerFaculty,
      registerStudent: registerStudent,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate,
      isUserAdmin: isUserAdmin,
      isUserFaculty: isUserFaculty
    };

    return Authentication;

    function getBatches(){
      return $http.get('/api/v1/batch/');
    }

    function register(email, password, username, first_name, last_name, contact_number, gender, 
            is_faculty, post, relation, relative_name, relative_phone_number, batch_id) {
      return $http.post('/api/v1/user/', {
        username: username,
        password: password,
        email: email,
        first_name: first_name,
        last_name: last_name,
        contact_number: contact_number,
        gender: gender,
        is_faculty: is_faculty
      }).then(registerSuccessFn, registerErrorFn);

      function registerSuccessFn(data, status, headers, config) {
        if(data.data.is_faculty){
          Authentication.registerFaculty(data.data.id, post);
        }
        else{
          Authentication.registerStudent(data.data.id, relation, relative_name, relative_phone_number, batch_id);
        }
        Authentication.login(username, password);
      }

      function registerErrorFn(data, status, headers, config) {
        alert(JSON.stringify(data.data));
      }
    }

    function registerFaculty(faculty_id, post) {
      return $http.post('/api/v1/faculty/', {
        faculty_id: faculty_id,
        post: post
      }).then(registerSuccessFn, registerErrorFn);

      function registerSuccessFn(data, status, headers, config) {
        
      }

      function registerErrorFn(data, status, headers, config) {
        
      }
    }

    function registerStudent(student_id, relation, relative_name, relative_phone_number, batch_id) {
      return $http.post('/api/v1/student/', {
        batch_id: batch_id, 
        student_id: student_id,
        relation: relation,
        relative_name: relative_name,
        relative_phone_number: relative_phone_number
      }).then(registerSuccessFn, registerErrorFn);

      function registerSuccessFn(data, status, headers, config) {
      }

      function registerErrorFn(data, status, headers, config) {
      }
    }

    function login(username, password) {
      return $http.post('/api/v1/auth/login/', {
        username: username, password: password
      }).then(loginSuccessFn, loginErrorFn);

      function loginSuccessFn(data, status, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);
        window.location = '/';
      }

      function loginErrorFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Invalid Credentials Entered')
            .position('bottom right')
            .hideDelay(3000));
      }
    }

    function logout() {
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

      function logoutSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();
        window.location = '/';
      }

      function logoutErrorFn(data, status, headers, config) {
      }
    }

    function getAuthenticatedAccount() {
      if (!$cookies.getObject("authenticatedAccount")) {
        return null;
      }

      return $cookies.getObject("authenticatedAccount");
    }

    function isAuthenticated() {
      return !!$cookies.getObject("authenticatedAccount");
    }

    function setAuthenticatedAccount(account) {
      $cookies.putObject("authenticatedAccount", account);
    }

    function unauthenticate() {
      delete $cookies.remove("authenticatedAccount");
    }

    function isUserAdmin(){
      var userData = Authentication.getAuthenticatedAccount();
      if(!userData) return false;
      return userData.is_superuser;
    }

    function isUserFaculty(){
      var userData = Authentication.getAuthenticatedAccount();
      if(!userData) return false;
      return userData.is_faculty;
    }
  }
})();