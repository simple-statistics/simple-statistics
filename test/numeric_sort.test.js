import assert from "node:assert/strict";
import { it } from "node:test";
import { numericSort } from "../index.js";

it("numericSort", function () {
    assert.deepEqual(numericSort([1, 2]), [1, 2]);
    assert.deepEqual(numericSort([2, 1]), [1, 2]);

    const input = Object.freeze([2, 1]);
    const output = Object.freeze([1, 2]);
    assert.deepEqual(numericSort(input), output);
    assert.deepEqual(input, [2, 1], "does not mutate input");
});
