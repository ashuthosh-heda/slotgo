(function () {
  'use strict';

  angular
    .module('slotgo.batch-subject', [
      'slotgo.batch-subject.controllers',
      'slotgo.batch-subject.services'
    ]);

  angular
  	.module('slotgo.batch-subject.controllers', ['ngMaterial', 'ngDialog']);
  angular
    .module('slotgo.batch-subject.services', []);
})();