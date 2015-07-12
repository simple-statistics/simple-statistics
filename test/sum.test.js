/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var ss = require('../');

test('sum', function(t) {
    t.test('can get the sum of two numbers', function(t) {
        t.equal(ss.sum([1, 2]), 3);
        t.end();
    });

    t.test('the sum of no numbers is zero', function(t) {
        t.equal(ss.sum([]), 0);
        t.end();
    });
    t.end();
});
