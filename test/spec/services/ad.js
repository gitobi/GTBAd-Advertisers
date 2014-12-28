'use strict';

describe('Service: Ad', function () {

  // load the service's module
  beforeEach(module('gtbadAdvertisersApp'));

  // instantiate service
  var Ad;
  beforeEach(inject(function (_Ad_) {
    Ad = _Ad_;
  }));

  it('should do something', function () {
    expect(!!Ad).toBe(true);
  });

});
