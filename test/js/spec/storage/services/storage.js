'use strict';

describe('esef.frontend.storage test service: storage', function () {

  // load the controller's module
  beforeEach(module('esef.frontend'));

  var storage;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_storage_) {
    storage = _storage_;
  }));

  it('should be something', function () {
    expect(!!storage).toBe(true);
  });
});