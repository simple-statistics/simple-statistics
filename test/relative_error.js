/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("relative error", function (t) {
    t.test("equal values", function (t) {
        t.equal(ss.relativeError(14.5, 14.5), 0.0);
        t.end();
    });

    t.test("negative values", function (t) {
        t.equal(ss.relativeError(-4, -5), 0.2);
        t.end();
    });

    t.test("correct handling of zero", function (t) {
        t.equal(ss.relativeError(10101, 0), Infinity);
        t.end();
    });

    t.test("correct handling of double zero", function (t) {
        t.equal(ss.relativeError(0, 0), 0);
        t.end();
    });

    t.end();
});
