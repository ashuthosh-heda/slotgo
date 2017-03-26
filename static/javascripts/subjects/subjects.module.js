(function () {
  'use strict';

  angular
    .module('slotgo.subjects', [
      'slotgo.subjects.controllers',
      'slotgo.subjects.services'
    ]);

  angular
  	.module('slotgo.subjects.controllers', ['ngMaterial', 'ngDialog']);
  angular
    .module('slotgo.subjects.services', []);
})();