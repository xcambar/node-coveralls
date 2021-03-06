"use strict";

var fs = require('fs');
var lcovParse = require('lcov-parse');
var path = require('path');
var logger = require('./logger');

var detailsToCoverage = function(length, details) {
  var coverage = new Array(length);
  details.forEach(function(obj){
    coverage[obj.line - 1] = obj.hit;
  });
  return coverage;
};

var convertLcovFileObject = function(file, filepath){
  if (file.file[0] !== '/') {
    filepath = path.join(filepath, file.file);
  } else {
    filepath = file.file;
  }
  var source = fs.readFileSync(filepath, 'utf8');
  var lines = source.split("\n");
  var coverage = detailsToCoverage(lines.length, file.lines.details);

  return {
    name     : file.file.replace(process.cwd() +'/', ''),
    source   : source,
    coverage : coverage
  };
};

var convertLcovToCoveralls = function(input, options, cb) {
  var filepath = options.filepath || '';
  logger.debug("in: ", filepath);
  if (filepath[0] !== '/'){
    filepath = path.resolve(filepath);
  }
  lcovParse(input, function(err, parsed){
    if (err){
      logger.error("error from lcovParse: ", err);
      logger.error("input: ", input);
      return cb(err);
    }
    var coverallsData = parsed.map(function (file) {
      return convertLcovFileObject(file, filepath);
    });
    return cb(null, coverallsData);
  });
};

module.exports = convertLcovToCoveralls;

/* example coveralls json file


   {
   "service_job_id": "1234567890",
   "service_name": "travis-ci",
   "source_files": [
   {
   "name": "example.rb",
   "source": "def four\n  4\nend",
   "coverage": [null, 1, null]
   },
   {
   "name": "two.rb",
   "source": "def seven\n  eight\n  nine\nend",
   "coverage": [null, 1, 0, null]
   }
   ]
   }


   example output from lcov parser:

   [
   {
   "file": "index.js",
   "lines": {
   "found": 0,
   "hit": 0,
   "details": [
   {
   "line": 1,
   "hit": 1
   },
   {
   "line": 2,
   "hit": 1
   },
   {
   "line": 3,
   "hit": 1
   },
   {
   "line": 5,
   "hit": 1
   },

*/

