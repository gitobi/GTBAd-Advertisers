'use strict';

/**
 * @ngdoc function
 * @name gtbadAdvertisersApp.controller:AdsCtrl
 * @description
 * # AdsCtrl
 * Controller of the gtbadAdvertisersApp
 */
angular.module('gtbadAdvertisersApp')
  .controller('AdsCtrl', function ($scope, $stateParams, Ad) {
    $scope.ads = Ad.getList().$object;
    if ($stateParams.id) {
      Ad.one($stateParams.id).get().then(
        function(ad) {
          $scope.ad = ad;
        }
      );
    }
    $scope.addAd = function() {
      Ad.post($scope.newAd).then(
        // Success callbacks
        function(ad) {
          $scope.ads.unshift(ad);
          $scope.newAd = '';
          $scope.message = 'created';
        },
        // Error callbacks
        function(response) {
          $scope.response = response;
        }
      );
    };
    $scope.deleteAd = function(ad) {
      ad.remove().then(
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
    $scope.editAd = function(ad) {
      ad.put().then(
        function() {
          $scope.message = 'updated';
        },
        function(response) {
          $scope.response = response;
        }
      );
    };
  });