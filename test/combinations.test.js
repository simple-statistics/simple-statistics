const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("combinations", function () {
    it("generates 1 permutation", function () {
        assert.deepEqual(ss.combinations([1], 1), [[1]]);
    });
    it("generates combinations of 1,2,3 choosing two at a time", function () {
        assert.deepEqual(ss.combinations([1, 2, 3], 2), [
            [1, 2],
            [1, 3],
            [2, 3]
        ]);
    });
});
