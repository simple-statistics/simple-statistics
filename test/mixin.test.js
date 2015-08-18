/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var ss = require('../');

test('mixin', function(t) {
    var mixinSupported = !!(Object.defineProperty && Object.defineProperties);

    // Early versions of internet explorer don't support the defineProperty
    // method, so mixin will simply throw for them. Thus we skip the tests.
    if (!mixinSupported) {
        t.pass('Skipping mixin tests, no support found');
        t.end();
        return;
    }

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
