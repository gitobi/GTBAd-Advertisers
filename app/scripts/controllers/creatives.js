'use strict';

/**
 * @ngdoc function
 * @name goyoukikiApp.controller:CreativesCtrl
 * @description
 * # CreativesCtrl
 * Controller of the goyoukikiApp
 */
angular.module('goyoukikiApp')
  .controller('CreativesCtrl', function ($scope, $upload, Restangular, Creative) {
    $scope.creatives = Creative.getList().$object;
    var newCreative = Restangular.oneUrl('creativenew', 'http://localhost:3000/creatives/new').get().$object;
    $scope.files = '';
    $scope.$watch('files', function() {
      for (var i = 0; i < $scope.files.length; i++) {
        var file = $scope.files[i];
        file.upload = $upload.upload({
          url: newCreative.uploadHostUrl,
          method: 'POST',
          transformRequest: function (data, headersGetter) {
            //Headers change here
            var headers = headersGetter();
            delete headers.Authorization;
            return data;
          },
          data: {
            key: newCreative.uploadPath + '${filename}',
            AWSAccessKeyId: newCreative.key,
            acl: 'public-read',
            Policy: newCreative.policy,
            Signature: newCreative.signature,
            'Content-Type': file.type === null || file.type === '' ? 'application/octet-stream' : file.type
          },
          file: file
        }).success(
          function(data, status, headers, config) {
            console.log('success response: ' + data + ' status: ' + status + ' headers: ' + headers + ' key: ' + newCreative.uploadPath + config.file.name);
            Creative.post({url: newCreative.uploadHostUrl + newCreative.uploadPath + config.file.name}).then(
              function(creative) {
                $scope.creatives.unshift(creative);
              }
            );
          }).error(
          function(data, status, headers, config) {
            console.log('error response: ' + data + ' status: ' + status + ' headers: ' + headers + ' config: ' + config);
          }
        );
      }
    });
  });
