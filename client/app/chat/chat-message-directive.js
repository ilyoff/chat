(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name chat.directive:chatMessage
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="chat">
       <file name="index.html">
        <chat-message></chat-message>
       </file>
     </example>
   *
   */
  angular
    .module('chat')
    .directive('chatMessage', chatMessage);

  function chatMessage($timeout) {
    return {
      restrict: 'EA',
      scope: {
        message: '=',
        sendTo: '='
      },
      templateUrl: 'chat/chat-message-directive.tpl.html',
      replace: true,
      link: function (scope, element, attrs) {

      }
    };
  }
}());
