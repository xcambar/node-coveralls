"use strict";

module.exports = {
  build: function (building, processEnv) {
    building.jobId = processEnv.TRAVIS_BUILD_NUMBER;
    building.serviceName = 'travis-ci';
    return building;
  }
};


