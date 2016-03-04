/* global describe, beforeEach, inject, jasmine, it, expect */

describe('MessageServices', function () {
  // Load your module.
  beforeEach(module('app.services'));
  
  beforeEach(module('app.services.firebaseAuth'))
  
  beforeEach(inject(function(AuthManager) {
      AuthManager.signIn();
  }));

  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
    $provide.value('oneOfMyOtherServicesStub', {
        someVariable: 1
    });
  }));

  it('can get an instance of my factory', inject(function(myFactory) {
    expect(myFactory).toBeDefined();
  }));
});