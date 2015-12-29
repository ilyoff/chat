/* global describe, beforeEach, it, browser, expect */
'use strict';

var MainPagePo = require('./main.po');

describe('Main page', function () {
  var mainPage;

  beforeEach(function () {
    mainPage = new MainPagePo();
    browser.get('/#/main');
  });

  it('should say MainCtrl', function () {
    expect(mainPage.heading.getText()).toEqual('main');
    expect(mainPage.text.getText()).toEqual('MainCtrl');
  });
});
