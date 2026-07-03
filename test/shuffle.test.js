import assert from "node:assert/strict";
import { it } from "node:test";
import * as Random from "random-js";

const random = new Random.Random(Random.MersenneTwister19937.seed(0));

import * as ss from "../index.js";

function rng() {
    return random.real(0, 1);
}

it("shuffle", function () {
    const input = Object.freeze([1, 2, 3, 4, 5, 6]);
    assert.deepEqual(ss.shuffle([], rng), []);
    assert.deepEqual(ss.shuffle(input, rng), [1, 5, 3, 2, 4, 6]);
    assert.deepEqual(
        input,
        [1, 2, 3, 4, 5, 6],
        "does not change original array"
    );
    assert.deepEqual(ss.shuffle(input, rng), [5, 4, 1, 3, 6, 2]);
    assert.deepEqual(
        input,
        [1, 2, 3, 4, 5, 6],
        "does not change original array"
    );
});

it("shuffleInPlace", function () {
    const input = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(ss.shuffleInPlace([], rng), []);
    assert.deepEqual(ss.shuffleInPlace(input, rng), [6, 1, 5, 2, 4, 3]);
    assert.deepEqual(input, [6, 1, 5, 2, 4, 3], "changes original array");
});

it("shuffleInPlace truly random", function () {
    const input = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(ss.shuffleInPlace([]), []);
    assert.deepEqual(ss.shuffleInPlace(input).sort(), [1, 2, 3, 4, 5, 6]);
});
