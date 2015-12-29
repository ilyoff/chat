(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name socket.factory:Socket
   *
   * @description
   *
   */
  angular
    .module('socket')
    .factory('Socket', Socket);

  function Socket($rootScope) {
    var socket = io.connect('http://localhost:8000');

    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    }
  }
}());
