/* eslint no-shadow: 0 */


var test = require('tap').test;
var ss = require('../');

test('sumNthPowerDeviations', function(t) {
    t.equal(
        ss.sumNthPowerDeviations([0, 0, 0], 2),
        0);
    t.equal(
        ss.sumNthPowerDeviations([0, 1], 2),
        0.5);
    t.equal(
        ss.sumNthPowerDeviations([0, 1], 3),
        0);
    t.equal(
        ss.sumNthPowerDeviations([0, 1, 2], 2),
        2);
    t.end();
});
