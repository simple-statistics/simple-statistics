/* eslint no-shadow: 0 */
'use strict';

var test = require('tape');
var ss = require('../');

function rnd(n) {
    return parseFloat(n.toFixed(4));
}

// expected cumulative probabilities taken from Appendix 1, Table I of William W. Hines & Douglas C.
// Montgomery, "Probability and Statistics in Engineering and Management Science", Wiley (1980).
test('poissonDistribution', function(t) {
    test('can return generate probability and cumulative probability distributions for lambda = 3.0', function(t) {
        t.equal('object', typeof ss.poissonDistribution(3.0));
        t.equal(rnd(ss.poissonDistribution(3.0)[3]), 0.2240, ss.epsilon);
        t.end();
    });
    test('can generate probability and cumulative probability distributions for lambda = 4.0', function(t) {
        t.equal('object', typeof ss.poissonDistribution(4.0));
        t.equal(rnd(ss.poissonDistribution(4.0)[2]), 0.1465, ss.epsilon);
        t.end();
    });
    test('can generate probability and cumulative probability distributions for lambda = 5.5', function(t) {
        t.equal('object', typeof ss.poissonDistribution(5.5));
        t.equal(rnd(ss.poissonDistribution(5.5)[7]), 0.1234, ss.epsilon);
        t.end();
    });
    test('can generate probability and cumulative probability distributions for lambda = 9.5', function(t) {
        t.equal('object', typeof ss.poissonDistribution(9.5));
        t.equal(rnd(ss.poissonDistribution(9.5)[17]), 0.0088, ss.epsilon);
        t.end();
    });
    test('can return null when lambda <= 0', function(t) {
        t.equal(null, ss.poissonDistribution(0));
        t.equal(null, ss.poissonDistribution(-10));
        t.end();
    });
    t.end();
});
