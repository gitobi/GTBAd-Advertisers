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
    'auth0',
    'angular-storage',
    'angular-jwt',
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('root', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        data: {
          requiresLogin: true
        }
      });
    authProvider.init({
      domain: 'gitobi.auth0.com',
      clientID: 'ysqq8S9N9pwsxGmYHmmJ161Tt2ri9rZJ',
      loginState: 'root'
    });
    jwtInterceptorProvider.tokenGetter = ['store', function(store) {
      return store.get('token');
    }];
    $httpProvider.interceptors.push('jwtInterceptor');
  })
  .run(function($rootScope, auth, store, jwtHelper, $location) {
    $rootScope.$on('$locationChangeStart', function() {
      if (!auth.isAuthenticated) {
        var token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            auth.authenticate(store.get('profile'), token);
          } else {
            $location.path('/');
          }
        }
      }
    });
  });
