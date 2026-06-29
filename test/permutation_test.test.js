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
});
