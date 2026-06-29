import assert from "node:assert/strict";
import { it } from "node:test";
import { uniqueCountSorted } from "../index.js";

it("uniqueCountSorted", function () {
    assert.equal(uniqueCountSorted([]), 0);
    assert.equal(uniqueCountSorted([1]), 1);
    assert.equal(uniqueCountSorted([undefined]), 1);
    assert.equal(uniqueCountSorted([1, 2, 3, 4]), 4);
    assert.equal(uniqueCountSorted([1, 2, 3, 3, 4]), 4);
    assert.equal(uniqueCountSorted([1, 2, 3, 3, 4, 4]), 4);
    assert.equal(uniqueCountSorted([1, 1, 2, 3, 3, 4, 4]), 4);
});
