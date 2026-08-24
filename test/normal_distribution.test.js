import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

describe("natural distribution and z-score", function () {
    it("normal table is exposed in the API", function () {
        assert.equal(ss.standardNormalTable.length, 310);
        assert.equal(ss.standardNormalTable[0], 0.5);
    });

    it("P(Z <= 0.4) is 0.6554", function () {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        assert.equal(ss.cumulativeStdNormalProbability(0.4), 0.6554);
    });

    it("P(Z <= -1.20) is 0.1151", function () {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        assert.equal(ss.cumulativeStdNormalProbability(-1.2), 0.1151);
    });

    it("P(X <= 82) when X ~ N (80, 25) is 0.6554", function () {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        // A professor's exam scores are approximately distributed normally with mean 80 and standard deviation 5.
        // What is the probability that a student scores an 82 or less?
        assert.equal(
            ss.cumulativeStdNormalProbability(ss.zScore(82, 80, 5)),
            0.6554
        );
    });

    it("P(X >= 90) when X ~ N (80, 25) is 0.0228", function () {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        // A professor's exam scores are approximately distributed normally with mean 80 and standard deviation 5.
        // What is the probability that a student scores a 90 or more?
        assert.equal(
            +(
                1 - ss.cumulativeStdNormalProbability(ss.zScore(90, 80, 5))
            ).toPrecision(5),
            0.0228
        );
    });

    it("P(X <= 74) when X ~ N (80, 25) is 0.1151", function () {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        // A professor's exam scores are approximately distributed normally with mean 80 and standard deviation 5.
        // What is the probability that a student scores a 74 or less?
        assert.equal(
            ss.cumulativeStdNormalProbability(ss.zScore(74, 80, 5)),
            0.1151
        );
    });

    it("P(78 <= X <= 88) when X ~ N (80, 25) is 0.6006", function () {
        // Taken from the examples of use in http://en.wikipedia.org/wiki/Standard_normal_table
        // A professor's exam scores are approximately distributed normally with mean 80 and standard deviation 5.
        // What is the probability that a student scores between 78 and 88?
        const prob88 = ss.cumulativeStdNormalProbability(ss.zScore(88, 80, 5));
        const prob78 = ss.cumulativeStdNormalProbability(ss.zScore(78, 80, 5));

        assert.equal(+(prob88 - prob78).toPrecision(5), 0.6006);
    });
});

describe("normalDistribution", function () {
    it("NORM.DIST(42, 40, 1.5, TRUE) is 0.9087888", function () {
        // Cumulative example documented at
        // https://support.microsoft.com/en-us/office/norm-dist-function-edb1cc14-a21c-4e53-839d-8082074c9f8d
        // Reference value 0.9087887802741321 from erf in the C standard library.
        assert.ok(
            Math.abs(
                ss.normalDistribution(42, 40, 1.5, true) - 0.9087887802741321
            ) < 1e-7
        );
    });

    it("NORM.DIST(42, 40, 1.5, FALSE) is 0.10934", function () {
        // Density example documented at
        // https://support.microsoft.com/en-us/office/norm-dist-function-edb1cc14-a21c-4e53-839d-8082074c9f8d
        assert.ok(
            Math.abs(
                ss.normalDistribution(42, 40, 1.5, false) - 0.10934004978399575
            ) < 1e-12
        );
    });

    it("returns the density when cumulative is omitted", function () {
        // The standard normal density at zero is 1 / sqrt(2 * pi)
        assert.ok(
            Math.abs(ss.normalDistribution(0, 0, 1) - 0.3989422804014327) <
                1e-12
        );
    });

    it("P(X <= mean) is one half within the error function's precision", function () {
        // errorFunction approximates erf(0) as about -3.0e-8 rather than
        // zero, so the cumulative probability at the mean falls just below
        // one half. The approximation's absolute error stays below 1.5e-7.
        assert.ok(
            Math.abs(ss.normalDistribution(40, 40, 1.5, true) - 0.5) < 1e-7
        );
    });

    it("P(X <= 82) when X ~ N (80, 25) is 0.6554", function () {
        // The professor example from the cumulativeStdNormalProbability
        // tests above, without the intermediate z-score.
        assert.equal(
            +ss.normalDistribution(82, 80, 5, true).toPrecision(4),
            0.6554
        );
    });

    it("cumulative probabilities are symmetric about the mean", function () {
        // Start above zero: at x = 0 the check reduces to the previous
        // test, and the two sides share one computed error function value,
        // so the symmetry itself holds to floating-point rounding.
        for (let x = 0.25; x <= 8; x += 0.25) {
            const above = ss.normalDistribution(4 + x, 4, 2, true);
            const below = ss.normalDistribution(4 - x, 4, 2, true);
            assert.ok(Math.abs(above + below - 1) < 1e-12);
        }
    });

    it("agrees with the standard normal table", function () {
        // The table has four decimal places, so its round-trip error is
        // bounded by 5e-5; allow 1e-3 for the sweep.
        for (let z = -4; z <= 4; z += 0.25) {
            assert.ok(
                Math.abs(
                    ss.normalDistribution(z, 0, 1, true) -
                        ss.cumulativeStdNormalProbability(z)
                ) < 1e-3
            );
        }
    });

    it("throws when the standard deviation is not greater than zero", function () {
        assert.throws(() => ss.normalDistribution(42, 40, 0, true));
        assert.throws(() => ss.normalDistribution(42, 40, -1.5, true));
    });
});
