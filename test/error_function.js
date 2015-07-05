'use strict';

var test = require('tape');
var ss = require('../');

test('error_function', function(t) {
    test('symmetry', function(t) {
        t.equal(ss.error_function(-1), -ss.error_function(1));
        t.end();
    });
    t.end();
    test('inverse', function(t) {
        for (var i = -1; i <= 1; i += .01) {
            t.equal(Math.abs(ss.error_function(ss.inverse_error_function(i)) - i) < 4 * ss.epsilon, true);
        }
        t.end();
    });
});
