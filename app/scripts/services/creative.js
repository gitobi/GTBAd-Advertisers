'use strict';

/**
 * @ngdoc service
 * @name goyoukikiApp.Creative
 * @description
 * # Creative
 * Service in the goyoukikiApp.
 */
angular.module('goyoukikiApp')
  .factory('Creative', function (Restangular) {
    return Restangular.service('creatives');
  });
