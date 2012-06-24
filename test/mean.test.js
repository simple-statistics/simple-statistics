var assert = require('assert');
var ss = require('../');

it('can get the mean of two numbers', function() {
    assert.equal(ss.mean([1, 2]), 1.5);
});
