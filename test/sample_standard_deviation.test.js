/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var ss = require('../');

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test('sampleStandardDeviation', function(t) {
    t.test('can get the standard deviation of an example on wikipedia', function(t) {
        t.equal(rnd(ss.sampleStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9])), 2.138);
        t.end();
    });

    t.test('zero-length corner case', function(t) {
        t.equal(rnd(ss.sampleStandardDeviation([])), 0);
        t.end();
    });
    t.end();
});
