'use strict';

/**
 * @ngdoc function
 * @name goyoukikiApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the goyoukikiApp.
 */
angular.module('goyoukikiApp')
  .controller('DashboardCtrl', function ($scope, auth, Leaflet) {
    $scope.auth = auth;
    $scope.leaflets = Leaflet.getList().$object;
  });
