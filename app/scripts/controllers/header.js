'use strict';

/**
 * @ngdoc function
 * @name goyoukikiApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the goyoukikiApp.
 */
angular.module('goyoukikiApp')
  .controller('HeaderCtrl', function (auth, store, $location, $scope, Session) {
    $scope.login = function() {
      auth.signin({
        authParams: {
          scope: 'openid profile'
        }
      }, function(profile, token) {
        Session.post();
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
