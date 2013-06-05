"use strict";

module.exports = {
  build: function (building, processEnv) {
    building.jobId = processEnv.CI_BUILD_NUMBER;
    building.serviceName = processEnv.CI_NAME;
    building.serviceJobId = processEnv.COMMIT_ID;
    console.warn("INTERESTING", processEnv.CI_BUILD_NUMBER, processEnv.COMMIT_ID);
    console.warn(process.env);
    return building;
  }
};

