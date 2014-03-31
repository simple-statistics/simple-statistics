var assert = require('chai').assert;
var ss = require('../../');

describe('factorial', function() {
    it('can return null given a negative number', function() {
        assert.isNull(ss.factorial(-1));
    });
    it('can calculate 0! = 1', function() {
        assert.equal(ss.factorial(0), 1);
    });
    it('can calculate 1! = 1', function() {
        assert.equal(ss.factorial(1), 1);
    });
    it('can calculate 100! = 1', function() {
        assert.equal(ss.factorial(100), 9.33262154439441e+157);
    });
});
