var test = require('tape');
var ss = require('../');

test('mode', function(t) {
    test('the mode of a single-number array is that one number', function(t) {
        t.equal(ss.mode([1]), 1);
        t.end();
    });

    test('the mode of a two-number array is that one number', function(t) {
        t.equal(ss.mode([1, 1]), 1);
        t.end();
    });

    test('other cases', function(t) {
        t.equal(ss.mode([1, 1, 2]), 1);
        t.equal(ss.mode([1, 1, 2, 3]), 1);
        t.equal(ss.mode([1, 1, 2, 3, 3]), 1);
        t.equal(ss.mode([1, 1, 2, 3, 3, 3]), 3);
        t.equal(ss.mode([1, 1, 2, 2, 2, 2, 3, 3, 3]), 2);
        t.equal(ss.mode([1, 2, 3, 4, 5]), 1);
        t.equal(ss.mode([1, 2, 3, 4, 5, 5]), 5);
        t.equal(ss.mode([1, 1, 1, 2, 2, 3, 3, 4, 4]), 1);
        t.end();
    });

    test('the mode of an empty array is null', function(t) {
        t.equal(ss.mode([]), null);
        t.end();
    });

    test('the mode of a three-number array with two same numbers is the repeated one', function(t) {
        t.equal(ss.mode([1, 2, 2]), 2);
        t.end();
    });
    t.end();
});
