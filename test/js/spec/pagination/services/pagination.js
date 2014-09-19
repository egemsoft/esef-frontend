'use strict';

describe('esef.frontend.pagination test service: pagination', function () {

  // load the controller's module
  beforeEach(module('esef.frontend'));

  var pagination;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_pagination_) {
    pagination = _pagination_;
  }));

  it('should be something', function () {
    expect(!!pagination).toBe(true);
  });
});