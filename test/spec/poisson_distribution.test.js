var assert = require('chai').assert;
var ss = require('../../');

// expected cumulative probabilities taken from Appendix 1, Table I of William W. Hines & Douglas C.
// Montgomery, "Probability and Statistics in Engineering and Management Science", Wiley (1980).
describe('poisson_distribution', function() {
    it('can return generate probability and cumulative probability distributions for lambda = 3.0', function() {
        assert.isObject(ss.poisson_distribution(3.0));
        assert.closeTo(ss.poisson_distribution(3.0)[3], 0.2240, ss.epsilon);
    });
    it('can generate probability and cumulative probability distributions for lambda = 4.0', function() {
        assert.isObject(ss.poisson_distribution(4.0));
        assert.closeTo(ss.poisson_distribution(4.0)[2], 0.1465, ss.epsilon);
    });
    it('can generate probability and cumulative probability distributions for lambda = 5.5', function() {
        assert.isObject(ss.poisson_distribution(5.5));
        assert.closeTo(ss.poisson_distribution(5.5)[7], 0.1234, ss.epsilon);
    });
    it('can generate probability and cumulative probability distributions for lambda = 9.5', function() {
        assert.isObject(ss.poisson_distribution(9.5));
        assert.closeTo(ss.poisson_distribution(9.5)[17], 0.0088, ss.epsilon);
    });
    it('can return null when lambda <= 0', function() {
        assert.isNull(ss.poisson_distribution(0));
        assert.isNull(ss.poisson_distribution(-10));
    });
});
