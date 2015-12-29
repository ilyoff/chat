(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name chat.controller:ChatCtrl
   * @requires $scope
   *
   * @description
   *
   */
  angular
    .module('chat')
    .controller('ChatCtrl', ChatCtrl);

  function ChatCtrl($rootScope, $scope, Socket, User) {
    $scope.users = [];
    $scope.user = User.getCurrentUser();
    $scope.newMessage = {
      text: '',
      recipients: []
    };

    $scope.messages = [];

    $rootScope.$on('users:update', function () {
      console.log('update');
      $scope.user = User.getCurrentUser();
    });

    function prepareMessage (message) {
      message = angular.copy(message);
      message.author = $scope.user;
      message.createdAt = Date.now();
      message.status = 'pending';
      return message;
    };

    $scope.disableControls = function () {
      return !$scope.user || ($scope.newMessage.isPrivate &&
                        !$scope.newMessage.recipients.length);
    };

    function recievedMessage (oldMessage) {
      return function (data) {
        console.log(data);
        var index = $scope.messages.indexOf(oldMessage);
        $scope.messages[index] = data;
      };
    };

    $scope.setRecipient = function (user) {
      console.log('res ', user, $scope.newMessage);
      // Не можем писать сами себе
      if (user._id === $scope.user._id) {
        return;
      }

      if (!$scope.newMessage.recipients) {
        $scope.newMessage.recipients = [];
      }

      // Одного и того же пользователя не добавляем
      if (~$scope.newMessage.recipients.indexOf(user)) {
        return;
      }

      $scope.newMessage.recipients.push(user);
      $scope.newMessage.text = '@' + user.nickname + ', ' + $scope.newMessage.text;
    };

    $scope.removeRecipient = function (user) {
      var index = $scope.newMessage.recipients.indexOf(user);
      var recipients = $scope.newMessage.recipients;
      var messageText = $scope.newMessage.text;
      var nickname = '@' + user.nickname + ',';

      console.log('remove', $scope.newMessage.recipients, index);
      recipients.splice(index, 1);
      $scope.newMessage.text = messageText.replace(nickname, '');
      console.log($scope.newMessage.text);
    };

    $scope.sendMessage = function (data) {
      var message = prepareMessage(data);
      $scope.messages.push(message);

      if (message.isPrivate) {
        Socket.emit('messages:new:private', message, recievedMessage(message));
      } else {
        Socket.emit('messages:new', message, recievedMessage(message));
      }

      $scope.newMessage = {};
    };

    Socket.on('users:updateList', function (users) {
      console.log('users', users);
      $scope.users = users;
    });

    Socket.on('messages:update', function (message) {
      console.log(message);
      if (message instanceof Array) {
        $scope.messages = $scope.messages.concat(message);
      } else {
        $scope.messages.push(message);
      }
    });

  }
}());
