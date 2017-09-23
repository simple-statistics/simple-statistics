/* eslint no-shadow: 0 */


var test = require('tap').test;
var ss = require('../');

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test('root_mean_square', function(t) {
    // From http://en.wikipedia.org/wiki/Root_mean_square
    t.test('can get the RMS of two or more numbers', function(t) {
        t.equal(ss.rootMeanSquare([1, 1]), 1);
        t.equal(rnd(ss.rootMeanSquare([3, 4, 5])), 4.082);
        t.equal(rnd(ss.rootMeanSquare([-0.1, 5, -2, 10])), 5.679);
        t.end();
    });

    t.test('returns null for empty lists', function(t) {
        t.throws(function() {
            ss.rootMeanSquare([]);
        });
        t.end();
    });

    t.end();
});
