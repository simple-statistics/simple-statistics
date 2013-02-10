var assert = require('chai').assert;
var ss = require('../../');

describe('jenksDynamic', function() {
    it('assigns initial breaks', function() {
        assert.equal(ss.jenksDynamic([1, 2, 4, 5, 7, 9, 10, 20], 3), null);
    });
});
