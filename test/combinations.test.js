import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("combinations", function () {
    it("generates one empty combination when choosing zero objects", function () {
        assert.deepEqual(ss.combinations(Object.freeze([1, 2]), 0), [[]]);
    });
    it("generates one empty combination from an empty collection", function () {
        assert.deepEqual(ss.combinations(Object.freeze([]), 0), [[]]);
    });
    it("has no positive-length combinations of an empty collection", function () {
        assert.deepEqual(ss.combinations([], 1), []);
    });
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
