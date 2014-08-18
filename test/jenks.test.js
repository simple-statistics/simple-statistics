var test = require('tape');
var ss = require('../');

test('jenks', function(t) {
    test('will not try to assign more classes than datapoints', function(t) {
        t.equal(ss.jenks([1, 2], 3), null);
        t.end();
    });
    test('assigns correct breaks', function(t) {
        t.deepEqual(ss.jenks([1, 2, 4, 5, 7, 9, 10, 20], 3), [1, 2, 5, 20]);
        t.end();
    });
    t.end();
});
