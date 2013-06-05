var glob = require('glob');
var mocha = new (require('mocha'))();
mocha.reporter('spec');
mocha.files = glob.sync('test/lib/**/*.js');
mocha.run(process.exit);
