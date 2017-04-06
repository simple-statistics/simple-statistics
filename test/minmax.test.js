/* eslint no-shadow: 0 */
'use strict';

var test = require('tap').test;
var ss = require('../');

test('min', function(t) {
    t.throws(function() {
        ss.min([]);
    }, 'zero length array throws');
    t.test('can get the minimum of one number', function(t) {
        t.equal(ss.min([1]), 1);
        t.end();
    });

    t.test('can get the minimum of three numbers', function(t) {
        t.equal(ss.min([1, 7, -1000]), -1000);
        t.end();
    });
    t.end();
});

test('max', function(t) {
    t.throws(function() {
        ss.max([]);
    }, 'zero length array throws');
    t.test('can get the maximum of three numbers', function(t) {
        t.equal(ss.max([1, 7, -1000]), 7);
        t.end();
    });
    t.end();
});

test('sorted', function(t) {
    t.equal(ss.maxSorted([1, 7, 1000]), 1000, 'maxSorted');
    t.equal(ss.minSorted([1, 7, 1000]), 1, 'minSorted');
    t.end();
});
