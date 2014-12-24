'use strict';

/**
 * @ngdoc function
 * @name gtbadAdvertisersApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the gtbadAdvertisersApp
 */
angular.module('gtbadAdvertisersApp')
  .controller('HeaderCtrl', function (auth, store, $location, $scope, Session) {
    $scope.login = function() {
      auth.signin({
        authParams: {
          scope: 'openid profile'
        }
      }, function(profile, token) {
        Session.save();
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
      $location.path('/');
    };
  });
