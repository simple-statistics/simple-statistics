var assert = require('chai').assert;
var ss = require('../../');

describe('generate_bernoulli', function() {
    it('can return null for meaningless parameters', function() {
        assert.isNull(ss.generate_bernoulli(-1));
        assert.isNull(ss.generate_bernoulli(2));
        assert.isNull(ss.generate_bernoulli(0.5, -1));
    });
    it('can return a single valued array when n is one or unspecified', function() {
        assert.isArray(ss.generate_bernoulli(0.5));
        assert.lengthOf(ss.generate_bernoulli(0.5), 1);
        assert.match(ss.generate_bernoulli(0.5),/[01]/);
    });
    it('can return a array of n random variables when n is greater than one', function() {
        assert.isArray(ss.generate_bernoulli(0.5, 10));
        assert.lengthOf(ss.generate_bernoulli(0.1, 10), 10);
        // assert.match(ss.generate_bernoulli(0.5),/[01]/);
    });
});
