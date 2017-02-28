/* eslint no-shadow: 0 */
'use strict';

var test = require('tap').test;
var ss = require('../');

test('subtractFromMean', function(t) {
    t.test('can remove a single value from a mean', function(t) {
        var values = [13, 14, 15, 8, 20, 54];
        t.equal(ss.subtractFromMean(ss.mean(values), values.length, 54), 14);
        t.equal(ss.subtractFromMean(ss.mean(values), values.length, 54), ss.mean(values.slice(0, -1)));
        t.end();
    });
    t.end();
});
