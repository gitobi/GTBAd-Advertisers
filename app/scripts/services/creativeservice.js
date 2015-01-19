'use strict';

/**
 * @ngdoc service
 * @name goyoukikiApp.CreativeService
 * @description
 * # CreativeService
 * Factory in the goyoukikiApp.
 */
angular.module('goyoukikiApp')
  .factory('CreativeService', function ($upload, Creative) {

    var getNewCreative = function(file) {
      return Creative.one('new').get().then(
        function(response) {
          console.log('success get new creative');
          console.log(response);
          return { url: response.uploadHostUrl, uploadPath: response.uploadPath, awsAccessKeyId: response.key, policy: response.policy, signature: response.signature, file: file };
        }
      );
    };

    var uploadToS3 = function(newCreative) {
      return $upload.upload({
        url: newCreative.url,
        method: 'POST',
        transformRequest: function (data, headersGetter) {
          var headers = headersGetter();
          delete headers.Authorization;
          return data;
        },
        data: {
          key: newCreative.uploadPath + '${filename}',
          AWSAccessKeyId: newCreative.awsAccessKeyId,
          acl: 'public-read',
          Policy: newCreative.policy,
          Signature: newCreative.signature,
          'Content-Type': newCreative.file.type === null || newCreative.file.type === '' ? 'application/octet-stream' : newCreative.file.type
        },
        file: newCreative.file
      }).then(
        function(response) {
          console.log('success upload to s3');
          console.log(response);
          return newCreative.url + newCreative.uploadPath + newCreative.file.name;
        }
      );
    };

    var postCreative = function(url) {
      return Creative.post({ url: url }).then(
        function(response) {
          console.log('success post creative');
          console.log(response);
          return response;
        }
      );
    };

    var create = function(file) {
      return getNewCreative(file).then(uploadToS3).then(postCreative);
    };

    // Public API here
    return {
      create: create
    };
  });
