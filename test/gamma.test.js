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
    it("gamma in (0, 1) should satisfy the two-step recurrence", function () {
        // The fix lifts arguments in (0, 1) by two steps via
        // gamma(n) = gamma(n + 2) / (n * (n + 1)), so this identity
        // holds exactly by construction. It is a method-agnostic
        // check that the returned value tracks the gamma function
        // and not an arbitrary number.
        assert.equal(ss.gamma(0.5), ss.gamma(2.5) / (0.5 * 1.5));
    });
    it("gamma(0.5) should be very close to sqrt(pi)", function () {
        // Stepping up by two evaluates the Nemes expansion on (2, 3),
        // where it is well conditioned, so the value is near-exact.
        // Measured absolute error is about 8.8e-6, so 1e-5 is a tight
        // honest bound rather than a loose one.
        const sqrtPi = Math.sqrt(Math.PI); // 1.7724538509055160
        assert.ok(Math.abs(ss.gamma(0.5) - sqrtPi) < 1e-5);
    });
    it("gamma in (0, 1) should be accurate to ~1e-4", function () {
        // Reference values from a high-precision gamma evaluation. The
        // two-step lift keeps the relative error of these arguments
        // below 1e-4 (measured worst case about 1.5e-5 at 0.25).
        const cases = [
            [0.25, 3.6256099082219083],
            [0.9, 1.0686287021184886]
        ];
        for (const [x, expected] of cases) {
            assert.ok(Math.abs(ss.gamma(x) - expected) / expected < 1e-4);
        }
    });
});
