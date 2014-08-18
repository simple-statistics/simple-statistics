var test = require('tape');
var ss = require('../');

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test('sample covariance', function(t) {
    test('can get perfect negative covariance', function(t) {
        var x = [1, 2, 3, 4, 5, 6];
        var y = [6, 5, 4, 3, 2, 1];
        t.equal(rnd(ss.sample_covariance(x, y)), -3.5);
        t.end();
    });

    test('covariance of something with itself is its variance', function(t) {
        var x = [1, 2, 3, 4, 5, 6];
        t.equal(rnd(ss.sample_covariance(x, x)), 3.5);
        t.end();
    });

    test('covariance is zero for something with no correlation', function(t) {
        var x = [1, 2, 3, 4, 5, 6];
        var y = [1, 1, 2, 2, 1, 1];
        t.equal(rnd(ss.sample_covariance(x, y)), 0);
        t.end();
    });

    test('zero-length corner case', function(t) {
        t.equal(rnd(ss.sample_covariance([], [])), 0);
        t.end();
    });
    t.end();
});
