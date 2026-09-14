import assert from "node:assert/strict";
import { it } from "node:test";
import * as Random from "random-js";

const random = new Random.Random(Random.MersenneTwister19937.seed(0));

import * as ss from "../index.js";

function rng() {
    return random.real(0, 1);
}

it("reservoirSample picks each item about k / n of the time", function () {
    const population = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const k = 3;
    const trials = 5000;
    const expected = k / population.length;
    const tolerance = 0.04;

    const counts = new Array(population.length).fill(0);
    for (let t = 0; t < trials; t++) {
        for (const value of ss.reservoirSample(population, k, rng)) {
            counts[value]++;
        }
    }

    for (let i = 0; i < counts.length; i++) {
        const frequency = counts[i] / trials;
        assert.ok(
            Math.abs(frequency - expected) < tolerance,
            `item ${i} picked ${frequency}, expected near ${expected}`
        );
    }
});

it("reservoirSample returns the whole stream when k matches it", function () {
    const population = [1, 2, 3, 4, 5];
    const picked = ss.reservoirSample(population, population.length, rng);
    assert.deepEqual(picked.slice().sort(), population.slice().sort());
});

it("reservoirSample returns everything when k exceeds the stream", function () {
    const population = [1, 2, 3];
    const picked = ss.reservoirSample(population, 10, rng);
    assert.deepEqual(picked.slice().sort(), population.slice().sort());
});

it("reservoirSample returns one item when k is one", function () {
    const population = [1, 2, 3, 4, 5];
    const picked = ss.reservoirSample(population, 1, rng);
    assert.equal(picked.length, 1);
    assert.ok(population.includes(picked[0]));
});

it("reservoirSample takes nothing when k is zero, like sample", function () {
    assert.deepEqual(ss.reservoirSample([1, 2, 3], 0, rng), []);
    assert.deepEqual(ss.sample([1, 2, 3], 0, rng), []);
});

it("reservoirSample accepts a generator", function () {
    function* naturalNumbers(max) {
        for (let i = 1; i <= max; i++) {
            yield i;
        }
    }

    const picked = ss.reservoirSample(naturalNumbers(20), 4, rng);
    assert.equal(picked.length, 4);
    for (const value of picked) {
        assert.ok(value >= 1 && value <= 20);
    }
});

it("reservoirSample with no rng", () => {
    const picked = ss.reservoirSample([1, 2, 3], 2);
    assert.equal(picked.length, 2);
});
