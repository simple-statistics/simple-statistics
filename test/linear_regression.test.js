var assert = require('assert');
var ss = require('../');

it('correctly generates a line for a 0, 0 to 1, 1 dataset', function() {
    var l = ss.linear_regression().data([[0, 0], [1, 1]]);
    assert.equal(l.line()(0), 0);
    assert.equal(l.line()(1), 1);
});
