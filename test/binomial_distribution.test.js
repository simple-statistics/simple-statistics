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
