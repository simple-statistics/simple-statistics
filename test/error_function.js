'use strict';

var test = require('tape');
var ss = require('../');

test('errorFunction', function(t) {
    test('symmetry', function(t) {
        t.equal(ss.errorFunction(-1), -ss.errorFunction(1));
        t.end();
    });
    t.end();
    test('inverse', function(t) {
        for (var i = -1; i <= 1; i += .01) {
            t.equal(Math.abs(ss.errorFunction(ss.inverseErrorFunction(i)) - i) < 4 * ss.epsilon, true);
        }
        t.end();
    });
});
