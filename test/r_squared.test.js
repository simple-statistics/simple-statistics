/* eslint no-shadow: 0 */
'use strict';

var test = require('tap').test;
var ss = require('../');

test('r-squared', function(t) {
    t.test('says that the r squared of a two-point line is perfect', function(t) {
        var d = [[0, 0], [1, 1]];
        var l = ss.linearRegressionLine(ss.linearRegression(d));
        t.equal(ss.rSquared(d, l), 1);
        t.end();
    });

    t.test('says that the r squared of a three-point line is not perfect', function(t) {
        var d = [[0, 0], [0.5, 0.2], [1, 1]];
        var l = ss.linearRegressionLine(ss.linearRegression(d));
        t.notEqual(ss.rSquared(d, l), 1);
        t.end();
    });

    t.test('r-squared of single sample is 1', function(t) {
        var d = [[0, 0]];
        var l = ss.linearRegressionLine(ss.linearRegression(d));
        t.equal(ss.rSquared(d, l), 1);
        t.end();
    });
    t.end();
});
