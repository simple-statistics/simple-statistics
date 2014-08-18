var test = require('tape');
var ss = require('../');

test('geometric mean', function(t) {
    // From http://en.wikipedia.org/wiki/Geometric_mean
    test('can get the mean of two numbers', function(t) {
        t.equal(ss.geometric_mean([2, 8]), 4);
        t.equal(ss.geometric_mean([4, 1, 1 / 32]), 0.5);
        t.equal(Math.round(ss.geometric_mean([2, 32, 1])), 4);
        t.end();
    });

    test('returns null for empty lists', function(t) {
        t.equal(ss.geometric_mean([]), null);
        t.end();
    });

    test('returns null for lists with negative numbers', function(t) {
        t.equal(ss.geometric_mean([-1]), null);
        t.end();
    });
    t.end();
});
