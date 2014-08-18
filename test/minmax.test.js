var test = require('tape');
var ss = require('../');

test('min', function(t) {
    test('can get the minimum of one number', function(t) {
        t.equal(ss.min([1]), 1);
        t.end();
    });

    test('can get the minimum of three numbers', function(t) {
        t.equal(ss.min([1, 7, -1000]), -1000);
        t.end();
    });
    t.end();
});

test('max', function(t) {
    test('can get the maximum of three numbers', function(t) {
        t.equal(ss.max([1, 7, -1000]), 7);
        t.end();
    });
    t.end();
});
