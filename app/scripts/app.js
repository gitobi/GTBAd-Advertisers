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
      .state('public', {
        views: {
          'main-container': {
            templateUrl: 'views/layouts/public-main-container.html'
          },
          'header-menu': {
            templateUrl: 'views/layouts/public-header-menu.html'
          }
        }
      })
      .state('public.root', {
        url: '/',
        views: {
          'content': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('public.about', {
        url: '/about',
        views: {
          'content': {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
          }
        }
      })
      .state('private', {
        views: {
          'main-container': {
            templateUrl: 'views/layouts/private-main-container.html'
          },
          'header-menu': {
            templateUrl: 'views/layouts/private-header-menu.html'
          }
        },
        data: {
          requiresLogin: true
        }
      })
      .state('private.dashboard', {
        url: '/dashboard',
        views: {
          'content': {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
          }
        }
      });
    authProvider.init({
      domain: 'gitobi.auth0.com',
      clientID: 'ysqq8S9N9pwsxGmYHmmJ161Tt2ri9rZJ',
      loginState: 'public.root'
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
