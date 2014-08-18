var test = require('tape');
var ss = require('../');

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test('harmonic_mean', function(t) {
    // From http://en.wikipedia.org/wiki/Harmonic_mean
    test('can get the mean of two or more numbers', function(t) {
        t.equal(ss.harmonic_mean([1, 1]), 1);
        t.equal(rnd(ss.harmonic_mean([2, 3])), 2.4);
        t.equal(ss.harmonic_mean([1, 2, 4]), 12 / 7);
        t.end();
    });

    test('returns null for empty lists', function(t) {
        t.equal(ss.harmonic_mean([]), null);
        t.end();
    });

    test('returns null for lists with negative numbers', function(t) {
        t.equal(ss.harmonic_mean([-1]), null);
        t.end();
    });
    t.end();
});
