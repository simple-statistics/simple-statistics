const { it } = require("node:test");
const assert = require("node:assert/strict");
const numericSort = require("../dist/simple-statistics.js").numericSort;

it("numericSort", function () {
    assert.deepEqual(numericSort([1, 2]), [1, 2]);
    assert.deepEqual(numericSort([2, 1]), [1, 2]);

    const input = Object.freeze([2, 1]);
    const output = Object.freeze([1, 2]);
    assert.deepEqual(numericSort(input), output);
    assert.deepEqual(input, [2, 1], "does not mutate input");
});
