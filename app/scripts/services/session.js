'use strict';

/**
 * @ngdoc service
 * @name gtbadAdvertisersApp.Session
 * @description
 * # Session
 * Factory in the gtbadAdvertisersApp.
 */
angular.module('gtbadAdvertisersApp')
  .factory('Session', function (Restangular) {
    return Restangular.service('session');
  });
