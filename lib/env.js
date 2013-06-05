"use strict";

var _env = process.env;
var builtEnv = {};

builtEnv.repo_token = require('./env/repo_token')(_env);

if (!builtEnv.repo_token) {
  throw new Error('No REPO_TOKEN could be found. Cancel.');
}

module.exports = builtEnv;
