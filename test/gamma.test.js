/* eslint no-shadow: 0 */


var test = require('tap').test,
    ss = require('../');

test('gamma', function(t) {

    t.test('gamma for integer should return whole number', function(t) {
        t.equal(ss.gamma(5), 24);
        t.end();
    });
    t.test('gamma for positive real number should be correct', function(t) {
        t.equal(ss.gamma(11.54), 13098426.039156161);
        t.end();
    });
    t.test('gamma for negative real float should be correct', function(t) {
        t.equal(ss.gamma(-42.5), -3.419793520724856e-52);
        t.end();
    });
    t.test('gamma for negative integer should return NaN', function(t) {
        t.equal(isNaN(ss.gamma(-2)), true);
        t.end();
    });
    t.test('gamma for zero should return NaN', function(t) {
        t.equal(isNaN(ss.gamma(0)), true);
        t.end();
    });

    t.end();
});
