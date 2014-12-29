'use strict';

/**
 * @ngdoc service
 * @name gtbadAdvertisersApp.Ad
 * @description
 * # Ad
 * Factory in the gtbadAdvertisersApp.
 */
angular.module('gtbadAdvertisersApp')
  .factory('Ad', function (Restangular) {
    return Restangular.service('ads');
  });
