/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

test("median", function (t) {
    t.test("can get the median of three numbers", function (t) {
        t.equal(ss.median([1, 2, 3]), 2);
        t.end();
    });

    t.test("can get the median of two numbers", function (t) {
        t.equal(ss.median([1, 2]), 1.5);
        t.equal(ss.medianSorted([1, 2]), 1.5);
        t.end();
    });

    t.test("can get the median of four numbers", function (t) {
        t.equal(ss.median([1, 2, 3, 4]), 2.5);
        t.end();
    });

    t.test("cannot calculate the median of an empty list", function (t) {
        t.throws(function () {
            ss.median([]);
        });
        t.end();
    });

    t.test("sorts numbers numerically", function (t) {
        t.equal(ss.median([8, 9, 10]), 9);
        t.end();
    });

    t.test("does not change the sorting order of its input", function (t) {
        const x = [1, 0];
        t.equal(ss.median(x), 0.5);
        t.equal(x[0], 1);
        t.equal(x[1], 0);
        t.end();
    });
    t.end();
});
