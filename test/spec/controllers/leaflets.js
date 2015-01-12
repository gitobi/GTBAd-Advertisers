'use strict';

describe('Controller: LeafletsCtrl', function () {

  // load the controller's module
  beforeEach(module('goyoukikiApp'));

  var LeafletsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LeafletsCtrl = $controller('LeafletsCtrl', {
      $scope: scope
    });
  }));

});
