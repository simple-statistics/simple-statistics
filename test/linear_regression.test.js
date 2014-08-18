var test = require('tape');
var ss = require('../');

test('linear regression', function(t) {
    test('correctly generates a line for a 0, 0 to 1, 1 dataset', function(t) {
        var l = ss.linear_regression().data([[0, 0], [1, 1]]);
        t.equal(l.line()(0), 0);
        t.equal(l.line()(0.5), 0.5);
        t.equal(l.line()(1), 1);
        t.end();
    });

    test('correctly generates a line for a 0, 0 to 1, 0 dataset', function(t) {
        var l = ss.linear_regression().data([[0, 0], [1, 0]]);
        t.equal(l.line()(0), 0);
        t.equal(l.line()(0.5), 0);
        t.equal(l.line()(1), 0);
        t.end();
    });

    test('returns the data assigned to it', function(t) {
        var l = ss.linear_regression().data([[0, 0], [1, 0]]);
        t.deepEqual(l.data(), [[0, 0], [1, 0]]);
        t.end();
    });

    test('handles a single-point sample', function(t) {
        var l = ss.linear_regression().data([[0, 0]]).line();
        t.deepEqual(l(10), 0);
        t.end();
    });

    test('a straight line will have a slope of 0', function(t) {
        var l = ss.linear_regression().data([[0, 0], [1, 0]]);
        t.equal(l.m(), 0);
        t.equal(l.b(), 0);
        t.end();
    });

    test('a line at 50% grade', function(t) {
        var l = ss.linear_regression().data([[0, 0], [1, 0.5]]);
        t.equal(l.m(), 0.5);
        t.equal(l.b(), 0);
        t.end();
    });

    test('a line with a high y-intercept', function(t) {
        var l = ss.linear_regression().data([[0, 20], [1, 10]]);
        t.equal(l.m(), -10);
        t.equal(l.b(), 20);
        t.end();
    });
    t.end();
});
