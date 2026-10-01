import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("inverseErrorFunction", function () {
    // Reference values obtained by inverting a Maclaurin series expansion of
    // the error function to machine precision.
    const reference = [
        [0.25, 0.22531205501217805],
        [0.5, 0.47693627620446988],
        [0.75, 0.81341984759761798],
        [0.9, 1.163087153676674],
        [0.95, 1.3859038243496777],
        [0.99, 1.8213863677184494]
    ];

    it("matches reference values", function () {
        for (const [y, expected] of reference) {
            assert.equal(
                Math.abs(ss.inverseErrorFunction(y) - expected) < 1e-6,
                true,
                "inverseErrorFunction(" + y + ")"
            );
        }
    });

    it("inverts errorFunction", function () {
        for (let i = -0.99; i <= 0.99; i += 0.01) {
            assert.equal(
                Math.abs(ss.errorFunction(ss.inverseErrorFunction(i)) - i) <
                    1e-6,
                true,
                "round trip at " + i
            );
        }
    });

    it("is zero at zero and odd elsewhere", function () {
        assert.equal(ss.inverseErrorFunction(0), 0);
        for (const y of [0.1, 0.5, 0.9]) {
            assert.equal(
                ss.inverseErrorFunction(-y),
                -ss.inverseErrorFunction(y)
            );
        }
    });

    it("is infinite at the ends of its domain", function () {
        assert.equal(ss.inverseErrorFunction(1), Infinity);
        assert.equal(ss.inverseErrorFunction(-1), -Infinity);
    });

    it("is not a number outside its domain", function () {
        assert.equal(Number.isNaN(ss.inverseErrorFunction(1.5)), true);
        assert.equal(Number.isNaN(ss.inverseErrorFunction(-1.5)), true);
    });
});
