/* eslint no-shadow: 0 */

var test = require("tap").test;
var ss = require("../");

test("quantileRank", function(t) {
    // Data and results from
    // [Scipy](https://github.com/scipy/scipy/blob/master/scipy/stats/stats.py)
    t.test("can get proper quantile ranks", function(t) {
        t.equal(ss.quantileRank([3, 2, 4, 1], 3), 0.75);
        t.equal(ss.quantileRank([4, 3, 2, 1, 3], 3), 0.7);
        t.equal(ss.quantileRank([2, 1, 3, 4], 6), 1);
        t.equal(ss.quantileRank([4, 1, 2, 3], -3), 0);
        t.equal(ss.quantileRank([5, 2, 1, 3, 3], 4), 0.8);
        t.equal(ss.quantileRank([5, 567, 1, 11, 2, 22, 4, 45, 3, 34], 5), 0.5);
        t.end();
    });
    t.end();
});
