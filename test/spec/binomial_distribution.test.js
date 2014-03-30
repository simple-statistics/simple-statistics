var assert = require('chai').assert;
var ss = require('../../');

describe('binomial_distribution', function() {
    // Data given in the [Wikipedia example](http://en.wikipedia.org/wiki/Binomial_distribution#Example) retrieved 29 Mar 2014
    // Cumulative probabilities worked by hand to mitigate accumulated rounding errors.
    it('can return generate probability and cumulative probability distributions for n = 6, p = 0.3', function() {
        assert.isObject(ss.binomial_distribution(6, 0.3));
        assert.closeTo(ss.binomial_distribution(6, 0.3)[0].probability_of_x, 0.1176, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[0].cumulative_probability_of_x, 0.1176, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[1].probability_of_x, 0.3025, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[1].cumulative_probability_of_x, 0.4202, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[2].probability_of_x, 0.3241, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[2].cumulative_probability_of_x, 0.7443, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[3].probability_of_x, 0.1852, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[3].cumulative_probability_of_x, 0.9295, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[4].probability_of_x, 0.0595, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[4].cumulative_probability_of_x, 0.9891, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[5].probability_of_x, 0.0102, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[5].cumulative_probability_of_x, 0.9993, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[6].probability_of_x, 0.0007, ss.epsilon);
        assert.closeTo(ss.binomial_distribution(6, 0.3)[6].cumulative_probability_of_x, 1.0, ss.epsilon);
    });

    it('can return null when p or n are not valid parameters', function() {
        assert.isNull(ss.binomial_distribution(0, 0.5), 'n should be strictly positive');
        assert.isNull(ss.binomial_distribution(1.5, 0.5), 'n should be an integer');
        assert.isNull(ss.binomial_distribution(2, -0.01), 'p should be greater than 0.0');
        assert.isNull(ss.binomial_distribution(2, 1.5), 'p should be less than 1.0');
    });
});
