var assert = require('assert');
var ss = require('../');

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

it('can get the standard deviation of an example on wikipedia', function() {
    assert.equal(rnd(ss.standard_deviation([2, 4, 4, 4, 5, 5, 7, 9])), 2);
});
