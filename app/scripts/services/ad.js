'use strict';

/**
 * @ngdoc service
 * @name gtbadAdvertisersApp.Ad
 * @description
 * # Ad
 * Factory in the gtbadAdvertisersApp.
 */
angular.module('gtbadAdvertisersApp')
  .factory('Ad', function ($resource) {
    return $resource('http://localhost:3000/ads/:id');
  });
