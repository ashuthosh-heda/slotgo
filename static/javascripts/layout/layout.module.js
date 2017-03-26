(function () {
  'use strict';

  angular
    .module('slotgo.layout', [
      'slotgo.layout.controllers'
    ]);

  angular
    .module('slotgo.layout.controllers', ['ngMaterial', 'ngDialog']);
})();