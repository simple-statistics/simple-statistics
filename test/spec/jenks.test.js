var assert = require('chai').assert;
var ss = require('../../');

describe('jenks', function() {
    it('assigns correct breaks', function() {
        assert.deepEqual(ss.jenks([1, 2, 4, 5, 7, 9, 10, 20], 3), [1, 2, 5, 20]);
    });
});
