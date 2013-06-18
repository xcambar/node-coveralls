"use strict";

module.exports = {
  build: function (coverageData, env, gitData) {
    var postJson = {
      source_files : []
    };
    postJson.repo_token = env.repoToken;
    postJson.service_name = env.serviceName;
    if (env.jobId) {
      postJson.service_job_id = env.jobId;
    }

    postJson.source_files = coverageData;
    postJson.run_at = (new Date()).toUTCString();
    postJson.git = gitData;

    return postJson;
  }
};
