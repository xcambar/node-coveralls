"use strict";

var _services = Object.freeze({
  TRAVIS: 'travis',
  CODESHIP: 'codeship'
});

function getServiceName(_env) {
  var _s = _services;
  _env = _env || _env;
  if (_env.CI && _env.TRAVIS) {
    return _s.TRAVIS;
  } else if (_env.CI && _env.CI_NAME === 'codeship') {
    return _s.CODESHIP;
  } else {
    throw new Error('Unknown service. Cancel.');
  }
}


module.exports = {
  resolveServiceName: getServiceName,
  services: _services
};
