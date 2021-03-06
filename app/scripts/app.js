'use strict';

/**
 * @ngdoc overview
 * @name goyoukikiApp
 * @description
 * # goyoukikiApp
 *
 * Main module of the application.
 */
angular
  .module('goyoukikiApp', [
    'auth0',
    'angular-storage',
    'angular-jwt',
    'ui.router',
    'restangular',
    'angularFileUpload',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'config'
  ])
  .config(function ($stateProvider, $urlRouterProvider, RestangularProvider, authProvider, $httpProvider, jwtInterceptorProvider, ENV) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('public', {
        views: {
          'main-container': {
            templateUrl: 'views/layouts/public-main-container.html'
          },
          'header-menu': {
            templateUrl: 'views/layouts/public-header-menu.html',
            controller: 'HeaderCtrl'
          }
        }
      })
      .state('public.root', {
        url: '/',
        views: {
          'content': {
            templateUrl: 'views/main.html'
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
            templateUrl: 'views/layouts/private-header-menu.html',
            controller: 'HeaderCtrl'
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
      })
      .state('private.leaflets', {
        abstract: true,
        url: '/leaflets',
        views: {
          'content': {
            template: '<div ui-view></div>'
          }
        }
      })
      .state('private.leaflets.index', {
        url: '',
        templateUrl: 'views/leaflets.html',
        controller: 'LeafletsCtrl'
      })
      .state('private.leaflets.detail', {
        url: '/:id',
        templateUrl: 'views/leaflets.detail.html',
        controller: 'LeafletsCtrl'
      })
      .state('private.creatives', {
        abstract: true,
        url: '/creatives',
        views: {
          'content': {
            template: '<div ui-view></div>'
          }
        }
      })
      .state('private.creatives.index', {
        url: '',
        templateUrl: 'views/creatives.html',
        controller: 'CreativesCtrl'
      });
    RestangularProvider.setBaseUrl(ENV.apiUrl);
    RestangularProvider.setRequestSuffix('.json');
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
