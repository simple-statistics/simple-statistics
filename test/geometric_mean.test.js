/* eslint no-shadow: 0 */
'use strict';

var test = require('tap').test;
var ss = require('../');

test('geometric mean', function(t) {
    // From http://en.wikipedia.org/wiki/Geometric_mean
    t.test('can get the mean of two numbers', function(t) {
        t.equal(ss.geometricMean([2, 8]), 4);
        t.equal(ss.geometricMean([4, 1, 1 / 32]), 0.5);
        t.equal(Math.round(ss.geometricMean([2, 32, 1])), 4);
        t.end();
    });

    t.test('cannot calculate for empty lists', function(t) {
        t.throws(function() {
            ss.geometricMean([]);
        });
        t.end();
    });

    t.test('cannot calculate for lists with negative numbers', function(t) {
        t.throws(function() {
            ss.geometricMean([-1]);
        });
        t.end();
    });
    t.end();
});
