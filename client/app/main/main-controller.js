(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name main.controller:MainCtrl
   * @requires $scope
   *
   * @description
   *
   */
  angular
    .module('main')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($scope, Users) {
    $scope.user = {
      email: 'test@email.ru',
      password: 'testtest',
      nickname: 'testNickName'
    };

    $scope.login = function (user) {
      Users.login(user).then(function (user) {
        $scope.newUser = user;
      });
    };

    $scope.createUser = function (user) {
      Users.signup(user).then(function (user) {
        $scope.newUser = user;
      });
    };

    $scope.editUser = function (user) {
      Users.edit(user).then(function (user) {
        $scope.newUser = user;
      })
    }
  }
}());
