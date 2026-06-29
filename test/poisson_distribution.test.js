const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

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
});
