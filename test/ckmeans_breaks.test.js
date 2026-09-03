import assert from "node:assert/strict";
import { it } from "node:test";
import { ckmeansBreaks } from "../index.js";

it("ckmeansBreaks", function () {
    assert.deepEqual(
        ckmeansBreaks(Object.freeze([-1, 2, -1, 2, 4, 5, 6, -1, 2, -1]), 3),
        [-1, 2, 4, 6],
        "breaks are the first value of each cluster, plus the max"
    );

    assert.deepEqual(
        ckmeansBreaks([1, 2, 3, 4, 5, 6], 1),
        [1, 6],
        "one class always returns [min, max], like equalIntervalBreaks"
    );

    assert.deepEqual(
        ckmeansBreaks([5], 1),
        [5, 5],
        "single-value input still returns an nClasses + 1 length array"
    );

    assert.throws(function () {
        ckmeansBreaks([1, 2], 5);
    });
});
