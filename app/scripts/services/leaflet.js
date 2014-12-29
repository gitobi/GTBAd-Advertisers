'use strict';

/**
 * @ngdoc service
 * @name goyoukikiApp.Leaflet
 * @description
 * # Leaflet
 * Factory in the goyoukikiApp.
 */
angular.module('goyoukikiApp')
  .factory('Leaflet', function (Restangular) {
    return Restangular.service('leaflets');
  });
