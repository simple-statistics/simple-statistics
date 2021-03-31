/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

test("wilcoxonRankSum", function (t) {
    t.test("x is dominated by y", function (t) {
        const x = [1, 2, 3];
        const y = [4, 5, 6];
        const res = ss.wilcoxonRankSum(x, y);
        t.equal(res, 6);
        t.end();
    });

    t.test("y is dominated by x", function (t) {
        const x = [4, 5, 6];
        const y = [1, 2, 3];
        const res = ss.wilcoxonRankSum(x, y);
        t.equal(res, 15);
        t.end();
    });

    t.test("x and y are interleaved", function (t) {
        const x = [1, 3, 5];
        const y = [2, 4, 6];
        const res = ss.wilcoxonRankSum(x, y);
        t.equal(res, 9);
        t.end();
    });

    t.test("x and y overlap at one value", function (t) {
        const x = [1, 2, 3];
        const y = [3, 4, 5];
        const res = ss.wilcoxonRankSum(x, y);
        t.equal(res, 6.5);
        t.end();
    });

    t.test("trailing tied ranks are handled correctly", function (t) {
        const x = [1, 2, 3];
        const y = [3];
        const res = ss.wilcoxonRankSum(x, y);
        t.equal(res, 6.5);
        t.end();
    });

    t.test("empty input throws", function (t) {
        const message = "Neither sample can be empty";
        t.throws(function () {
            ss.wilcoxonRankSum([], []);
        }, message);
        t.throws(function () {
            ss.wilcoxonRankSum([1, 2, 3], []);
        }, message);
        t.throws(function () {
            ss.wilcoxonRankSum([], [1, 2, 3]);
        }, message);
        t.end();
    });

    t.end();
});
