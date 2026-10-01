import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as Random from "random-js";

const random = new Random.Random(Random.MersenneTwister19937.seed(0));

import * as ss from "../index.js";

function rng() {
    return random.real(0, 1);
}

describe("permutation test", function () {
    it("P-value of identical distributions being different should be 1", function () {
        assert.equal(
            ss.permutationTest([2, 2, 2, 2, 2], [2, 2, 2, 2, 2]),
            1,
            undefined,
            rng
        );
    });
    it("P-value of distribution less than itself should be 1", function () {
        assert.equal(
            ss.permutationTest(
                [2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2],
                "greater",
                undefined,
                rng
            ),
            1
        );
    });
    it("P-value of small sample greater than large sample should be 0", function () {
        assert.ok(
            ss.permutationTest(
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [
                    99999, 99999, 99999, 99999, 99999, 99999, 99999, 99999,
                    99999, 99999
                ],
                "less",
                undefined,
                rng
            ) < ss.epsilon
        );
    });

    it("permutationTest should throw error if wrong argument received", function () {
        assert.throws(function () {
            ss.permutationTest([1, 69, 420], [42, 42, 42], "one-tailed");
        });
    });

    it("handles samples of unequal length", function () {
        // Each permutation keeps the original group sizes (3 and 1). The
        // observed difference is mean([10, 10, 10]) - mean([0]) = 10, which a
        // permutation can match only when the single 0 lands in the second
        // group, one quarter of the time. Splitting the pool in half instead
        // compared this against 2-vs-2 permutations, whose mean difference can
        // never reach 10, so the p-value collapsed to 0.
        const seeded = new Random.Random(Random.MersenneTwister19937.seed(42));
        const p = ss.permutationTest([10, 10, 10], [0], "two_side", 10000, () =>
            seeded.real(0, 1)
        );
        assert.ok(Math.abs(p - 0.25) < 0.05);
    });
});
