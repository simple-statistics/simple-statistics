/* eslint no-shadow: 0 */


var test = require('tap').test;
var ss = require('../');

test('quantileSorted', function(t) {
    // Data and results from
    // [Wikipedia](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
    t.test('can get proper quantiles of an even-length list', function(t) {
        var even = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
        t.equal(ss.quantileSorted(even, 0.25), 7);
        t.equal(ss.quantileSorted(even, 0.5), 9);
        t.equal(ss.quantileSorted(even, 0.75), 15);
        t.end();
    });
    t.end();
});
