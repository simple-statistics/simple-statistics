/* eslint no-console: 0, global-require: 0 */
'use strict';
var Benchmark = require('benchmark');
var markdownTable = require('markdown-table');
global.ss = require('simple-statistics');
global.science = require('science');
global.jStat = require('jstat').jStat;
global.mathjs = require('mathjs');

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
}

// This is the start of what will eventually be a markdown table
// included in the readme.
var results = [[
    '', 'ss', 'science', 'jStat', 'mathjs'
]];

// This is a generic 'suite maker' method that we use to test different
// libraries doing the same work - it gets a name as a first argument, like
// 'median', and the second argument is an array of strings that are the names
// of the implementations of that function in different libraries.
function suiteForMethods(name, methods) {

    var suite = new Benchmark.Suite({
        name: name,
        onError: function(error) {
            console.log(error);
        }
    });

    methods.forEach(function (method) {
        suite.add(method, {
            setup: setupInput,
            fn: method + '(input10);' + method + '(input100);' + method + '(input1000);'
        });
    });

    suite.on('complete', function() {
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
            'global.science.stats.variance',
            'global.jStat.sampleVariance'
        ]
    ],
    [
        'median',
        [
            'global.ss.median',
            'global.mathjs.median',
            'global.jStat.median',
            'global.science.stats.median'
        ]
    ],
    [
        'mode',
        [
            'global.ss.mode',
            'global.mathjs.mode',
            'global.jStat.mode',
            'global.science.stats.mode'
        ]
    ],
    [
        'medianAbsoluteDeviation',
        [
            'global.ss.medianAbsoluteDeviation',
            'global.mathjs.mad'
            // 'global.jStat.meddev' https://github.com/jstat/jstat/issues/205
        ]
    ],
    [
        'min',
        [
            'global.ss.min',
            'global.mathjs.min',
            'global.jStat.min'
        ]
    ]
];

tests.forEach(function (test) {
    suiteForMethods(test[0], test[1]);
});

// Finally, console.log spits out the content of readme.md
console.log('# Benchmarks');
console.log('\n\nThis document is generated by `npm start`. It compares simple-statistics performance against similar libraries in JavaScript.');
console.log('\n\n' + markdownTable(results));
console.log('\n\nFastest libraries are in bold. Numbers are in operations per second.');

console.log('\n\n### Versions\n');

['simple-statistics', 'science', 'jstat', 'mathjs'].forEach(function (p) {
    console.log('* ' + p + ': ' + require(p + '/package').version);
});
