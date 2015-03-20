var test = require('tape');
var ss = require('../');

test('jenks', function(t) {
    test('will not try to assign more classes than datapoints', function(t) {
        t.equal(ss.jenks([1, 2], 3), null);
        t.end();
    });
    test('assigns correct breaks (small gaps between classes)', function(t) {
        t.deepEqual(ss.jenks([1, 2, 4, 5, 7, 9, 10, 20], 3), [1, 7, 20, 20]);
        t.end();
    });
    test('assigns correct breaks (large gaps between classes)', function(t) {
        t.deepEqual(ss.jenks([2, 32, 33, 34, 100], 3), [2, 32, 100, 100]);
        t.end();
    });
    test('assigns correct breaks (breaking N points into N classes)', function(t) {
        t.deepEqual(ss.jenks([9, 10, 11, 12, 13], 5), [9, 10, 11, 12, 13, 13]);
        t.end();
    });
    t.end();
});
