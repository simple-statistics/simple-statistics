import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

function rnd(n) {
    return Number.parseFloat(n.toFixed(4));
}

describe("binomialDistribution", function () {
    // Data given in the [Wikipedia example](http://en.wikipedia.org/wiki/Binomial_distribution#Example) retrieved 29 Mar 2014
    // Cumulative probabilities worked by hand to mitigate accumulated rounding errors.
    it("can return generate probability and cumulative probability distributions for n = 6, p = 0.3", function () {
        assert.equal("object", typeof ss.binomialDistribution(6, 0.3));
        assert.equal(
            rnd(ss.binomialDistribution(6, 0.3)[0]),
            0.1176,
            ss.epsilon
        );
        assert.equal(
            rnd(ss.binomialDistribution(6, 0.3)[1]),
            0.3025,
            ss.epsilon
        );
        assert.equal(
            rnd(ss.binomialDistribution(6, 0.3)[2]),
            0.3241,
            ss.epsilon
        );
        assert.equal(
            rnd(ss.binomialDistribution(6, 0.3)[3]),
            0.1852,
            ss.epsilon
        );
        assert.equal(
            rnd(ss.binomialDistribution(6, 0.3)[4]),
            0.0595,
            ss.epsilon
        );
        assert.equal(
            rnd(ss.binomialDistribution(6, 0.3)[5]),
            0.0102,
            ss.epsilon
        );
        assert.equal(
            rnd(ss.binomialDistribution(6, 0.3)[6]),
            0.0007,
            ss.epsilon
        );
    });

    // The binomial coefficient and the two powers each leave floating-point
    // range well before the distribution peaks, which used to end the table
    // early on a cell of Infinity or NaN: binomialDistribution(1021, 0.5)
    // returned 497 cells worth 19% of the distribution, and
    // binomialDistribution(10000, 0.5) returned 135 cells worth none of it.
    it("describes the whole distribution for a large number of trials", function () {
        const cases = [
            [1020, 0.5],
            [1021, 0.5],
            [2000, 0.5],
            [10000, 0.5],
            [10000, 0.999],
            [100000, 0.001]
        ];
        for (const parameters of cases) {
            const label = parameters[0] + ", " + parameters[1];
            const cells = ss.binomialDistribution(parameters[0], parameters[1]);
            assert.ok(
                cells.every(Number.isFinite),
                label + " has a cell that is not a number"
            );
            assert.ok(
                ss.sum(cells) >= 1 - ss.epsilon,
                label + " stops short of the distribution"
            );
            assert.ok(
                cells.length <= parameters[0] + 1,
                label + " runs past the last possible outcome"
            );
        }
    });

    it("peaks at the mean for a large number of trials", function () {
        const cells = ss.binomialDistribution(10000, 0.5);
        assert.equal(cells.indexOf(ss.max(cells)), 5000);
    });

    // Reference cells evaluated at 50 significant digits with mpmath and
    // cross-checked against scipy.stats.binom.pmf.
    it("matches reference cells for a large number of trials", function () {
        const references = [
            [1021, 0.5, 510, 0.024952173249668672],
            [2000, 0.5, 900, 8.0046118774649461e-7],
            [2000, 0.5, 1000, 0.01783901114585432],
            [10000, 0.5, 5000, 0.0079786461393821541],
            [100000, 0.001, 50, 1.2082375507591476e-8],
            [100000, 0.001, 100, 0.039880942234625599]
        ];
        for (const reference of references) {
            const cells = ss.binomialDistribution(reference[0], reference[1]);
            assert.ok(
                ss.approxEqual(cells[reference[2]], reference[3], 1e-8),
                reference[0] +
                    ", " +
                    reference[1] +
                    " at " +
                    reference[2] +
                    ": " +
                    cells[reference[2]] +
                    " != " +
                    reference[3]
            );
        }
    });

    it("keeps the certain outcomes at the ends of the probability range", function () {
        assert.deepEqual(ss.binomialDistribution(10, 0), [1]);
        const allSuccesses = ss.binomialDistribution(10, 1);
        assert.equal(allSuccesses.length, 11);
        assert.equal(allSuccesses[10], 1);
        assert.equal(ss.sum(allSuccesses), 1);
    });

    it("can return undefined when the distribution cannot be tabulated", function () {
        assert.equal(undefined, ss.binomialDistribution(5, Number.NaN));
        assert.equal(undefined, ss.binomialDistribution(1e9, 0.5));
    });

    it("can return null when p or n are not valid parameters", function () {
        assert.equal(
            ss.binomialDistribution(0, 0.5),
            undefined,
            "n should be strictly positive"
        );
        assert.equal(
            ss.binomialDistribution(1.5, 0.5),
            undefined,
            "n should be an integer"
        );
        assert.equal(
            ss.binomialDistribution(2, -0.01),
            undefined,
            "p should be greater than 0.0"
        );
        assert.equal(
            ss.binomialDistribution(2, 1.5),
            undefined,
            "p should be less than 1.0"
        );
    });
});
