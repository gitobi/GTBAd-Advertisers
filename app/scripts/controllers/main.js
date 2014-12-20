'use strict';

/**
 * @ngdoc function
 * @name gtbadAdvertisersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gtbadAdvertisersApp
 */
angular.module('gtbadAdvertisersApp')
  .controller('MainCtrl', function (auth, store, $location, $scope) {
    $scope.login = function() {
      auth.signin({
        authParams: {
          scope: 'openid profile'
        }
      }, function(profile, token) {
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/dashboard');
      }, function(err) {
        console.log('Error :(', err);
      });
    };
    $scope.logout = function() {
      auth.signout();
      store.remove('provile');
      store.remove('token');
    };
  });
