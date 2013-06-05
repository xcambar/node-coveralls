"use strict";

var token_finder = require('../../lib/env/repo_token');
var should = require('should');
require('log-driver')({level : false});

describe ('building the environment', function () {
  var _old_repo_token;
  var _old_readFromFile;
  var _has_repo_token;
  // Blocks any preexistent config
  before(function () {
    _has_repo_token = process.env.hasOwnProperty('COVERALLS_REPO_TOKEN');
    _old_repo_token = process.env.COVERALLS_REPO_TOKEN;
    _old_readFromFile = token_finder.readFromFile;
    process.env.OVERALLS_REPO_TOKEN = '';
    token_finder.readFromFile = function () {
      return '';
    };
  });
  //Restores the config
  after(function () {
    if (_has_repo_token) {
      process.env.COVERALLS_REPO_TOKEN = _old_repo_token;
    }
    token_finder.readFromFile = _old_readFromFile;
  });
  it('should fail without the repo token', function () {
    require.bind(undefined,'../../lib/env').should.throw();
    after(function () {
      delete require.cache[require('path').resolve('../../lib/env')];
    });
  });

});

describe('should provide the good configuration', function () {

});
