"use strict";

var should = require('should'),
    serviceResolver = require('../../../lib/env/serviceResolver');

require('log-driver')({level : false});

describe('Determining the right service', function () {
  it('should detect a local run', function () {
    serviceResolver.resolveServiceName({}).should.equal('local');
  });
  it('should throw for an undetermined service', function () {
    serviceResolver.resolveServiceName.bind(undefined, {CI: true}).should.throw();
  });
  it('should return the TRAVIS value when in a Travis.ci environment', function () {
    serviceResolver.resolveServiceName({CI: true, TRAVIS: true}).should.equal(serviceResolver.services.TRAVIS);
  });
  it('should return the CODESHIP value when in a Codeship.io environment', function () {
    serviceResolver.resolveServiceName({CI: true, CI_NAME: 'codeship'}).should.equal(serviceResolver.services.CODESHIP);
  });
});
