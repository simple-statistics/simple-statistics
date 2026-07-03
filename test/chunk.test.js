import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("chunk", function () {
    it("can get chunks of an array", function () {
        assert.deepEqual(ss.chunk([1, 2], 1), [[1], [2]]);
        assert.deepEqual(ss.chunk([1, 2], 2), [[1, 2]]);
        assert.deepEqual(ss.chunk([1, 2, 3, 4], 4), [[1, 2, 3, 4]]);
        assert.deepEqual(ss.chunk([1, 2, 3, 4], 2), [
            [1, 2],
            [3, 4]
        ]);
        assert.deepEqual(ss.chunk([1, 2, 3, 4], 3), [[1, 2, 3], [4]]);
        assert.deepEqual(ss.chunk([1, 2, 3, 4, 5, 6, 7], 2), [
            [1, 2],
            [3, 4],
            [5, 6],
            [7]
        ]);
        assert.deepEqual(ss.chunk([], 2), []);
        assert.throws(function () {
            ss.chunk([1, 2], 0);
        });

        assert.throws(function () {
            ss.chunk([1, 2], 1.5);
        });
    });
});
