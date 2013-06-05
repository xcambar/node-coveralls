"use strict";

var _services = Object.freeze({
  LOCAL: 'locsl',
  TRAVIS: 'travis',
  CODESHIP: 'codeship'
});

function getServiceName(_env) {
  var _s = _services;
  _env = _env || _env;
  if (!_env.CI) { // Runs locally
    return 'local';
  }

  if (_env.TRAVIS) {
    return _s.TRAVIS;
  } else if (_env.CI_NAME === 'codeship') {
    return _s.CODESHIP;
  } else {
    throw new Error('Unknown service. Cancel.');
  }
}


module.exports = {
  resolveServiceName: getServiceName,
  services: _services
};
