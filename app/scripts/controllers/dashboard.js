'use strict';

/**
 * @ngdoc function
 * @name gtbadAdvertisersApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the gtbadAdvertisersApp
 */
angular.module('gtbadAdvertisersApp')
  .controller('DashboardCtrl', function ($scope, auth, Ad) {
    $scope.auth = auth;
    $scope.ads = Ad.getList().$object;
  });
