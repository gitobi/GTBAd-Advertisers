'use strict';

/**
 * @ngdoc function
 * @name goyoukikiApp.controller:LeafletsCtrl
 * @description
 * # LeafletsCtrl
 * Controller of the goyoukikiApp.
 */
angular.module('goyoukikiApp')
  .controller('LeafletsCtrl', function ($scope, $stateParams, Leaflet) {
    $scope.leaflets = Leaflet.getList().$object;
    if ($stateParams.id) {
      Leaflet.one($stateParams.id).get().then(
        function(leaflet) {
          $scope.leaflet = leaflet;
        }
      );
    }
    $scope.addLeaflet = function() {
      Leaflet.post($scope.newLeaflet).then(
        // Success callbacks
        function(leaflet) {
          $scope.leaflets.unshift(leaflet);
          $scope.newLeaflet = '';
          $scope.message = 'created';
        },
        // Error callbacks
        function(response) {
          $scope.response = response;
        }
      );
    };
    $scope.deleteLeaflet = function(leaflet) {
      leaflet.remove().then(
        function() {
          var index = $scope.leaflets.indexOf(leaflet);
          if (index >= 0) {
            $scope.leaflets.splice(index, 1);
          }
          $scope.message = 'removed';
        },
        function(response) {
          $scope.response = response;
        }
      );
    };
    $scope.editLeaflet = function(leaflet) {
      leaflet.put().then(
        function() {
          $scope.message = 'updated';
        },
        function(response) {
          $scope.response = response;
        }
      );
    };
  });
