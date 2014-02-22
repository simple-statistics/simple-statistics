var assert = require('chai').assert;
var ss = require('../../');

describe('uniform_quantile', function() {

    it('can compute the quantile of the standard uniform distribution', function() {
        for (var i = 0; i <= 1; i += 0.1)
          assert.equal(ss.uniform_quantile(i, 0, 1), i);
    });

    it('handles out of bound probability parameter', function() {
        assert.equal(ss.uniform_quantile(-1, 0, 1), null);
        assert.equal(ss.uniform_quantile(2, 0, 1), null);
    });

    it('handles different min/max values', function() {
        assert.equal(ss.uniform_quantile(0.5, 1, 10), 5.5);
        assert.equal(ss.uniform_quantile(0.5, 10, 20), 15);
    });

    it('handles wrong min/max values', function() {
        assert.equal(ss.uniform_quantile(0.5, 5, 2), null);
    });

    it('computes the lower tail value by default', function() {
        assert.equal(ss.uniform_quantile(0.2, 0, 1), 0.2);
    });

    it('can compute the upper tail value', function() {
        assert.equal(ss.uniform_quantile(0.2, 0, 1, false), 0.8);
    });

});
