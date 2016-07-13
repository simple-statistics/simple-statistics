/* eslint no-shadow: 0 */
'use strict';

var test = require('tap').test;
var ss = require('../');

test('product', function(t) {
    t.test('can get the product of one number', function(t) {
        t.equal(ss.product([2]), 2);
        t.end();
    });

    t.test('can get the product of two numbers', function(t) {
        t.equal(ss.product([2, 3]), 6);
        t.end();
    });

    t.test('can get the product of a negative number', function(t) {
        t.equal(ss.product([-1, 2, 3, 4]), -24);
        t.end();
    });

    t.test('the product of no numbers is one - the multiplicative identity', function(t) {
        t.equal(ss.product([]), 1);
        t.end();
    });
    t.end();
});
