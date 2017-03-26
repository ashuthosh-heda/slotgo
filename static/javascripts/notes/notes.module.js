(function () {
  'use strict';

  angular
    .module('slotgo.notes', [
      'slotgo.notes.services',
      'slotgo.notes.controllers'
    ]);

  angular.module('slotgo.notes.controllers', ['ngDialog', 'ngMaterial']);
  angular.module('slotgo.notes.services', []);
})();