import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("gamma", function () {
    it("gamma for integer should return whole number", function () {
        assert.equal(ss.gamma(5), 24);
    });
    it("gamma for positive real float should be correct", function () {
        assert.ok(Math.abs(ss.gamma(11.54) - 13098426.039156161) < ss.epsilon);
    });
    it("gamma for negative real float should be correct", function () {
        assert.ok(
            Math.abs(ss.gamma(-42.5) - -3.419793520724856e-52) < ss.epsilon
        );
    });
    it("gamma for negative integer should return NaN", function () {
        assert.ok(Number.isNaN(ss.gamma(-2)));
    });
    it("gamma for zero should return NaN", function () {
        assert.ok(Number.isNaN(ss.gamma(0)));
    });
    it("gamma for argument in (0, 1) should return a finite value", function () {
        // Regression: these inputs previously triggered infinite
        // recursion (RangeError: Maximum call stack size exceeded),
        // even though gamma is documented as defined for all real n
        // except zero and negative integers.
        assert.ok(Number.isFinite(ss.gamma(0.5)));
        assert.ok(Number.isFinite(ss.gamma(0.25)));
        assert.ok(Number.isFinite(ss.gamma(0.9)));
    });
    it("gamma should satisfy the recurrence it is lifted by", function () {
        // Small arguments are raised by gamma(n) = gamma(n + 1) / n, so
        // this identity holds exactly by construction. It is a
        // method-agnostic check that the returned value tracks the
        // gamma function and not an arbitrary number.
        assert.equal(ss.gamma(0.5), ss.gamma(1.5) / 0.5);
        assert.equal(ss.gamma(1.25), ss.gamma(2.25) / 1.25);
    });
    it("gamma(0.5) should be very close to sqrt(pi)", function () {
        const sqrtPi = Math.sqrt(Math.PI); // 1.7724538509055160
        assert.ok(Math.abs(ss.gamma(0.5) - sqrtPi) < 1e-12);
    });
    it("gamma(1.5) should be very close to sqrt(pi) / 2", function () {
        assert.ok(Math.abs(ss.gamma(1.5) - Math.sqrt(Math.PI) / 2) < 1e-12);
    });
    it("gamma just above 1 should be accurate", function () {
        // The Nemes expansion is asymptotic and diverges here. Applied
        // directly it returned 1.2128 for gamma(1.1), 1.27 times the
        // true value, and 2.8 for gamma(1.01).
        const cases = [
            [1.01, 0.99432585119150574],
            [1.1, 0.95135076986687339],
            [1.9, 0.96176583190738722]
        ];
        for (const [x, expected] of cases) {
            assert.ok(
                Math.abs(ss.gamma(x) - expected) / expected < 1e-10,
                "gamma(" + x + ")"
            );
        }
    });
    it("gamma in (0, 1) should be accurate", function () {
        // Reference values from a high-precision gamma evaluation.
        const cases = [
            [0.25, 3.6256099082219064],
            [0.9, 1.068628702119319]
        ];
        for (const [x, expected] of cases) {
            assert.ok(
                Math.abs(ss.gamma(x) - expected) / expected < 1e-10,
                "gamma(" + x + ")"
            );
        }
    });
});
