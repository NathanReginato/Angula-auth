(function() {
  'use strict';

  angular.module('app')
    .controller('SignupController', function ($scope, $http, $window, $location, $rootScope) {

      $scope.createUser = function () {
        console.log($scope.user);

        $http.post('/api/v1/users/signup', $scope.user)
        .then(function(response){
          $rootScope.user = $scope.user
          $window.localStorage.setItem('token', response.data.token);
          $location.path('/')
        })
      }
    })

}());
