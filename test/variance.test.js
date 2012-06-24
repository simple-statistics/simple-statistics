var assert = require('assert');
var ss = require('../');

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

it('can get the variance of a six-sided die', function() {
    assert.equal(rnd(ss.variance([1, 2, 3, 4, 5, 6])), 2.917);
});
