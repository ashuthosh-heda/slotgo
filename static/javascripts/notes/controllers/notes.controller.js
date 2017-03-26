(function () {
  'use strict';

  angular
    .module('slotgo.notes.controllers')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['$rootScope', '$scope', 'Authentication', '$mdToast', 'FacultySubject', 'BatchSubject', 'Student', 'Notes', 'Subjects'];

  function NotesController($rootScope, $scope, Authentication, $mdToast, FacultySubject, BatchSubject, Student, Notes, Subjects) {
  	var nn = this;

    if(!!Authentication.getAuthenticatedAccount()){
      nn.submitted_by = Authentication.getAuthenticatedAccount().id;
      nn.isUserFaculty = Authentication.isUserFaculty();
      nn.isUserAdmin = Authentication.getAuthenticatedAccount().is_superuser;
    }
    nn.submit = submit;
    nn.remove = remove;
    nn.download = download;
    nn.showNotes = false;
    nn.uploadComplete = false;

  	Subjects.all().then(subjectsSuccessFn, subjectsErrorFn);
    function subjectsSuccessFn(data, status, headers, config) {
      nn.subjects = data.data;
      FacultySubject.all().then(facultySubjectSuccessFn, facultySubjectErrorFn);
      function facultySubjectSuccessFn(data, status, headers, config) {
        nn.facultysubjects = data.data;
        for (var i = nn.facultysubjects.length - 1; i >= 0; i--) {
          nn.facultysubjects[i].subject_name = (nn.subjects.filter(function(obj){return obj.id == nn.facultysubjects[i].subject_id; }))[0].name;
        }
        nn.facultysubjects = nn.facultysubjects.filter(function(obj){ return obj.faculty_id == nn.submitted_by; });
      }
      function facultySubjectErrorFn(data, status, headers, config) {
      }

      Notes.all().then(notesSuccessFn, notesErrorFn);
      function notesSuccessFn(data, status, headers, config) {
        $rootScope.notes = data.data;
        for (var i = $rootScope.notes.length - 1; i >= 0; i--) {
          $rootScope.notes[i].subject_name = (nn.subjects.filter(function(obj){return obj.id == $rootScope.notes[i].subject_id; }))[0].name;
        }
        if(!nn.isUserFaculty){
          BatchSubject.all().then(batchSubjectSuccessFn, batchSubjectErrorFn);
          function batchSubjectSuccessFn(data, status, headers, config) {
            nn.studentbatchsubjects = data.data;
            if(Authentication.isAuthenticated() && !nn.isUserAdmin){
              Student.get(nn.submitted_by).then(studentSuccessFn, studentErrorFn);
              function studentSuccessFn(data, status, headers, config) {
                nn.student = data.data;
                nn.studentbatchsubjects = nn.studentbatchsubjects.filter(function(obj){ return obj.batch_id == nn.student.batch_id});
                var i, j, check;
                for (i = $rootScope.notes.length - 1; i >= 0; i--) {
                  check = false;
                  for (j = nn.studentbatchsubjects.length - 1; j >= 0; j--) {
                    if ($rootScope.notes[i].subject_id == nn.studentbatchsubjects[j].subject_id){
                      check = true;
                    }
                  }
                  if (check == false) {
                    var index = $rootScope.notes.indexOf($rootScope.notes[i]);
                    $rootScope.notes.splice(index, 1);
                  }
                }     
              }
              function studentErrorFn(data, status, headers, config) {
              }
            }
          }

          function batchSubjectErrorFn(data, status, headers, config) {
          }
        }
        nn.showNotes = true;
      }
      function notesErrorFn(data, status, headers, config) {
      }
    }
    function subjectsErrorFn(data, status, headers, config) {
    }

  	function remove(note) {
        Notes.remove(note.id).then(notesDeleteSuccessFn, notesDeleteErrorFn);
        function notesDeleteSuccessFn(data, status, headers, config) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Notes Deleted Successfull!!')
              .position('bottom right')
              .hideDelay(3000));
          var index = $rootScope.notes.indexOf(note);
          $rootScope.notes.splice(index, 1);
        }
        function notesDeleteErrorFn(data, status, headers, config) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Error: ' + JSON.stringify(data.data))
              .position('bottom right')
              .hideDelay(3000));
        }  
  	}

  	function submit() {
      nn.uploadComplete = true;
  		Notes.create(nn.title, nn.file, nn.submitted_by, nn.subject_id).then(notesSuccessFn, notesErrorFn);
  		function notesSuccessFn(data, status, headers, config) {
        nn.uploadComplete = false;
  			$mdToast.show(
	          $mdToast.simple()
	            .textContent('Notes Added Successfull!!')
	            .position('bottom right')
	            .hideDelay(3000));
        $scope.closeThisDialog();
        $rootScope.notes.push(data.data);
        var i = $rootScope.notes.length - 1;
        $rootScope.notes[i].subject_name = (nn.subjects.filter(function(obj){return obj.id == $rootScope.notes[i].subject_id; }))[0].name;
  		}

  		function notesErrorFn(data, status, headers, config) {
        nn.uploadComplete = false;
  			$mdToast.show(
	          $mdToast.simple()
	            .textContent('Error: ' + JSON.stringify(data.data))
	            .position('bottom right')
	            .hideDelay(3000));
  		}
  	}

    function download(note) {
      Notes.download(note.id, nn.submitted_by).then(downloadSuccessFn, downloadErrorFn);
      function downloadSuccessFn(data, status, headers, config) {}
      function downloadErrorFn(data, status, headers, config) {}
    }
  }
})();