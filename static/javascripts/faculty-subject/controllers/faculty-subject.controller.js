(function () {
  'use strict';

  angular
    .module('slotgo.faculty-subject.controllers')
    .controller('FacultySubjectController', FacultySubjectController);

  FacultySubjectController.$inject = ['$rootScope', '$scope', '$mdToast', 'Faculty', 'Subjects', 'FacultySubject'];

  function FacultySubjectController($rootScope, $scope, $mdToast, Faculty, Subjects, FacultySubject) {
    var nfs = this;

    nfs.submit = submit;
    nfs.delete = remove;

    Faculty.all().then(facultySuccessFn, facultyErrorFn);
    function facultySuccessFn(data, status, headers, config) {
      nfs.faculties = data.data;
    }
    function facultyErrorFn(data, status, headers, config) {
    }

    Subjects.all().then(subjectsSuccessFn, subjectsErrorFn);
    function subjectsSuccessFn(data, status, headers, config) {
      nfs.subjects = data.data;
      FacultySubject.all().then(facultySubjectSuccessFn, facultySubjectErrorFn);
      function facultySubjectSuccessFn(data, status, headers, config) {
        $rootScope.facultysubjects = data.data;
        for (var i = $rootScope.facultysubjects.length - 1; i >= 0; i--) {
          $rootScope.facultysubjects[i].subject_name = (nfs.subjects.filter(function(obj){return obj.id == $rootScope.facultysubjects[i].subject_id; }))[0].name;
          var tempFaculty = (nfs.faculties.filter(function(obj){return obj.id == $rootScope.facultysubjects[i].faculty_id; }))[0];
          $rootScope.facultysubjects[i].faculty_name = tempFaculty.first_name;
        }
      }
      function facultySubjectErrorFn(data, status, headers, config) {
      } 
    }
    function subjectsErrorFn(data, status, headers, config) {
    }

    
    
    function remove(facultysubject){
      FacultySubject.remove(facultysubject.id).then(facultySubjectDeleteSuccessFn, facultySubjectDeleteErrorFn);
      function facultySubjectDeleteSuccessFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Faculty-Subject Deleted Successfull!!')
            .position('bottom right')
            .hideDelay(3000));
        var index = $rootScope.facultysubjects.indexOf(facultysubject);
        $rootScope.facultysubjects.splice(index, 1);
      }
      function facultySubjectDeleteErrorFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Error: ' + JSON.stringify(data.data))
            .position('bottom right')
            .hideDelay(3000));
      }
    }

    function submit() {
      $scope.closeThisDialog();

      FacultySubject.create(nfs.faculty_id, nfs.subject_id).then(createFacultySubjectSuccessFn, createFacultySubjectErrorFn);
      function createFacultySubjectSuccessFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Faculty-Subject Added Successfull!!')
            .position('bottom right')
            .hideDelay(3000));
        $rootScope.facultysubjects.push(data.data);
        var i = $rootScope.facultysubjects.length - 1;
        $rootScope.facultysubjects[i].subject_name = (nfs.subjects.filter(function(obj){return obj.id == $rootScope.facultysubjects[i].subject_id; }))[0].name;
        var tempFaculty = (nfs.faculties.filter(function(obj){return obj.id == $rootScope.facultysubjects[i].faculty_id; }))[0];
        $rootScope.facultysubjects[i].faculty_name = tempFaculty.first_name;
      }
      
      function createFacultySubjectErrorFn(data, status, headers, config) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Error: ' + JSON.stringify(data.data))
            .position('bottom right')
            .hideDelay(3000));
      }
    }
  }
})();