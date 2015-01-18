'use strict';

/**
 * @ngdoc function
 * @name goyoukikiApp.controller:CreativesCtrl
 * @description
 * # CreativesCtrl
 * Controller of the goyoukikiApp
 */
angular.module('goyoukikiApp')
  .controller('CreativesCtrl', function ($scope, $upload, Creative) {
    $scope.creatives = Creative.getList().$object;
    $scope.files = '';
    $scope.$watch('files', function() {
      for (var i = 0; i < $scope.files.length; i++) {
        var file = $scope.files[i];
        Creative.one('new').get().then(function(response) {
          file.upload = $upload.upload({
            url: response.uploadHostUrl,
            method: 'POST',
            transformRequest: function (data, headersGetter) {
              //Headers change here
              var headers = headersGetter();
              delete headers.Authorization;
              return data;
            },
            data: {
              key: response.uploadPath + '${filename}',
              AWSAccessKeyId: response.key,
              acl: 'public-read',
              Policy: response.policy,
              Signature: response.signature,
              'Content-Type': file.type === null || file.type === '' ? 'application/octet-stream' : file.type
            },
            file: file
          }).success(
            function(data, status, headers, config) {
              Creative.post({url: response.uploadHostUrl + response.uploadPath + config.file.name}).then(
                function(creative) {
                  $scope.creatives.unshift(creative);
                }
              );
            }).error(
            function(data, status, headers, config) {
              console.log('error response: ' + data + ' status: ' + status + ' headers: ' + headers + ' config: ' + config);
            }
          );
        });
      }
    });
  });
