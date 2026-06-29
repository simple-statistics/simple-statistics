import assert from "node:assert/strict";
import { it } from "node:test";
import { ckmeans as cK } from "../index.js";

it("C k-means", function () {
    assert.ok(cK, "exports fn");

    assert.throws(function () {
        cK(Object.freeze([]), 10);
    });

    assert.deepEqual(cK(Object.freeze([1]), 1), [[1]], "single-value case");

    assert.deepEqual(
        cK(Object.freeze([1, 1, 1, 1]), 1),
        [[1, 1, 1, 1]],
        "same-value case"
    );

    const exampleInput = Object.freeze([-1, 2, -1, 2, 4, 5, 6, -1, 2, -1]);
    const example = cK(Object.freeze(exampleInput), 3);

    assert.deepEqual(example, [
        [-1, -1, -1, -1],
        [2, 2, 2],
        [4, 5, 6]
    ]);
    assert.deepEqual(cK(Object.freeze([1, 2, 3]), 3), [[1], [2], [3]]);

    assert.deepEqual(cK(Object.freeze([0, 3, 4]), 2), [[0], [3, 4]]);
    assert.deepEqual(cK(Object.freeze([-3, 0, 4]), 2), [[-3, 0], [4]]);

    assert.deepEqual(cK(Object.freeze([1, 2, 2, 3]), 3), [[1], [2, 2], [3]]);
    assert.deepEqual(cK(Object.freeze([1, 2, 2, 3, 3]), 3), [
        [1],
        [2, 2],
        [3, 3]
    ]);
    assert.deepEqual(cK(Object.freeze([1, 2, 3, 2, 3]), 3), [
        [1],
        [2, 2],
        [3, 3]
    ]);
    assert.deepEqual(cK(Object.freeze([3, 2, 3, 2, 1]), 3), [
        [1],
        [2, 2],
        [3, 3]
    ]);
    assert.deepEqual(cK(Object.freeze([3, 2, 3, 5, 2, 1]), 3), [
        [1, 2, 2],
        [3, 3],
        [5]
    ]);

    assert.deepEqual(cK(Object.freeze([0, 1, 2, 100, 101, 103]), 2), [
        [0, 1, 2],
        [100, 101, 103]
    ]);
    assert.deepEqual(cK(Object.freeze([0, 1, 2, 50, 100, 101, 103]), 3), [
        [0, 1, 2],
        [50],
        [100, 101, 103]
    ]);

    // Covers a floating point imprecision edge case
    assert.deepEqual(
        cK(
            Object.freeze([
                64.64249127327881, 64.64249127328245, 57.79216426169771
            ]),
            2
        ),
        [[57.79216426169771], [64.64249127327881, 64.64249127328245]]
    );
});
