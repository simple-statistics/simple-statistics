/* eslint no-shadow: 0 */


var test = require('tap').test;
var ss = require('../');

test('standardError', function(t) {
    t.test('can get the standard error of the wikipedia standard deviation example', function(t) {
        t.equal(ss.standardError([2, 4, 4, 4, 5, 5, 7, 9]), 2 / Math.sqrt(8));
        t.end();
    });

    t.end();
});
