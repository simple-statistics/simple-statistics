import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mode, modeFast, modeSorted } from "../index.js";

describe("mode", function () {
    [
        ["mode", mode],
        ["modeFast", modeFast]
    ].forEach(function ([modeName, modeFn]) {
        describe(modeName, function () {
            it("the mode of a single-number array is that one number", function () {
                assert.equal(modeFn([1]), 1);
            });

            it("the mode of a two-number array is that one number", function () {
                assert.equal(modeFn([1, 1]), 1);
            });

            it("other cases", function () {
                assert.equal(modeFn([1, 1, 2]), 1);
                assert.equal(modeFn([1, 1, 2, 3]), 1);
                assert.equal(modeFn([1, 1, 2, 3, 3]), 1);
                assert.equal(modeFn([1, 1, 2, 3, 3, 3]), 3);
                assert.equal(modeFn([1, 2, 2, 2, 1, 2, 3, 3, 3]), 2);
                assert.equal(modeFn([1, 2, 3, 4, 5]), 1);
                assert.equal(modeFn([1, 2, 3, 4, 5, 5]), 5);
                assert.equal(modeFn([1, 2, 2, 3, 3, 4, 1, 4, 1]), 1);
            });

            it("the mode of an empty array is null", function () {
                assert.throws(function () {
                    modeFn([]);
                });
            });

            it("the mode of a three-number array with two same numbers is the repeated one", function () {
                assert.equal(modeFn([1, 2, 2]), 2);
            });
        });
    });

    it("mode sorted", function () {
        assert.equal(modeSorted([1, 2, 2]), 2);
    });
});
