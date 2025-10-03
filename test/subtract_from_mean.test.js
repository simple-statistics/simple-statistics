/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("subtractFromMean", function (t) {
    t.test("can remove a single value from a mean", function (t) {
        const values = Object.freeze([13, 14, 15, 8, 20, 54]);
        t.equal(ss.subtractFromMean(ss.mean(values), values.length, 54), 14);
        t.equal(
            ss.subtractFromMean(ss.mean(values), values.length, 54),
            ss.mean(values.slice(0, -1))
        );
        t.end();
    });
    t.end();
});
