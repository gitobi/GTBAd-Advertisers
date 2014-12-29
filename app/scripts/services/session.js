'use strict';

/**
 * @ngdoc service
 * @name goyoukikiApp.Session
 * @description
 * # Session
 * Factory in the goyoukikiApp.
 */
angular.module('goyoukikiApp')
  .factory('Session', function (Restangular) {
    return Restangular.service('session');
  });
