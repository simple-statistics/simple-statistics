/* eslint no-shadow: 0 */

var test = require("tap").test;
var ss = require("../");

// The zScore method is also tested in the normal distribution tests.
test("zScore", function(t) {
    t.equal(ss.zScore(78, 80, 5), -0.4);
    t.equal(ss.zScore(78, 90, 5), -2.4);
    t.equal(ss.zScore(78, 90, 2), -6);
    t.end();
});
