var assert = require('chai').assert;
var ss = require('../../');

// expected cumulative probabilities taken from Appendix 1, Table I of William W. Hines & Douglas C.
// Montgomery, "Probability and Statistics in Engineering and Management Science", Wiley (1980).
describe('poisson_distribution', function() {
    it('can return generate probability and cumulative probability distributions for lambda = 3.0', function() {
        assert.isObject(ss.poisson_distribution(3.0));
        assert.closeTo(ss.poisson_distribution(3.0)[3].probability_of_x, 0.2240, ss.epsilon);
        assert.closeTo(ss.poisson_distribution(3.0)[3].cumulative_probability_of_x, 0.647, 0.001);
    });
    it('can generate probability and cumulative probability distributions for lambda = 4.0', function() {
        assert.isObject(ss.poisson_distribution(4.0));
        assert.closeTo(ss.poisson_distribution(4.0)[2].probability_of_x, 0.1465, ss.epsilon);
        assert.closeTo(ss.poisson_distribution(4.0)[2].cumulative_probability_of_x, 0.238, 0.001);
    });
    it('can generate probability and cumulative probability distributions for lambda = 5.5', function() {
        assert.isObject(ss.poisson_distribution(5.5));
        assert.closeTo(ss.poisson_distribution(5.5)[7].probability_of_x, 0.1234, ss.epsilon);
        assert.closeTo(ss.poisson_distribution(5.5)[7].cumulative_probability_of_x, 0.809, 0.001);
    });
    it('can generate probability and cumulative probability distributions for lambda = 9.5', function() {
        assert.isObject(ss.poisson_distribution(9.5));
        assert.closeTo(ss.poisson_distribution(9.5)[17].probability_of_x, 0.0088, ss.epsilon);
        assert.closeTo(ss.poisson_distribution(9.5)[17].cumulative_probability_of_x, 0.991, 0.001);
    });
    it('can return null when lambda <= 0', function() {
        assert.isNull(ss.poisson_distribution(0));
        assert.isNull(ss.poisson_distribution(-10));
    });
});
