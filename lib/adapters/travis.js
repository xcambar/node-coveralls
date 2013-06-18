"use strict";

module.exports = {
  build: function (building, processEnv) {
    building.jobId = processEnv.TRAVIS_JOB_ID;
    building.serviceName = 'travis-ci';
    return building;
  },
  gitData: function (env) {
    return {
      environment: {
        travis_job_id: env.TRAVIS_JOB_ID
      },
      head: {
        id: env.TRAVIS_COMMIT
      },
      branch: env.TRAVIS_BRANCH
    };
  }
};


