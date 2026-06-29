import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("cumulativeStdNormalProbability", function () {
    // https://en.wikipedia.org/wiki/Standard_normal_table#Examples_of_use
    it("wikipedia test example works", function () {
        assert.equal(ss.cumulativeStdNormalProbability(0.4), 0.6554);
    });
    it("nondecreasing", function () {
        for (let i = 0; i < ss.standardNormalTable.length; i++) {
            if (
                !ss.cumulativeStdNormalProbability(i / 100) >=
                ss.cumulativeStdNormalProbability((i - 1) / 100)
            ) {
                assert.fail("non-decreasing failure on " + i);
            }
        }
    });
    it("matches errorFunction", function () {
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
                assert.fail("error-fn failure on " + i);
            }
        }
    });
    it("symmetry", function () {
        assert.equal(
            Math.abs(
                ss.cumulativeStdNormalProbability(-1) -
                    (1 - ss.cumulativeStdNormalProbability(1))
            ) < ss.epsilon,
            true
        );
    });
    it("inverse", function () {
        for (let i = 0; i <= 1 + ss.epsilon; i += 0.01) {
            assert.equal(
                Math.abs(ss.cumulativeStdNormalProbability(ss.probit(i)) - i) <
                    21 * ss.epsilon,
                true
            );
        }
    });
});

describe("cumulativeStdLogisticProbability", function () {
    it("median is zero", function () {
        assert.equal(ss.cumulativeStdLogisticProbability(0), 0.5);
    });
    it("increasing", function () {
        for (let i = -3; i <= 3; i += 0.01) {
            if (
                ss.cumulativeStdLogisticProbability(i + ss.epsilon) <=
                ss.cumulativeStdLogisticProbability(i)
            ) {
                assert.fail("increasing failure at " + i);
            }
        }
    });
    it("symmetry", function () {
        for (let i = 0; i <= 3; i += 0.01) {
            if (
                Math.abs(
                    ss.cumulativeStdLogisticProbability(i) -
                        (1 - ss.cumulativeStdLogisticProbability(-i))
                ) > ss.epsilon
            ) {
                assert.fail("not symmetric about zero");
            }
        }
    });
});
