(function () {
  'use strict';

  /* @ngdoc object
   * @name client
   * @description
   *
   */
  angular
    .module('client', [
      'ui.router',
      'luegg.directives',
      'users',
      'main',
      'socket',
      'chat'
    ])
    .config(function (RestangularProvider) {
      RestangularProvider.setBaseUrl('http://localhost:8000');
    })
    .run(function (User) {
      User.init();
    });
}());
