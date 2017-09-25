/* eslint no-shadow: 0 */


var test = require('tap').test,
    ss = require('../');

test('t test', function(t) {

    t.test('can compare a known value to the mean of samples', function(t) {
        var res = ss.tTest([1, 2, 3, 4, 5, 6], 3.385);
        t.equal(res, 0.1649415480881466);
        t.end();
    });

    t.end();
});
