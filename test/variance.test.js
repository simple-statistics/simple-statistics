var test = require('tape');
var ss = require('../');

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test('variance', function(t) {
    test('can get the variance of a six-sided die', function(t) {
        t.equal(rnd(ss.variance([1, 2, 3, 4, 5, 6])), 2.917);
        t.end();
    });

    test('the variance of one number is zero', function(t) {
        t.equal(rnd(ss.variance([1])), 0);
        t.end();
    });

    test('the variance of no numbers is null', function(t) {
        t.equal(ss.variance([]), null);
        t.end();
    });
    t.end();
});
