(function() {
  'use strict';

  angular.module('app', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
      $routeProvider
       .when('/', {
        templateUrl: '/templates/home.html',
        controller: 'HomeController',
        resolve: {
          currentUser: function ($http) {

            // if the browser has a token
            if (localStorage.getItem('token')) {

              // call /me endpoint, and pass it the token
              const config = {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              }

              return $http.get('/api/v1/users/me', config)
                .then(function (response) {
                  return response.data
                })
                .catch(function () {
                  localStorage.clear();
                  return null;
                })

            }
          }
        }
      })
      .when('/signup', {
        templateUrl: '/templates/signup.html',
        controller: 'SignupController'
      })
      .when('/beers', {
        templateUrl: '/templates/beers.html',
        controller: 'BeersController',
        requiresLogin: true,
        resolve: {
          currentUser: function ($http, $location) {

            // if the browser has a token
            if (localStorage.getItem('token')) {

              // call /me endpoint, and pass it the token
              const config = {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              }

              return $http.get('/api/v1/users/me', config)
                .then(function (response) {
                  return response.data
                })
                .catch(function () {
                  localStorage.clear();
                  $location.path('/')
                  return null;
                })

            }
          }
        }
      });

      // app.run runs once when the app starts

      $locationProvider.html5Mode(true);
    });

    angular.module('app').run(function ($rootScope, $location, $window) {
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.$$route.requiresLogin && !localStorage.getItem('token')) {
          $location.path('/');
        }
      });
    });
}());
