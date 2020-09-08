/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

const EPS = ss.epsilon;
const HALF_EPS = ss.epsilon / 2;
const TWO_EPS = ss.epsilon * 2;

test("approximate strict equality", function (t) {
    t.test("handles equal values", function (t) {
        t.true(ss.approxEqual(14.5, 14.5));
        t.end();
    });

    t.test("handles values separated by less than epsilon", function (t) {
        t.true(ss.approxEqual(1, 1 + HALF_EPS));
        t.end();
    });

    t.test("handles values separated by more than epsilon", function (t) {
        t.true(!ss.approxEqual(1, 1 + TWO_EPS));
        t.end();
    });

    t.test(
        "handles values separated by relatively less than epsilon",
        function (t) {
            t.true(ss.approxEqual(100, 100 + 99 * ss.epsilon));
            t.end();
        }
    );

    t.test(
        "handles values separated by relatively more than epsilon",
        function (t) {
            t.true(!ss.approxEqual(100, 100 + 101 * ss.epsilon));
            t.end();
        }
    );

    t.test("handles negative values", function (t) {
        t.true(ss.approxEqual(-10, -10));
        t.true(ss.approxEqual(-10 - EPS, -10));
        t.true(!ss.approxEqual(-10 - 11 * EPS, -10));
        t.true(!ss.approxEqual(-10, 10));
        t.end();
    });

    t.test("handles larger tolerances", function (t) {
        t.true(!ss.approxEqual(1, 2));
        t.true(ss.approxEqual(1, 2, 1.5));
        t.end();
    });

    t.test("handles values near zero", function (t) {
        t.true(!ss.approxEqual(1, 0));
        t.true(!ss.approxEqual(0, 1));
        t.end();
    });

    t.end();
});
