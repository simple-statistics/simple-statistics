import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("permutationsHeap", function () {
    it("generates 1 permutation", function () {
        assert.deepEqual(ss.permutationsHeap([1]), [[1]]);
    });
    it("generates 1, 2, 3 permutations", function () {
        assert.deepEqual(ss.permutationsHeap([1, 2, 3]), [
            [1, 2, 3],
            [2, 1, 3],
            [3, 1, 2],
            [1, 3, 2],
            [2, 3, 1],
            [3, 2, 1]
        ]);
    });
    it("does not mutate the input array", function () {
        const input = [1, 2, 3];
        ss.permutationsHeap(input);
        assert.deepEqual(input, [1, 2, 3]);
    });
    it("handles frozen arrays", function () {
        const input = Object.freeze([1, 2, 3]);
        assert.deepEqual(ss.permutationsHeap(input), [
            [1, 2, 3],
            [2, 1, 3],
            [3, 1, 2],
            [1, 3, 2],
            [2, 3, 1],
            [3, 2, 1]
        ]);
    });
});
