import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

describe("root_mean_square", function () {
    // From http://en.wikipedia.org/wiki/Root_mean_square
    it("can get the RMS of two or more numbers", function () {
        assert.equal(ss.rootMeanSquare([1, 1]), 1);
        assert.equal(rnd(ss.rootMeanSquare([3, 4, 5])), 4.082);
        assert.equal(rnd(ss.rootMeanSquare([-0.1, 5, -2, 10])), 5.679);
    });

    it("returns null for empty lists", function () {
        assert.throws(function () {
            ss.rootMeanSquare([]);
        });
    });

    it("is unaffected when the squares leave range", function () {
        // The root mean square of n copies of a value is that value, so each
        // of these is representable even though the squares are not.
        assert.equal(ss.rootMeanSquare([1e200]), 1e200);
        assert.equal(ss.rootMeanSquare([1e300, 1e300]), 1e300);
        assert.equal(ss.rootMeanSquare([1e-200]), 1e-200);

        const mixed = ss.rootMeanSquare([3e200, 4e200]);
        assert.ok(
            Math.abs(mixed - 3.5355339059327374e200) <=
                3.5355339059327374e200 * 1e-9,
            "expected about 3.54e200, got " + mixed
        );

        // all-zero input still has a root mean square of zero
        assert.equal(ss.rootMeanSquare([0, 0]), 0);
    });
});
