var test = require('tape');
var ss = require('../');

function rnd(n) {
    return parseFloat(n.toFixed(4));
}

// expected cumulative probabilities taken from Appendix 1, Table I of William W. Hines & Douglas C.
// Montgomery, "Probability and Statistics in Engineering and Management Science", Wiley (1980).
test('poisson_distribution', function(t) {
    test('can return generate probability and cumulative probability distributions for lambda = 3.0', function(t) {
        t.equal('object', typeof ss.poisson_distribution(3.0));
        t.equal(rnd(ss.poisson_distribution(3.0)[3]), 0.2240, ss.epsilon);
        t.end();
    });
    test('can generate probability and cumulative probability distributions for lambda = 4.0', function(t) {
        t.equal('object', typeof ss.poisson_distribution(4.0));
        t.equal(rnd(ss.poisson_distribution(4.0)[2]), 0.1465, ss.epsilon);
        t.end();
    });
    test('can generate probability and cumulative probability distributions for lambda = 5.5', function(t) {
        t.equal('object', typeof ss.poisson_distribution(5.5));
        t.equal(rnd(ss.poisson_distribution(5.5)[7]), 0.1234, ss.epsilon);
        t.end();
    });
    test('can generate probability and cumulative probability distributions for lambda = 9.5', function(t) {
        t.equal('object', typeof ss.poisson_distribution(9.5));
        t.equal(rnd(ss.poisson_distribution(9.5)[17]), 0.0088, ss.epsilon);
        t.end();
    });
    test('can return null when lambda <= 0', function(t) {
        t.equal(null, ss.poisson_distribution(0));
        t.equal(null, ss.poisson_distribution(-10));
        t.end();
    });
    t.end();
});
