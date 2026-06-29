import assert from "node:assert/strict";
import { it } from "node:test";
import * as Random from "random-js";

const random = new Random.Random(Random.MersenneTwister19937.seed(0));

import * as ss from "../index.js";

function rng() {
    return random.real(0, 1);
}

it("sampleWithReplacement", function () {
    const input = Object.freeze([1, 2, 3, 4, 5, 6]);
    assert.deepEqual(ss.sampleWithReplacement(input, 2, rng), [6, 5]);
    assert.deepEqual(ss.sampleWithReplacement(input, 3, rng), [3, 6, 4]);
    assert.deepEqual(ss.sampleWithReplacement(input, 4, rng), [5, 2, 3, 4]);
    assert.deepEqual(ss.sampleWithReplacement(input, 0, rng), []);
    assert.deepEqual(ss.sampleWithReplacement([], 1, rng), []);
});

it("sampleWithReplacement with no rng", () => {
    assert.deepEqual(ss.sampleWithReplacement([1], 1), [1]);
});
