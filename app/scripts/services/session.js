'use strict';

/**
 * @ngdoc service
 * @name gtbadAdvertisersApp.Session
 * @description
 * # Session
 * Factory in the gtbadAdvertisersApp.
 */
angular.module('gtbadAdvertisersApp')
  .factory('Session', function ($resource) {
    return $resource('https://gtbad-management-api.herokuapp.com/session');
  });
