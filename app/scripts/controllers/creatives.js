'use strict';

/**
 * @ngdoc function
 * @name goyoukikiApp.controller:CreativesCtrl
 * @description
 * # CreativesCtrl
 * Controller of the goyoukikiApp
 */
angular.module('goyoukikiApp')
  .controller('CreativesCtrl', function ($scope, $upload, Creative, CreativeService) {
    $scope.creatives = Creative.getList().$object;
    $scope.files = '';
    $scope.$watch('files', function() {
      for (var i = 0; i < $scope.files.length; i++) {
        var file = $scope.files[i];
        CreativeService.create(file).then(
          function(creative) {
            console.log('success at creative.js');
            console.log(creative);
            $scope.creatives.unshift(creative);
          },
          function(data, status, headers, config) {
            console.log('error response: ' + data + ' status: ' + status + ' headers: ' + headers + ' config: ' + config);
          }
        );
      }
    });
  });
