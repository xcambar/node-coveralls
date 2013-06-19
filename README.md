#node-coveralls
[ ![Codeship Status for xcambar/node-coveralls](https://www.codeship.io/projects/68292880-aff6-0130-8c0b-7a97a098c4e6/status?branch=master) ](https://www.codeship.io/projects/4043)
[![Coverage status](https://coveralls.io/repos/xcambar/node-coveralls/badge.png?branch=master)]

[Coveralls.io](https://coveralls.io/) support for node.js.  Get the great coverage reporting of coveralls.io and add a cool coverage button to your README.

# Usage

* Add the latest version of `coveralls` to your package.json:
```
npm install coveralls --save
```
* Instrument your code with [Istanbul](http://gotwarlost.github.io/istanbul/),
[JSCover](http://tntim96.github.io/JSCover/), [node-jscoverage](https://github.com/visionmedia/node-jscoverage)
or any tool of your choosing
* Run your test suites against the instrumented files, with [Istanbul](http://gotwarlost.github.io/istanbul/),
the [Mocha LCOV Reporter](https://github.com/StevenLooman/mocha-lcov-reporter), or, once again, the tool of your choosing
* Run `\`npm bin\`/coveralls.js < /path/to/your/lcov\_report.info`

> [coveralls.io](http://coveralls.io) require the presence of an environment variable called `COVERALLS\_REPO\_TOKEN`,
whic contains the secret token to post your coverage data. Make sure it is available in your Ci environment,
or the whole bild will fail (`node-coveralls` will stop with a non-zero return code).

# Setup example

In this repo, I used Istanbul and Mocha, and wrapped them all in the following `npm` scripts:

```
"scripts": {
  "test": "node ./test/runner.js",
  "coverage": "`npm bin`/istanbul cover ./test/runner.js",
  "coveralls": "npm run-script coverage && node bin/coveralls.js < coverage/lcov.info"
}
```

The Ci environments they run into execute the task `coveralls` to send the data once the build is finished.

## Supported CIs

Currently, `node-coveralls` can send data from 3 CI environments:

* [Travis](http://travis-ci.org)
* [Codeship.io](http://codeship.io)
* local (Run from your dev machine)

The two first offer a great level of integration, the third os yet to be polished, though the major info is available.

### More CIs ?

Feel free to pull-request the integration of another CI, or simply ask, it may be just enough to see it implemented :wink:.

# Roadmap

* More CIs
* Polish
* Enhnce code coverage (of course!)

# Licence

MIT

