import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("errorFunction", function () {
    it("symmetry", function () {
        assert.equal(ss.errorFunction(-1), -ss.errorFunction(1));
    });
    it("is zero at zero", function () {
        assert.equal(ss.errorFunction(0), 0);
    });
    it("keeps the sign and size of small inputs", function () {
        // Reference values from Python's math.erf.
        const reference = [
            [1e-12, 1.1283791670955124e-12],
            [1e-9, 1.1283791670955125e-9],
            [1e-6, 1.1283791670951362e-6],
            [1e-3, 0.0011283787909692365],
            [0.1, 0.1124629160182849],
            [0.25, 0.2763263901682369],
            [0.45, 0.47548171978692366]
        ];
        for (const [x, expected] of reference) {
            assert.equal(
                Math.abs(ss.errorFunction(x) - expected) < 1e-14 * expected,
                true,
                "errorFunction(" + x + ")"
            );
            assert.equal(ss.errorFunction(-x), -ss.errorFunction(x));
        }
    });
    it("inverse", function () {
        for (let i = -1; i <= 1; i += 0.01) {
            assert.equal(
                Math.abs(ss.errorFunction(ss.inverseErrorFunction(i)) - i) <
                    4 * ss.epsilon,
                true
            );
        }
    });
});
