var assert = require('chai').assert;
var ss = require('../../');

describe('gvf', function() {
    it('when variance is zero, returns infinity', function() {
        assert.equal(ss.gvf([1, 1, 1], [[1], [1], [1]]), Infinity);
    });
});
