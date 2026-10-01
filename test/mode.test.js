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

    it("mode and modeSorted break a tie toward the smallest value", function () {
        // Both sort first, so the order the values arrived in cannot matter.
        assert.equal(mode([5, 5, 2, 2]), 2);
        assert.equal(mode([2, 2, 5, 5]), 2);
        assert.equal(modeSorted([2, 2, 5, 5]), 2);
    });

    it("modeFast breaks a tie toward the value that reaches the count first", function () {
        // It walks the input in order and keeps a strict maximum, so the
        // earlier of two tied values wins.
        assert.equal(modeFast([5, 5, 2, 2]), 5);
        assert.equal(modeFast([2, 2, 5, 5]), 2);
        assert.equal(modeFast(["b", "a", "a", "b"]), "a");
    });

    it("mode and modeFast disagree on ties", function () {
        // Documented here so the difference is deliberate rather than a
        // surprise when swapping one implementation for the other.
        const tied = [5, 5, 2, 2];
        assert.equal(mode(tied), 2);
        assert.equal(modeFast(tied), 5);
    });
});
