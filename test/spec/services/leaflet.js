'use strict';

describe('Service: Leaflet', function () {

  // load the service's module
  beforeEach(module('goyoukikiApp'));

  // instantiate service
  var Leaflet;
  beforeEach(inject(function (_Leaflet_) {
    Leaflet = _Leaflet_;
  }));

  it('should do something', function () {
    expect(!!Leaflet).toBe(true);
  });

});
