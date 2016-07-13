/* eslint no-shadow: 0 */
'use strict';

var test = require('tap').test;
var bisect = require('../src/bisect');

test('bisect', function(t) {
    t.test('can find root of sin and cos', function(t) {
        t.equal(Number(bisect(Math.sin,1,4,100,0.003).toFixed(4)), 3.1416);
        t.equal(Number(bisect(Math.cos,0,4,100,0.003).toFixed(4)), 1.5723);
        t.throws(function() {
            bisect(0);
        }, 'Throws with syntax error f must be a function');
        t.end();
    });
    t.end();
});
