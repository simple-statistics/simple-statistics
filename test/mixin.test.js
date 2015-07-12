/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var ss = require('../');

test('mixin', function(t) {
    t.test('can mix into a single array', function(t) {
        var even = ss.mixin(ss, [2, 4, 6, 8]);
        t.equal(even.sum(), 20);
        t.equal(even.mean(), 5);
        t.equal(even.max(), 8);
        t.equal(even.min(), 2);
        t.equal(even.sampleSkewness(), 0);
        t.end();
    });

    t.test('can mix into Array.prototype', function(t) {
        ss.mixin(ss);
        var even = [2, 4, 6, 8];
        t.equal(even.sum(), 20);
        t.equal(even.mean(), 5);
        t.equal(even.max(), 8);
        t.equal(even.min(), 2);
        t.equal(even.sampleSkewness(), 0);
        t.end();
    });

    t.test('mixins can take arguments', function(t) {
        ss.mixin(ss);
        var even = [2, 4, 6, 8];
        t.equal(even.quantile(0.2), 2);
        t.equal(even.quantile(0.8), 8);
        t.end();
    });
    t.end();
});
