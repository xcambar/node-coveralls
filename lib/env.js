"use strict";


module.exports = {
  processEnv: process.env,
  buildEnv: function () {
    var _env = module.exports.processEnv;

    var builtEnv = {};
    builtEnv.repoToken = require('./env/repo_token')(_env);

    var serviceResolver = require('./env/serviceResolver').resolveServiceName;
    require('./adapters/' + serviceResolver(_env)).build(builtEnv, _env);

    if (!builtEnv.repoToken || !builtEnv.serviceName) {
      throw new Error('Missing repoToken or serviceName. Cancel.');
    }


    return builtEnv;
  }
};

