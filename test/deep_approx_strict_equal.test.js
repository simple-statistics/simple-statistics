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
            ["number", 3],
            ["object", { key: "value" }]
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

        t.true(!ss.deepApproxStrictEqual([1], { a: 1 }));
        t.true(!ss.deepApproxStrictEqual({ a: 1 }, [1]));
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

    t.test("does not think scalars and objects are equal", function (t) {
        t.true(!ss.deepApproxStrictEqual(10, { ten: 10 }));
        t.end();
    });

    t.test("handles undefined values", function (t) {
        t.true(ss.deepApproxStrictEqual(undefined, undefined));
        t.end();
    });

    t.test("handles functions", function (t) {
        const left = function () {
            return 0;
        };
        const alsoLeft = function () {
            return 0;
        };
        const right = function () {
            return 1;
        };
        t.true(ss.deepApproxStrictEqual(left, left));
        t.true(!ss.deepApproxStrictEqual(left, alsoLeft));
        t.true(!ss.deepApproxStrictEqual(left, right));
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

    t.test("objects equal within tolerance", function (t) {
        t.true(ss.deepApproxStrictEqual({ a: 1 }, { a: 1 + HALF_EPS }));
        t.end();
    });

    t.test("objects not equal outside tolerance", function (t) {
        t.true(!ss.deepApproxStrictEqual({ a: 1 }, { a: 1 + TWO_EPS }));
        t.end();
    });

    t.test("objects not equal with extra keys", function (t) {
        t.true(!ss.deepApproxStrictEqual({ a: 1, b: 1 }, { a: 1 }));
        t.end();
    });

    t.test("compares arrays of objects", function (t) {
        t.true(ss.deepApproxStrictEqual([{ a: 1 - HALF_EPS },
                                         { b: 1 + HALF_EPS }],
                                        [{ a: 1 },
                                         { b: 1 }]));
        t.true(!ss.deepApproxStrictEqual([{ a: 1 - HALF_EPS },
                                          { b: 1 + HALF_EPS }],
                                         [{ a: 1},
                                          { b: 1 + TWO_EPS }]));
        t.end();
    });

    t.test("compares objects with arrays", function (t) {
        t.true(ss.deepApproxStrictEqual({ a: [1, 2],
                                          b: [1 + HALF_EPS, 2 - HALF_EPS] },
                                        { a: [1, 2],
                                          b: [1, 2] }));
        t.true(!ss.deepApproxStrictEqual({ a: [1, 2],
                                           b: [1 + TWO_EPS, 2 - HALF_EPS] },
                                         { a: [1, 2],
                                           b: [1, 2 - HALF_EPS] }));
        t.end();
    });

    t.test("compares nested structures with different tolerance", function (t) {
        t.true(!ss.deepApproxStrictEqual({ a: [1, 2], b: [1 + TWO_EPS, 2] },
                                         { a: [1, 2], b: [1, 2] }));
        t.true(ss.deepApproxStrictEqual({ a: [1, 2], b: [1, 2] },
                                        { a: [1, 2], b: [1, 2] },
                                        4 * EPS));
        t.end();
    });

    t.end();
});
