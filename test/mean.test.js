var test = require('tape');
var ss = require('../');

test('mean', function(t) {
    test('can get the mean of two numbers', function(t) {
        t.equal(ss.mean([1, 2]), 1.5);
        t.end();
    });
    test('can get the mean of one number', function(t) {
        t.equal(ss.mean([1]), 1);
        t.end();
    });
    test('an empty list has no average', function(t) {
        t.equal(ss.mean([]), null);
        t.end();
    });
    t.end();
});
