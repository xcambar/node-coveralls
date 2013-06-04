"use strict";

var getOptions = function() {
  var options = {};

  // try to get filepath from the command-line
  if (process.argv[2]) {
    if (~['-v', '--verbose'].indexOf(process.argv[2])) {
      if (process.argv[3]) {
        options.filepath = process.argv[3];
      }
    } else {
      options.filepath = process.argv[2];
    }
  }

  return options;
};

module.exports = getOptions;
