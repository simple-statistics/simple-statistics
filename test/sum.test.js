/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("sum", function (t) {
    t.test("can get the sum of two numbers", function (t) {
        t.equal(ss.sum([1, 2]), 3);
        t.end();
    });

    t.test("the sum of no numbers is zero", function (t) {
        t.equal(ss.sum([]), 0);
        t.end();
    });

    t.test("returns NaN if a non-number is given", function (t) {
        t.ok(Number.isNaN(ss.sum([1, null])));
        t.ok(Number.isNaN(ss.sum([null, 1])));
        t.ok(Number.isNaN(ss.sum([1, 2, null])));
        t.ok(Number.isNaN(ss.sum([1, 2, true])));
        t.end();
    });
    t.end();
});

test("sumSimple", function (t) {
    t.test("can get the sum of two numbers", function (t) {
        t.equal(ss.sumSimple([1, 2]), 3);
        t.end();
    });

    t.test("can get the sum of two numbers", function (t) {
        t.equal(
            ss.sumSimple([
                0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3,
                1.4, 1.5, 1.6, 1.7
            ]),
            15.299999999999999
        );
        t.equal(
            ss.sum([
                0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3,
                1.4, 1.5, 1.6, 1.7
            ]),
            15.3
        );
        t.end();
    });

    t.test("the sum of no numbers is zero", function (t) {
        t.equal(ss.sumSimple([]), 0);
        t.end();
    });

    t.test("same NaN behavior as sum", function (t) {
        t.ok(Number.isNaN(ss.sumSimple([null])));
        t.ok(Number.isNaN(ss.sumSimple([1, 2, null])));
        t.end();
    });
    t.end();
});
