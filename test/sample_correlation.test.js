var test = require('tape');
var ss = require('../');

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test('sample correlation', function(t) {

    test('can get the sample correlation of identical arrays', function(t) {
        var data = [1, 2, 3, 4, 5, 6];
        t.equal(rnd(ss.sample_correlation(data, data)), 1);
        t.end();
    });

    test('can get the sample correlation of different arrays', function(t) {
        var a = [1, 2, 3, 4, 5, 6];
        var b = [2, 2, 3, 4, 5, 60];
        t.equal(rnd(ss.sample_correlation(a, b)), 0.691);
        t.end();
    });

    test('zero-length corner case', function(t) {
        t.equal(rnd(ss.sample_correlation([], [])), 0);
        t.end();
    });

    t.end();
});
