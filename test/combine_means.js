/* eslint no-shadow: 0 */
'use strict';

var test = require('tap').test;
var ss = require('../');

test('combineMeans', function(t) {
    t.test('can get add a single value to a mean', function(t) {
        var values1 = [8, 3, 4];
        var values2 = [2, 6, 4];
        t.equal(ss.combineMeans(ss.mean(values1), values1.length, ss.mean(values2), values2.length), 4.5);
        t.equal(ss.combineMeans(ss.mean(values1), values1.length, ss.mean(values2), values2.length), ss.mean(values1.concat(values2)));
        t.end();
    });
    t.end();
});
