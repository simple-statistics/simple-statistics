var test = require('tape');
var ss = require('../');

test('quantile', function(t) {
    // Data and results from
    // [Wikipedia](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
    test('can get proper quantiles of an even-length list', function(t) {
        var even = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
        t.equal(ss.quantile(even, 0.25), 7);
        t.equal(ss.quantile(even, 0.5), 9);
        t.equal(ss.quantile(even, 0.75), 15);
        t.end();
    });

    test('can get proper quantiles of an odd-length list', function(t) {
        var odd = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];
        t.equal(ss.quantile(odd, 0.25), 7);
        t.equal(ss.quantile(odd, 0.5), 9);
        t.equal(ss.quantile(odd, 0.75), 15);
        t.end();
    });

    test('the median quantile is equal to the median', function(t) {
        var rand = [1, 4, 5, 8];
        t.equal(ss.quantile(rand, 0.5), ss.median(rand));
        var rand2 = [10, 50, 2, 4, 4, 5, 8];
        t.equal(ss.quantile(rand2, 0.5), ss.median(rand2));
        t.end();
    });

    test('a zero-length list produces null', function(t) {
        t.equal(ss.quantile([], 0.5), null);
        t.end();
    });

    test('test odd-value case', function(t) {
        t.equal(ss.quantile([0, 1, 2, 3, 4], 0.2), 1);
        t.end();
    });

    test('bad bounds produce null', function(t) {
        t.equal(ss.quantile([1, 2, 3], 1.1), null);
        t.equal(ss.quantile([1, 2, 3], -0.5), null);
        t.end();
    });

    test('max quantile is equal to the max', function(t) {
        t.equal(ss.quantile([1, 2, 3], 1), ss.max([1, 2, 3]));
        t.end();
    });

    test('min quantile is equal to the min', function(t) {
        t.equal(ss.quantile([1, 2, 3], 0), ss.min([1, 2, 3]));
        t.end();
    });

    test('if quantile arg is an array, response is an array of quantiles', function(t) {
        var odd = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];
        t.deepEqual(ss.quantile(odd, [0, 0.25, 0.5, 0.75, 1]), [3, 7, 9, 15, 20]);
        t.deepEqual(ss.quantile(odd, [0.75, 0.5]), [15, 9]);
        t.end();
    });
    t.end();
});
