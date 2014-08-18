var test = require('tape');
var ss = require('../');

test('quantile_sorted', function(t) {
    // Data and results from
    // [Wikipedia](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
    test('can get proper quantiles of an even-length list', function(t) {
        var even = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
        t.equal(ss.quantile_sorted(even, 0.25), 7);
        t.equal(ss.quantile_sorted(even, 0.5), 9);
        t.equal(ss.quantile_sorted(even, 0.75), 15);
        t.end();
    });
    t.end();
});
