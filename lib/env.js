"use strict";


module.exports = {
  processEnv: process.env,
  buildEnv: function () {
    var _env = module.exports.processEnv;
    var builtEnv = {};
    var serviceResolver = require('./env/serviceResolver').resolveServiceName;

    builtEnv.repo_token = require('./env/repo_token')(_env);

    if (!builtEnv.repo_token) {
      throw new Error('No REPO_TOKEN could be found. Cancel.');
    }

    require('./adapters/' + serviceResolver(_env)).build(builtEnv, _env);

    return builtEnv;
  }
};

