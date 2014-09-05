'use strict';

describe('esef.frontend.filters test service: filters', function () {

  // load the controller's module
  beforeEach(module('esef.frontend'));

  var filter;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$filter_) {
    filter = _$filter_;
  }));

  it('should be something', function () {
    expect(!!filter('titlecase')).toBe(true);
  });

  it('should change case to title format properly', function () {
    expect(filter('titlecase')('tEst CaSe')).toBe('Test case');
  });
});