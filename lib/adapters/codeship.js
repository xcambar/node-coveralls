"use strict";

module.exports = {
  build: function (building, processEnv) {
    building.jobId = processEnv.CI_BUILD_NUMBER;
    building.serviceName = processEnv.CI_NAME;
    console.warn(processEnv.CI_BUILD_URL, processEnv.COMMIT_ID);
    return building;
  }
};

