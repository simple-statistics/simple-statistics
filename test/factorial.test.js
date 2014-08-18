var test = require('tape');
var ss = require('../');

test('factorial', function(t) {
    test('can return null given a negative number', function(t) {
        t.equal(null, ss.factorial(-1));
        t.end();
    });
    test('can calculate 0! = 1', function(t) {
        t.equal(ss.factorial(0), 1);
        t.end();
    });
    test('can calculate 1! = 1', function(t) {
        t.equal(ss.factorial(1), 1);
        t.end();
    });
    test('can calculate 100! = 1', function(t) {
        t.equal(ss.factorial(100), 9.33262154439441e+157);
        t.end();
    });
    t.end();
});
