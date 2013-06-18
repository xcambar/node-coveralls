var sendToCoveralls = require('../index').sendToCoveralls,
    convertLcovToCoveralls = require('../index').convertLcovToCoveralls,
    logger = require('./logger'),
    getOptions = require('../index').getOptions,
    env = require('./env')(process.env),
    builtEnv = env.buildEnv(),
    gitData = env.gitData(),
    payload = require('./payload');

var handleInput = function(input) {
  logger.debug(input);
  var options = getOptions();
  logger.debug(options);

  convertLcovToCoveralls(input, options, function(err, parsedData){
    if (err) {
      logger.error("error from convertLcovToCoveralls");
      throw err;
    }

    var coverallsPayload = payload.build(parsedData, builtEnv, gitData);

    logger.info("sending this to coveralls.io: ", JSON.stringify(coverallsPayload));
    sendToCoveralls(coverallsPayload, function(err, response, body){
      if (err){
        throw err;
      }
      if (response.statusCode >= 400) {
        delete coverallsPayload.source_files; //To avoid monstruous output
        console.log(coverallsPayload);
        throw "Bad response: " + response.statusCode + " " + body;
      }
      logger.debug(response.statusCode);
      logger.debug(body);
    });
  });
};

module.exports = handleInput;
