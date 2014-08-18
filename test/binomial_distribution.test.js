var test = require('tape');
var ss = require('../');

function rnd(n) {
    return parseFloat(n.toFixed(4));
}

test('binomial_distribution', function(t) {
    // Data given in the [Wikipedia example](http://en.wikipedia.org/wiki/Binomial_distribution#Example) retrieved 29 Mar 2014
    // Cumulative probabilities worked by hand to mitigate accumulated rounding errors.
    test('can return generate probability and cumulative probability distributions for n = 6, p = 0.3', function(t) {
        t.equal('object', typeof ss.binomial_distribution(6, 0.3));
        t.equal(rnd(ss.binomial_distribution(6, 0.3)[0]), 0.1176, ss.epsilon);
        t.equal(rnd(ss.binomial_distribution(6, 0.3)[1]), 0.3025, ss.epsilon);
        t.equal(rnd(ss.binomial_distribution(6, 0.3)[2]), 0.3241, ss.epsilon);
        t.equal(rnd(ss.binomial_distribution(6, 0.3)[3]), 0.1852, ss.epsilon);
        t.equal(rnd(ss.binomial_distribution(6, 0.3)[4]), 0.0595, ss.epsilon);
        t.equal(rnd(ss.binomial_distribution(6, 0.3)[5]), 0.0102, ss.epsilon);
        t.equal(rnd(ss.binomial_distribution(6, 0.3)[6]), 0.0007, ss.epsilon);
        t.end();
    });

    test('can return null when p or n are not valid parameters', function(t) {
        t.equal(null, ss.binomial_distribution(0, 0.5), 'n should be strictly positive');
        t.equal(null, ss.binomial_distribution(1.5, 0.5), 'n should be an integer');
        t.equal(null, ss.binomial_distribution(2, -0.01), 'p should be greater than 0.0');
        t.equal(null, ss.binomial_distribution(2, 1.5), 'p should be less than 1.0');
        t.end();
    });
    t.end();
});
