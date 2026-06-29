import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("combinations", function () {
    it("generates 1 permutation", function () {
        assert.deepEqual(ss.combinationsReplacement(Object.freeze([1]), 1), [
            [1]
        ]);
    });
    it("generates combinations of 1,2 choosing two at a time, with replacement", function () {
        assert.deepEqual(ss.combinationsReplacement(Object.freeze([1, 2]), 2), [
            [1, 1],
            [1, 2],
            [2, 2]
        ]);
    });
});
