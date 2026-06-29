const { it } = require("node:test");
const assert = require("node:assert/strict");
const uniqueCountSorted =
    require("../dist/simple-statistics.js").uniqueCountSorted;

it("uniqueCountSorted", function () {
    assert.equal(uniqueCountSorted([]), 0);
    assert.equal(uniqueCountSorted([1]), 1);
    assert.equal(uniqueCountSorted([undefined]), 1);
    assert.equal(uniqueCountSorted([1, 2, 3, 4]), 4);
    assert.equal(uniqueCountSorted([1, 2, 3, 3, 4]), 4);
    assert.equal(uniqueCountSorted([1, 2, 3, 3, 4, 4]), 4);
    assert.equal(uniqueCountSorted([1, 1, 2, 3, 3, 4, 4]), 4);
});
