'use strict';

/**
 * @ngdoc function
 * @name gtbadAdvertisersApp.controller:AdsCtrl
 * @description
 * # AdsCtrl
 * Controller of the gtbadAdvertisersApp
 */
angular.module('gtbadAdvertisersApp')
  .controller('AdsCtrl', function ($scope, Ad) {
    $scope.ads = Ad.query();
    $scope.newAd = new Ad();
    $scope.addAd = function() {
      $scope.newAd.$save().then(
        // Success callbacks
        function(ad) {
          $scope.ads.unshift(ad);
          $scope.newAd = new Ad();
          $scope.message = 'created';
        },
        // Error callbacks
        function(response) {
          $scope.response = response;
        }
      );
    };
    $scope.deleteAd = function(ad) {
      Ad.remove(ad).$promise.then(
        function() {
          var index = $scope.ads.indexOf(ad);
          if (index >= 0) {
            $scope.ads.splice(index, 1);
          }
          $scope.message = 'removed';
        },
        function(response) {
          $scope.response = response;
        }
      );
    };
  });
