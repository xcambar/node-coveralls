"use strict";

var YAML = require('libyaml'),
    logger = require('../logger'),
    fs = require('fs'),
    path = require('path');


module.exports = function (env) {
  env = env || {};
  // try to get the repo token as an environment variable
  var token;
  if (env.COVERALLS_REPO_TOKEN) {
    token = env.COVERALLS_REPO_TOKEN;
  } else {
    // try to get the repo token from a .coveralls.yml file
    try {
      token = module.exports.readFromFile(path.resolve('.coveralls.yml'));
    } catch(ex) {
      logger.warn("Repo token could not be determined.");
    }
  }
  return token ? token : undefined; //Empty values are rejected
};

module.exports.readFromFile = function (file) {
  return YAML.readFileSync(file)[0].repo_token;
};
