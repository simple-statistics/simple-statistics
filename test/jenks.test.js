/* eslint no-shadow: 0 */

const test = require("tap").test;
const jenks = require("../dist/simple-statistics.js").jenks;

test("jenks", function (t) {
    t.test("will not try to assign more classes than datapoints", function (t) {
        t.equal(jenks([1, 2], 3), null);
        t.end();
    });
    t.test("assigns correct breaks (small gaps between classes)", function (t) {
        t.same(jenks([1, 2, 4, 5, 7, 9, 10, 20], 3), [1, 7, 20, 20]);
        t.end();
    });
    t.test("assigns correct breaks (large gaps between classes)", function (t) {
        t.same(jenks([2, 32, 33, 34, 100], 3), [2, 32, 100, 100]);
        t.end();
    });
    t.test(
        "assigns correct breaks (breaking N points into N classes)",
        function (t) {
            t.same(jenks([9, 10, 11, 12, 13], 5), [9, 10, 11, 12, 13, 13]);
            t.end();
        }
    );
    t.end();
});
