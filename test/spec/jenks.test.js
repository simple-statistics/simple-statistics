var assert = require('chai').assert;
var ss = require('../../');

describe('jenks', function() {
    it('handles boundary conditions', function() {
        assert.equal(ss.jenks([], 1), null);
    });

    it('assigns initial breaks', function() {
        assert.equal(ss.jenks([1, 2, 4, 5, 7, 9, 10, 20], 3), null);
    });
});
