var assert = require('chai').assert;
var ss     = require('../../');

describe('t test', function() {
    it('can compare a known value to the mean of samples', function() {
      var t = ss.t_test([1, 2, 3, 4, 5, 6], 3.385);
      assert.equal(t, 0.1649415480881466);
    });
    it('can test independency of two samples', function() {
      var t = ss.t_test_two_sample([1,2,3,4],[3,4,5,6], 0);
      assert.equal(t, -2.1908902300206643);
    });
});
