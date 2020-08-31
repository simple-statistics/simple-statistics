/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

const EPS = ss.epsilon;
const HALF_EPS = ss.epsilon / 2;
const TWO_EPS = ss.epsilon * 2;

test("deep approximate equality", function (t) {
    t.test("requires matching types", function (t) {
        const fixtures = [
            ["null", null],
            ["boolean", false],
            ["string", "abc"],
            ["number", 3]
        ];
        for (const [leftType, leftVal] of fixtures) {
            for (const [rightType, rightVal] of fixtures) {
                if (leftType === rightType) {
                    t.true(ss.deepApproxStrictEqual(leftVal, rightVal));
                }
                else {
                    t.true(!ss.deepApproxStrictEqual(leftVal, rightVal));
                }
            }
        }
        t.end();
    });

    t.test("does not convert numbers to strings", function (t) {
        t.true(!ss.deepApproxStrictEqual(10, "10"));
        t.end();
    });

    t.test("does not think scalars and arrays are equal", function (t) {
        t.true(!ss.deepApproxStrictEqual(10, [10]));
        t.end();
    });

    t.test("does not think scalars and sets are equal", function (t) {
        t.true(!ss.deepApproxStrictEqual(10, new Set([10])));
        t.end();
    });

    t.test("handles undefined values", function (t) {
        t.true(ss.deepApproxStrictEqual(undefined, undefined));
        t.end();
    });

    t.test("requires arrays to be of the same length", function (t) {
        t.true(!ss.deepApproxStrictEqual([], [1]));
        t.true(!ss.deepApproxStrictEqual([1], [1, 1]));
        t.end();
    });

    t.test("requires arrays to have similar values", function (t) {
        t.true(ss.deepApproxStrictEqual([1, -1], [1, -1]));
        t.true(ss.deepApproxStrictEqual([1 + HALF_EPS, -1 + HALF_EPS],
                                        [1, -1]));
        t.true(!ss.deepApproxStrictEqual([1, 1], [1, 1 + TWO_EPS]));
        t.end();
    });

    t.end();
});
