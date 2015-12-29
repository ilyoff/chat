/* global describe, beforeEach, it, browser, expect */
'use strict';

var SocketPagePo = require('./socket.po');

describe('Socket page', function () {
  var socketPage;

  beforeEach(function () {
    socketPage = new SocketPagePo();
    browser.get('/#/socket');
  });

  it('should say SocketCtrl', function () {
    expect(socketPage.heading.getText()).toEqual('socket');
    expect(socketPage.text.getText()).toEqual('SocketCtrl');
  });
});
