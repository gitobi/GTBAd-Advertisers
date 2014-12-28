'use strict';

describe('Controller: AdsCtrl', function () {

  // load the controller's module
  beforeEach(module('gtbadAdvertisersApp'));

  var AdsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdsCtrl = $controller('AdsCtrl', {
      $scope: scope
    });
  }));

});
