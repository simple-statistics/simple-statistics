var test = require('tape');
var ss = require('../');

test('median absolute deviation (mad)', function(t) {
    test('median absolute deviation of an example on wikipedia', function(t) {
        t.equal(ss.mad([1, 1, 2, 2, 4, 6, 9]), 1);
        t.end();
    });

    // wolfram alpha: median absolute deviation {0,1,2,3,4,5,6,7,8,9,10}
    test('median absolute deviation of 0-10', function(t) {
        t.equal(ss.mad([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 3);
        t.end();
    });

    test('median absolute deviation of one number is zero', function(t) {
        t.equal(ss.mad([1]), 0);
        t.end();
    });

    test('zero-length corner case', function(t) {
        t.equal(ss.mad([]), null);
        t.end();
    });
    t.end();
});
