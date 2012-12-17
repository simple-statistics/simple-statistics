var assert = require('chai').assert;
var ss = require('../../');

describe('linear regression', function() {
    it('correctly generates a line for a 0, 0 to 1, 1 dataset', function() {
        var l = ss.linear_regression().data([[0, 0], [1, 1]]);
        assert.equal(l.line()(0), 0);
        assert.equal(l.line()(0.5), 0.5);
        assert.equal(l.line()(1), 1);
    });

    it('correctly generates a line for a 0, 0 to 1, 0 dataset', function() {
        var l = ss.linear_regression().data([[0, 0], [1, 0]]);
        assert.equal(l.line()(0), 0);
        assert.equal(l.line()(0.5), 0);
        assert.equal(l.line()(1), 0);
    });
});
