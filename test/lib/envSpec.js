"use strict";

var should = require('should');
require('log-driver')({level : false});
var module = require('../../lib/env');

describe ('building the environment', function () {
  it('should fail without the repo token', function () {
    module.processEnv = {};
    module.buildEnv.bind(undefined).should.throw();
  });
});

