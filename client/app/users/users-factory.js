(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name users.factory:Users
   *
   * @description
   * Factory for users managing
   *
   */
  angular
    .module('users')
    .factory('Users', Users);

  function Users(Restangular) {
    var Users = Restangular.one('users');

    return {
      login: function (user) {
        return Users
                .post('login', user)
                .then(function (res) {
                  return res.data;
                })
      },

      signup: function (user) {
        return Users
                .post('signup', user)
                .then(function (res) {
                  console.log(res);
                  return res.data;
                })
      },

      edit: function (user) {
        return Users
                .post('edit', user)
                .then(function (res) {
                  return res.data;
                })
      }
    }
  }
}());
