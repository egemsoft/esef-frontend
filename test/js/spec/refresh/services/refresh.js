'use strict';

describe('esef.frontend.refresh test service: refresh', function () {

  // load the controller's module
  beforeEach(module('esef.frontend'));

  var refresh;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_refresh_) {
    refresh = _refresh_;
  }));

  it('should be something', function () {
    expect(!!refresh).toBe(true);
  });
});