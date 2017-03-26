(function () {
  'use strict';

  angular
    .module('slotgo.batches', [
      'slotgo.batches.controllers',
      'slotgo.batches.services'
    ]);

  angular
  	.module('slotgo.batches.controllers', ['ngMaterial', 'ngDialog']);
  angular
    .module('slotgo.batches.services', []);
})();