/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('MainCtrl', function () {
  var scope;

  beforeEach(module('main'));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('MainCtrl', {$scope: scope});
  }));

  it('should have ctrlName as MainCtrl', function () {
    expect(scope.main.ctrlName).toEqual('MainCtrl');
  });
});
