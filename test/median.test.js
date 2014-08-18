var test = require('tape');
var ss = require('../');

test('median', function(t) {
    test('can get the median of three numbers', function(t) {
        t.equal(ss.median([1, 2, 3]), 2);
        t.end();
    });

    test('can get the median of two numbers', function(t) {
        t.equal(ss.median([1, 2]), 1.5);
        t.end();
    });

    test('can get the median of four numbers', function(t) {
        t.equal(ss.median([1, 2, 3, 4]), 2.5);
        t.end();
    });

    test('gives null for the median of an empty list', function(t) {
        t.equal(ss.median([]), null);
        t.end();
    });

    test('sorts numbers numerically', function(t) {
        t.equal(ss.median([8, 9, 10]), 9);
        t.end();
    });

    test('does not change the sorting order of its input', function(t) {
        var x = [1, 0];
        t.equal(ss.median(x), 0.5);
        t.equal(x[0], 1);
        t.equal(x[1], 0);
        t.end();
    });
    t.end();
});
