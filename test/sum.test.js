var assert = require('assert');
var ss = require('../');

it('can get the sum of two numbers', function() {
    assert.equal(ss.sum([1, 2]), 3);
});
