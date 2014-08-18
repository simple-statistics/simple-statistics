var test = require('tape');
var ss = require('../');

test('r-squared', function(t) {
    test('says that the r squared of a two-point line is perfect', function(t) {
        var d = [[0, 0], [1, 1]];
        var l = ss.linear_regression().data(d);
        t.equal(ss.r_squared(d, l.line()), 1);
        t.end();
    });

    test('says that the r squared of a three-point line is not perfect', function(t) {
        var d = [[0, 0], [0.5, 0.2], [1, 1]];
        var l = ss.linear_regression().data(d);
        t.notEqual(ss.r_squared(d, l.line()), 1);
        t.end();
    });

    test('r-squared of single sample is 1', function(t) {
        var d = [[0, 0]];
        var l = ss.linear_regression().data(d);
        t.equal(ss.r_squared(d, l.line()), 1);
        t.end();
    });
    t.end();
});
