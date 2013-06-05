var sendToCoveralls = require('../index').sendToCoveralls;
var convertLcovToCoveralls = require('../index').convertLcovToCoveralls;
var logger = require('./logger');
var getOptions = require('../index').getOptions;
var builtEnv = require('./env').buildEnv();
var payload = require('./payload');

var handleInput = function(input) {
  logger.debug(input);
  var options = getOptions();
  logger.debug(options);

  convertLcovToCoveralls(input, options, function(err, parsedData){
    if (err) {
      logger.error("error from convertLcovToCoveralls");
      throw err;
    }

    var coverallsPayload = payload.build(parsedData, builtEnv);

    logger.info("sending this to coveralls.io: ", JSON.stringify(coverallsPayload));
    sendToCoveralls(coverallsPayload, function(err, response, body){
      if (err){
        throw err;
      }
      if (response.statusCode >= 400) {
        throw "Bad response: " + response.statusCode + " " + body;
      }
      logger.debug(response.statusCode);
      logger.debug(body);
    });
  });
};

module.exports = handleInput;
