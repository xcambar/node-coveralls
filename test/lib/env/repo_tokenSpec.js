"use strict";

var repo_token = require('../../../lib/env/repo_token');
var should =require('should');
require('log-driver')({level : false});

var _fakeToken = 'OK';

describe('Getting the repository token', function () {
  describe('with the environment variable', function () {
    it('should return the correct value', function () {
      var _envMock = {
        COVERALLS_REPO_TOKEN: _fakeToken
      };
      repo_token(_envMock).should.equal(_fakeToken);
    });
  });
  describe('without the environment variable', function () {
    describe('with a .coveralls.yml', function () {
      var _readFromFile;
      before(function () {
        _readFromFile = repo_token.readFromFile;
        repo_token.readFromFile = function () {
          return _fakeToken;
        };
      });
      after(function () {
        repo_token.readFromFile = _readFromFile;
      });
      it('should return the correct value', function () {
        repo_token().should.equal(_fakeToken);
      });
    });
    describe('without a .coveralls.yml', function () {
      it('should return undefined', function () {
        should.strictEqual(repo_token(), undefined);
      });
    });
  });
});
