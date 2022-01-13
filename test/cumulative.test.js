/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("cumulativeStdNormalProbability", function (t) {
    // https://en.wikipedia.org/wiki/Standard_normal_table#Examples_of_use
    t.test("wikipedia test example works", function (t) {
        t.equal(ss.cumulativeStdNormalProbability(0.4), 0.6554);
        t.end();
    });
    t.test("nondecreasing", function (t) {
        for (let i = 0; i < ss.standardNormalTable.length; i++) {
            if (
                !ss.cumulativeStdNormalProbability(i / 100) >=
                ss.cumulativeStdNormalProbability((i - 1) / 100)
            ) {
                t.fail("non-decreasing failure on " + i);
            }
        }
        t.end();
    });
    t.test("matches errorFunction", function (t) {
        for (let i = 0; i < ss.standardNormalTable.length; i++) {
            if (
                !(
                    Math.abs(
                        ss.cumulativeStdNormalProbability(i / 100) -
                            (0.5 +
                                0.5 * ss.errorFunction(i / 100 / Math.sqrt(2)))
                    ) < ss.epsilon
                )
            ) {
                t.fail("error-fn failure on " + i);
            }
        }
        t.end();
    });
    t.test("symmetry", function (t) {
        t.equal(
            Math.abs(
                ss.cumulativeStdNormalProbability(-1) -
                    (1 - ss.cumulativeStdNormalProbability(1))
            ) < ss.epsilon,
            true
        );
        t.end();
    });
    t.test("inverse", function (t) {
        for (let i = 0; i <= 1 + ss.epsilon; i += 0.01) {
            t.equal(
                Math.abs(ss.cumulativeStdNormalProbability(ss.probit(i)) - i) <
                    21 * ss.epsilon,
                true
            );
        }
        t.end();
    });
    t.end();
});

test("cumulativeStdLogisticProbability", function (t) {
    t.test("median is zero", function (t) {
        t.equal(ss.cumulativeStdLogisticProbability(0), 0.5);
        t.end();
    });
    t.test("increasing", function (t) {
        for (let i = -3; i <= 3; i += 0.01) {
            if (
                ss.cumulativeStdLogisticProbability(i + ss.epsilon) <=
                ss.cumulativeStdLogisticProbability(i)
            ) {
                t.fail("increasing failure at " + i);
            }
        }
        t.end();
    });
    t.test("symmetry", function (t) {
        for (let i = 0; i <= 3; i += 0.01) {
            if (
                Math.abs(
                    ss.cumulativeStdLogisticProbability(i) -
                        (1 - ss.cumulativeStdLogisticProbability(-i))
                ) > ss.epsilon
            ) {
                t.fail("not symmetric about zero");
            }
        }
        t.end();
    });
    t.end();
});
