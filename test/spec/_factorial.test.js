var assert = require('chai').assert;
var ss = require('../../');

describe('_factorial', function() {
    it('can return null given a negative number', function() {
        assert.isNull(ss._factorial(-1));
    });
    it('can calculate 0! = 1', function() {
        assert.equal(ss._factorial(0), 1);
    });
    it('can calculate 1! = 1', function() {
        assert.equal(ss._factorial(1), 1);
    });
    it('can calculate 100! = 1', function() {
        assert.equal(ss._factorial(100), 9.33262154439441e+157);
    });
});
