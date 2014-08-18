var test = require('tape');
var ss = require('../');

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test('sample_standard_deviation', function(t) {
    test('can get the standard deviation of an example on wikipedia', function(t) {
        t.equal(rnd(ss.sample_standard_deviation([2, 4, 4, 4, 5, 5, 7, 9])), 2.138);
        t.end();
    });

    test('zero-length corner case', function(t) {
        t.equal(rnd(ss.sample_standard_deviation([])), 0);
        t.end();
    });
    t.end();
});
