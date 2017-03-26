(function () {
  'use strict';

  angular
    .module('slotgo.downloads.controllers')
    .controller('DownloadsController', DownloadsController);

  DownloadsController.$inject = ['$rootScope', '$scope', 'Authentication', 'Downloads', 'Notes'];

  function DownloadsController($rootScope, $scope, Authentication, Downloads, Notes) {
  	var nd = this;

    nd.report = [];
    nd.showList = false;

    if(!!Authentication.getAuthenticatedAccount()){
      nd.faculty_id = Authentication.getAuthenticatedAccount().id;
    }

    Downloads.all().then(downloadsRetrieveSuccessFn, downloadsRetrieveErrorFn);
    function downloadsRetrieveSuccessFn(data, status, headers, config) {
      nd.downloads = data.data;
      Notes.all().then(notesSuccessFn, notesErrorFn);
      function notesSuccessFn(data, status, headers, config) {
        nd.notes = data.data;
        var i, j;
        for(i = nd.downloads.length - 1; i >= 0; i--){
          for(j = nd.notes.length - 1; j >= 0; j--){
            if(nd.downloads[i].notes_id == nd.notes[j].id){
              if(nd.notes[j].submitted_by != nd.faculty_id){
                var index = nd.downloads.indexOf(nd.downloads[i]);
                nd.downloads.splice(index, 1);
                break;
              }
            }
          }
        }
        for (i = nd.downloads.length - 1; i >= 0; i--) {
          nd.downloads[i].notes_name = (nd.notes.filter(function(obj){return obj.id == nd.downloads[i].notes_id; }))[0].title;
          nd.report.push({notes_id:nd.downloads[i].notes_id, notes_name:nd.downloads[i].notes_name, users:[]});
        }
        nd.report = UniqueArray(nd.report ,"notes_id");
        function UniqueArray(collection, keyname) {
          var output = [], keys = [];

          angular.forEach(collection, function(item) {
              var key = item[keyname];
              if(keys.indexOf(key) === -1) {
                  keys.push(key);
                  output.push(item);
              }
          });
          return output;
        }
        Downloads.getUsers().then(userSuccessFn,userErrorFn);
        function userSuccessFn(data, status, headers, config) {
          var i, j, users = data.data;
          for(i = nd.report.length - 1; i >= 0; i--) {
            for(j = nd.downloads.length - 1; j >= 0; j--){
              if (nd.report[i].notes_id == nd.downloads[j].notes_id){
                var user = (users.filter(function(obj){return obj.id == nd.downloads[j].user_id; }))[0];
                nd.report[i].users.push(user);
              }
            }
          }
          nd.showList = true;
        }
        function userErrorFn(data, status, headers, config) {
        }
      } 
      function notesErrorFn(data, status, headers, config) {
      }
    }

    function downloadsRetrieveErrorFn(data, status, headers, config) {
    }
  }

})();