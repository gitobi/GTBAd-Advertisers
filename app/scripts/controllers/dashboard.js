'use strict';

/**
 * @ngdoc function
 * @name gtbadAdvertisersApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the gtbadAdvertisersApp
 */
angular.module('gtbadAdvertisersApp')
  .controller('DashboardCtrl', function ($scope, auth) {
    $scope.auth = auth;
  });
