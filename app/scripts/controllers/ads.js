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
        },
        // Error callbacks
        function(response) {
          $scope.response = response;
        }
      );
    };
  });
