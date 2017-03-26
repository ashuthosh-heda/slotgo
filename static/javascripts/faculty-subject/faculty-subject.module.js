(function () {
  'use strict';

  angular
    .module('slotgo.faculty-subject', [
      'slotgo.faculty-subject.controllers',
      'slotgo.faculty-subject.services'
    ]);

  angular
  	.module('slotgo.faculty-subject.controllers', ['ngMaterial', 'ngDialog']);
  angular
    .module('slotgo.faculty-subject.services', []);
})();