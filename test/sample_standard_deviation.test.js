/* eslint no-shadow: 0 */


var test = require('tap').test;
var ss = require('../');

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test('sampleStandardDeviation', function(t) {
    t.test('can get the standard deviation of an example on wikipedia', function(t) {
        t.equal(rnd(ss.sampleStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9])), 2.138);
        t.end();
    });

    t.throws(function() {
        ss.sampleStandardDeviation([]);
    }, 'zero-length corner case');

    t.end();
});
