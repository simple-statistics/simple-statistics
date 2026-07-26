import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

function rnd(n) {
    return Number.parseFloat(n.toFixed(4));
}

// expected cumulative probabilities taken from Appendix 1, Table I of William W. Hines & Douglas C.
// Montgomery, "Probability and Statistics in Engineering and Management Science", Wiley (1980).
describe("poissonDistribution", function () {
    it("can return generate probability and cumulative probability distributions for lambda = 3.0", function () {
        assert.equal("object", typeof ss.poissonDistribution(3.0));
        assert.equal(rnd(ss.poissonDistribution(3.0)[3]), 0.224, ss.epsilon);
    });
    it("can generate probability and cumulative probability distributions for lambda = 4.0", function () {
        assert.equal("object", typeof ss.poissonDistribution(4.0));
        assert.equal(rnd(ss.poissonDistribution(4.0)[2]), 0.1465, ss.epsilon);
    });
    it("can generate probability and cumulative probability distributions for lambda = 5.5", function () {
        assert.equal("object", typeof ss.poissonDistribution(5.5));
        assert.equal(rnd(ss.poissonDistribution(5.5)[7]), 0.1234, ss.epsilon);
    });
    it("can generate probability and cumulative probability distributions for lambda = 9.5", function () {
        assert.equal("object", typeof ss.poissonDistribution(9.5));
        assert.equal(rnd(ss.poissonDistribution(9.5)[17]), 0.0088, ss.epsilon);
    });
    it("can return undefined when lambda <= 0", function () {
        assert.equal(undefined, ss.poissonDistribution(0));
        assert.equal(undefined, ss.poissonDistribution(-10));
    });

    // lambda ^ x and x! both leave floating-point range well before the
    // distribution peaks, which used to end the table early on a cell of
    // Infinity or NaN: lambda = 200 returned 135 cells worth 0.000045% of the
    // distribution, and lambda = 1000 returned 104 cells worth none of it.
    it("describes the whole distribution for a large lambda", function () {
        for (const lambda of [1, 50, 110, 111, 150, 200, 745, 746, 1000]) {
            const cells = ss.poissonDistribution(lambda);
            assert.ok(
                cells.every(Number.isFinite),
                "lambda " + lambda + " has a cell that is not a number"
            );
            assert.ok(
                ss.sum(cells) >= 1 - ss.epsilon,
                "lambda " + lambda + " stops short of the distribution"
            );
            assert.ok(
                cells.length > lambda,
                "lambda " + lambda + " stops before its own mean"
            );
        }
    });

    it("peaks at the mean for a large lambda", function () {
        const cells = ss.poissonDistribution(200);
        assert.equal(cells.indexOf(ss.max(cells)), 199);
    });

    // Reference cells evaluated at 50 significant digits with mpmath and
    // cross-checked against scipy.stats.poisson.pmf.
    it("matches reference cells for a large lambda", function () {
        const references = [
            [111, 111, 0.03783750840195968],
            [150, 150, 0.032555409456836548],
            [200, 134, 1.5122660970724418e-7],
            [200, 199, 0.028197727685920822],
            [746, 746, 0.014604683118189346],
            [1000, 900, 7.5169543521259519e-5],
            [1000, 1000, 0.012614611348721499]
        ];
        for (const reference of references) {
            const cells = ss.poissonDistribution(reference[0]);
            assert.ok(
                ss.approxEqual(cells[reference[1]], reference[2], 1e-9),
                "lambda " +
                    reference[0] +
                    " at " +
                    reference[1] +
                    ": " +
                    cells[reference[1]] +
                    " != " +
                    reference[2]
            );
        }
    });

    it("can return undefined when the distribution cannot be tabulated", function () {
        assert.equal(undefined, ss.poissonDistribution(Number.NaN));
        assert.equal(
            undefined,
            ss.poissonDistribution(Number.POSITIVE_INFINITY)
        );
        assert.equal(undefined, ss.poissonDistribution(1e9));
    });
});
