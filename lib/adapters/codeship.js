"use strict";

module.exports = {
  build: function (building, processEnv) {
    building.jobId = processEnv.CI_BUILD_NUMBER;
    building.serviceName = processEnv.CI_NAME;
    return building;
  },
  gitData: function (env) {
    return {
      head: {
        id: env.CI_COMMIT_ID,
        author_name: env.CI_COMMITTER_NAME,
        author_email: env.CI_COMMITTER_EMAIL,
        committer_name: env.CI_COMMITTER_NAME,
        committer_email: env.CI_COMMITTER_EMAIL,
        message: env.CI_MESSAGE
      },
      branch: env.CI_BRANCH
    };
  }
};

