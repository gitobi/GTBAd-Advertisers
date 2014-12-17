'use strict';

/**
 * @ngdoc overview
 * @name gtbadAdvertisersApp
 * @description
 * # gtbadAdvertisersApp
 *
 * Main module of the application.
 */
angular
  .module('gtbadAdvertisersApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
