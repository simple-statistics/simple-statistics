/* eslint no-console: 0, global-require: 0 */
'use strict';
var Benchmark = require('benchmark');
var markdownTable = require('markdown-table');
global.ss = require('simple-statistics');
global.ssMaster = require('../');
global.science = require('science');
global.jStat = require('jstat').jStat;
global.mathjs = require('mathjs');
global.d3 = require('d3-array');

// We have a very simple way to benchmark single-array-input
// methods, but jStat is a little more complicated - you specify
// if you want _sample_ variance by adding a boolean argument to the
// method. So I add it here.
global.jStat.sampleVariance = function(input) {
    return global.jStat.variance(input, true);
};

function setupInput() {
    var i;
    var input10 = [];
    for (i = 0; i < 10; i++) {
        input10.push(Math.random());
    }
    var input100 = [];
    for (i = 0; i < 100; i++) {
        input100.push(Math.random());
    }
    var input1000 = [];
    for (i = 0; i < 1000; i++) {
        input1000.push(Math.random());
    }

    var input10a = [];
    for (i = 0; i < 10; i++) {
        input10a.push(Math.random());
    }
    var input100a = [];
    for (i = 0; i < 100; i++) {
        input100a.push(Math.random());
    }
    var input1000a = [];
    for (i = 0; i < 1000; i++) {
        input1000a.push(Math.random());
    }
}

// This is the start of what will eventually be a markdown table
// included in the readme.
var results = [[
    '', 'ss', 'science', 'jStat', 'mathjs', 'd3', 'ssMaster'
]];

// This is a generic 'suite maker' method that we use to test different
// libraries doing the same work - it gets a name as a first argument, like
// 'median', and the second argument is an array of strings that are the names
// of the implementations of that function in different libraries.
function suiteForMethods(name, methods, type) {

    var suite = new Benchmark.Suite({
        name: name,
        onError: function(error) {
            console.log(error);
        }
    });

    methods.forEach(function (method) {
        if (type === 'two-arrays') {
            suite.add(method, {
                setup: setupInput,
                fn: method + '(input10, input10a);' + method + '(input100, input100a);' +
                    method + '(input1000, input1000a);'
            });
        } else {
            suite.add(method, {
                setup: setupInput,
                fn: method + '(input10);' + method + '(input100);' + method + '(input1000);'
            });
        }
    });

    suite
        .on('cycle', function(event) {
            console.error(String(event.target));
        })
        .on('complete', function() {
        var row = [name];
        for (var i = 1; i < results[0].length; i++) {
            row[i] = '';
        }
        var fastest = this.filter('fastest')[0];
        this.forEach(function (event) {
            // This gross code figures out which column to put
            // each result in, because we don't have implementations
            // of every method in every library.
            var idx = results[0].indexOf(event.name.split('.')[1]);
            row[idx] = Math.round(event.hz).toLocaleString();
            if (event === fastest) {
                row[idx] = '**' + row[idx] + '**';
            }
        });
        results.push(row);
    })
    .run();
}

// Here we declare all of the basic operations that we'll test, and the
// functions in each library that do them.
var tests = [
    [
        'variance',
        [
            'global.ss.sampleVariance',
            'global.ssMaster.sampleVariance',
            'global.science.stats.variance',
            'global.jStat.sampleVariance',
            'global.d3.variance'
        ]
    ],
    [
        'covariance',
        [
            'global.ss.sampleCovariance',
            'global.ssMaster.sampleCovariance',
            'global.jStat.covariance'
        ],
        'two-arrays'
    ],
    [
        'skewness',
        [
            'global.ss.sampleSkewness',
            'global.ssMaster.sampleSkewness',
            'global.jStat.skewness'
        ]
    ],
    [
        'geometric mean',
        [
            'global.ss.geometricMean',
            'global.ssMaster.geometricMean',
            'global.jStat.geomean'
        ]
    ],
    [
        'medianAbsoluteDeviation',
        [
            'global.ss.medianAbsoluteDeviation',
            'global.ssMaster.medianAbsoluteDeviation',
            'global.mathjs.mad'
            // 'global.jStat.meddev' https://github.com/jstat/jstat/issues/205
        ]
    ],
    [
        'median',
        [
            'global.ss.median',
            'global.ssMaster.median',
            'global.mathjs.median',
            'global.jStat.median',
            'global.science.stats.median',
            'global.d3.median'
        ]
    ],
    [
        'mode',
        [
            'global.ss.mode',
            'global.ssMaster.mode',
            'global.mathjs.mode',
            'global.jStat.mode',
            'global.science.stats.mode'
        ]
    ],
    [
        'mean',
        [
            'global.ss.mean',
            'global.ssMaster.mean',
            'global.mathjs.mean',
            'global.jStat.mean',
            'global.science.stats.mode'
        ]
    ],
    [
        'min',
        [
            'global.ss.min',
            'global.ssMaster.min',
            'global.mathjs.min',
            'global.jStat.min',
            'global.d3.min'
        ]
    ],
    [
        'max',
        [
            'global.ss.max',
            'global.ssMaster.max',
            'global.mathjs.max',
            'global.jStat.max',
            'global.d3.max'
        ]
    ],
    [
        'sum',
        [
            'global.ss.sum',
            'global.ssMaster.sum',
            'global.mathjs.sum',
            'global.jStat.sum',
            'global.d3.sum'
        ]
    ]
];

tests.forEach(function (test) {
    suiteForMethods(test[0], test[1], test[2]);
});

// Finally, console.log spits out the content of readme.md
console.log('# Benchmarks');
console.log('\n\nThis document is generated by `npm start`. It compares simple-statistics performance against similar libraries in JavaScript.');
console.log('\n\n' + markdownTable(results));
console.log('\n\nFastest libraries are in bold. Numbers are in operations per second.');
console.log('\n\nssMaster is simple-statistics master branch, used for testing and proofing - it is not guaranteed to be any released version.');

console.log('\n\n### Versions\n');

['simple-statistics', 'science', 'jstat', 'mathjs', 'd3-array'].forEach(function (p) {
    console.log('* ' + p + ': ' + require(p + '/package').version);
});
