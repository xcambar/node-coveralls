"use strict";


module.exports = {
  processEnv: process.env,
  buildEnv: function () {
    var _env = module.exports.processEnv;

    var builtEnv = {};
    builtEnv.repoToken = require('./env/repo_token')(_env);

    var serviceResolver = require('./env/serviceResolver').resolveServiceName;
    require('./adapters/' + serviceResolver(_env)).build(builtEnv, _env);

    var hasRepoToken = !!builtEnv.repoToken;
    var hasServiceAndJob = !!builtEnv.jobId && !!builtEnv.serviceName;

    if (!hasRepoToken && ! hasServiceAndJob) {
      throw new Error('Can not identify the job nor repo. Cancel.');
    }


    return builtEnv;
  }
};

