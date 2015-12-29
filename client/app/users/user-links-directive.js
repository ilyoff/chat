(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name users.directive:userLinks
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="users">
       <file name="index.html">
        <user-links></user-links>
       </file>
     </example>
   *
   */
  angular
    .module('users')
    .directive('userLinks', userLinks);

  function userLinks($rootScope, $timeout, User) {
    return {
      restrict: 'EA',
      templateUrl: 'users/user-links-directive.tpl.html',
      scope: {},
      replace: true,
      link: function (scope, element, attrs) {
        scope.popup = false;
        scope.login = true;
        scope.signup = false;
        scope.errorText = '';
        scope.user = User.getCurrentUser();

        scope.showPopup = function () {
          scope.popup = !scope.popup;
        };

        scope.toggleForm = function () {
          scope.login = !scope.login;
          scope.signup = !scope.signup;
        };

        scope.newUser = {
          email: 'test@email.ru',
          password: 'testtest',
          nickname: 'testNickName'
        };


        function onSuccess (user) {
          scope.user = user;
          scope.popup = false;
          console.log('user',user);
          $rootScope.$broadcast('users:update');
        };

        function onError (err) {
          scope.errorText = err.message;
        };

        scope.loginUser = function (user) {
          User.login(user).then(onSuccess, onError);
        };

        scope.createUser = function (user) {
          User.signup(user).then(onSuccess, onError);
        };

        scope.logout = function () {
          User.logout().then(function (user) {
            $rootScope.$broadcast('users:update');
            scope.user = null;
          });
        };
      }
    };
  }
}());
