'use strict';

describe('Controller: CreativesCtrl', function () {

  // load the controller's module
  beforeEach(module('goyoukikiApp'));

  var CreativesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreativesCtrl = $controller('CreativesCtrl', {
      $scope: scope
    });
  }));

});
