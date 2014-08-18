var test = require('tape');
var ss = require('../');

test('interquartile range (iqr)', function(t) {
    // Data and results from
    // [Wikipedia](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
    test('can get proper iqr of an even-length list', function(t) {
        var even = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
        t.equal(ss.quantile(even, 0.75) - ss.quantile(even, 0.25), ss.iqr(even));
        t.end();
    });

    test('can get proper iqr of an odd-length list', function(t) {
        var odd = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];
        t.equal(ss.quantile(odd, 0.75) - ss.quantile(odd, 0.25), ss.iqr(odd));
        t.end();
    });

    test('an iqr of a zero-length list produces null', function(t) {
        t.equal(ss.iqr([]), null);
        t.end();
    });
    t.end();
});
