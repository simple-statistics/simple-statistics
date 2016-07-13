/* eslint no-shadow: 0 */
'use strict';

var test = require('tap').test;
var sign = require('../src/sign');

test('bisect', function(t) {
    t.test('can find sign of number', function(t) {
        t.equal(sign(2), 1);
        t.equal(sign(0), 0);
        t.equal(sign(-0), 0);
        t.equal(sign(-2), -1);
        t.equal(sign(-0.000001), -1);
        t.equal(sign(0.000001), 1);
        t.throws(function() {
            sign('hello world!');
        }, 'Throws with syntax error x is not a number');
        t.end();
    });
    t.end();
});
