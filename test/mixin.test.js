var test = require('tape');
var ss = require('../');

test('mixin', function(t) {
    test('can mix into a single array', function(t) {
        var even = ss.mixin([2, 4, 6, 8]);
        t.equal(even.sum(), 20);
        t.equal(even.mean(), 5);
        t.equal(even.max(), 8);
        t.equal(even.min(), 2);
        t.equal(even.sample_skewness(), 0);
        t.end();
    });

    test('can mix into Array.prototype', function(t) {
        ss.mixin();
        var even = [2, 4, 6, 8];
        t.equal(even.sum(), 20);
        t.equal(even.mean(), 5);
        t.equal(even.max(), 8);
        t.equal(even.min(), 2);
        t.equal(even.sample_skewness(), 0);
        t.end();
    });

    test('mixins can take arguments', function(t) {
        ss.mixin();
        var even = [2, 4, 6, 8];
        t.equal(even.quantile(0.2), 2);
        t.equal(even.quantile(0.8), 8);
        t.end();
    });
    t.end();
});
