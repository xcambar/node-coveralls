"use strict";

var should = require('should');
var env = {};
require('log-driver')({level : false});
var module = require('../../lib/env')(env);

describe ('Environment requirements', function () {
  it('should pass with a repo token', function () {
    env.COVERALLS_REPO_TOKEN = 'OK';
    module.buildEnv.bind(undefined).should.not.throw();
    delete env.COVERALLS_REPO_TOKEN;
  });
  it('should fail with neither a repo token nor a sevice+job info', function () {
    module.buildEnv.bind(undefined).should.throw();
  });
});

