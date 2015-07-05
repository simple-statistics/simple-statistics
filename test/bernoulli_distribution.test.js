/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var ss = require('../');

test('bernoulliDistribution', function(t) {
    test('can return generate probability and cumulative probability distributions for p = 0.3', function(t) {
        t.equal('object', typeof ss.bernoulliDistribution(0.3));
        t.equal(ss.bernoulliDistribution(0.3)[0], 0.7, ss.epsilon);
        t.equal(ss.bernoulliDistribution(0.3)[1], 0.3, ss.epsilon);
        t.end();
    });
    test('can return null when p is not a valid probability', function(t) {
        t.equal(null, ss.bernoulliDistribution(-0.01), 'p should be greater than 0.0');
        t.equal(null, ss.bernoulliDistribution(1.5), 'p should be less than 1.0');
        t.end();
    });
    t.end();
});
