"use strict";


module.exports = {
  processEnv: process.env,
  buildEnv: function () {
    var _env = module.exports.processEnv;
    var builtEnv = {};
    var serviceResolver = require('./env/serviceResolver').resolveServiceName;

    builtEnv.repo_token = require('./env/repo_token')(_env);

    require('./adapters/' + serviceResolver(_env)).build(builtEnv, _env);

    var hasRepoToken = !!builtEnv.repo_token;
    var hasServiceAndJob = !!builtEnv.service_job_id && !!builtEnv.service_name;

    if (!hasRepoToken && ! hasServiceAndJob) {
      throw new Error('Can not identify the job nor repo. Cancel.');
    }


    return builtEnv;
  }
};

