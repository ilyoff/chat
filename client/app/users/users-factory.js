(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name users.factory:User
   *
   * @description
   * Factory for users managing
   *
   */
  angular
    .module('users')
    .factory('User', User);

  function User($rootScope, Restangular, Socket) {
    var User = Restangular.one('users');
    var currentUser = null;

    function successCallback(res) {
      currentUser = res.data.user;
      Socket.emit('users:join', currentUser);
      return currentUser;
    };

    function errorCallback (err) {
      return err.data;
    };

    return {
      getCurrentUser: function () {
        return currentUser;
      },

      init: function initUser() {
        User.customGET('session').then(function (res) {
          if (res.data.success) {
            console.log(res.data);
            currentUser = res.data.user;
            Socket.emit('users:join', currentUser);
            $rootScope.$broadcast('users:update')
          }
        });
      },

      login: function (user) {
        return User
                .post('login', user)
                .then(successCallback, errorCallback)
      },

      signup: function (user) {
        return User
                .post('signup', user)
                .then(successCallback, errorCallback);
      },

      logout: function () {
        return User.post('logout').then(function () {
          Socket.emit('users:left', currentUser);
        });
        currentUser = null;
      }

    }
  }
}());
