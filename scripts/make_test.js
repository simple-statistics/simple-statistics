'use strict';

var fs = require('fs'),
    path = require('path');

// Browserify needs a single entry point. This doesn't mix
// well with our testing approach that runs tests as individual
// files. Thus we use this script to create a single file with
// require() statements pointing at each test.
fs.writeFileSync(path.resolve(__dirname, 'required_test.js'),
    fs.readdirSync(path.resolve(__dirname, '../test'))
        .map(function(testFile) {
            return 'require("../test/' + testFile + '");';
        })
        .join('\n'));
