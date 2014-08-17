var assert = require('chai').assert;
var ss = require('../../');

describe('chunks', function() {
    it('can get chunks of an array', function() {
        assert.deepEqual(ss.chunks([1, 2], 2), [[1], [2]]);
        assert.deepEqual(ss.chunks([1, 2], 1), [[1, 2]]);
        assert.deepEqual(ss.chunks([1, 2, 3, 4], 1), [[1, 2, 3, 4]]);
        assert.deepEqual(ss.chunks([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);
    });
});
