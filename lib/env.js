"use strict";

console.log(process.env);
module.exports = function (env) {
  var serviceResolver = require('./env/serviceResolver').resolveServiceName;
  var serviceAdapter = require('./adapters/' + serviceResolver(env));

  return {
    buildEnv: function () {

      var builtEnv = {};
      builtEnv.repoToken = require('./env/repo_token')(env);

      serviceAdapter.build(builtEnv, env);

      if (!builtEnv.repoToken || !builtEnv.serviceName) {
        throw new Error('Missing repoToken or serviceName. Cancel.');
      }
      return builtEnv;
    },
    gitData: function () {
      return serviceAdapter.gitData(env);
    }
  };
};

