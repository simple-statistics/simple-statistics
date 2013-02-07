var assert = require('chai').assert;
var ss = require('../../');

describe('jenks', function() {
    it('handles boundary conditions', function() {
        assert.equal(ss.jenks([], 1), null);
    });
});
