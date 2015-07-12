/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var ss = require('../');

test('mean', function(t) {
    t.test('can get the mean of two numbers', function(t) {
        t.equal(ss.mean([1, 2]), 1.5);
        t.end();
    });
    t.test('can get the mean of one number', function(t) {
        t.equal(ss.mean([1]), 1);
        t.end();
    });
    t.test('an empty list has no average', function(t) {
        t.equal(ss.mean([]), null);
        t.end();
    });
    t.end();
});

test('mean - parity', function(t) {
    var science = require('science');
    t.equal(ss.mean([1, 2, 3]), science.stats.mean([1, 2, 3]), 'same result as science.js');
    t.end();
});
