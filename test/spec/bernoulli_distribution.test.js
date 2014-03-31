var assert = require('chai').assert;
var ss = require('../../');

describe('bernoulli_distribution', function() {
    it('can return generate probability and cumulative probability distributions for p = 0.3', function() {
        assert.isObject(ss.bernoulli_distribution(0.3));
        assert.closeTo(ss.bernoulli_distribution(0.3)[0].probability_of_x, 0.7, ss.epsilon);
        assert.closeTo(ss.bernoulli_distribution(0.3)[0].cumulative_probability_of_x, 0.7, ss.epsilon);
        assert.closeTo(ss.bernoulli_distribution(0.3)[1].probability_of_x, 0.3, ss.epsilon);
        assert.closeTo(ss.bernoulli_distribution(0.3)[1].cumulative_probability_of_x, 1.0, ss.epsilon);
    });
    it('can return null when p is not a valid probability', function() {
        assert.isNull(ss.bernoulli_distribution(-0.01), 'p should be greater than 0.0');
        assert.isNull(ss.bernoulli_distribution(1.5), 'p should be less than 1.0');
    });
});
