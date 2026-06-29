const PerceptronModel = require("../dist/simple-statistics.js").PerceptronModel;
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

describe("perceptron", function () {
    it("initializes to zeros if label is zero", function () {
        const p = new PerceptronModel();
        p.train([1, 2, 3], 0);
        assert.deepEqual(p.weights, [0, 0, 0]);
        assert.equal(p.bias, 0);
    });

    it("initializes to values if label is one", function () {
        const p = new PerceptronModel();
        p.train([1, 2, 3], 1);
        assert.deepEqual(p.weights, [1, 2, 3]);
        assert.equal(p.bias, 1);
    });

    it("base case of zero prediction features", function () {
        const p = new PerceptronModel();
        p.train([1, 2, 3], 1);
        assert.deepEqual(p.predict([]), null);
    });

    it("train with invalid label", function () {
        const p = new PerceptronModel();
        assert.deepEqual(p.train([1, 2, 3], 0.5), null);
    });

    it("learns to separate one from two", function () {
        const p = new PerceptronModel();
        for (let i = 0; i < 4; i++) {
            p.train([1], 0);
            p.train([2], 1);
        }
        assert.equal(p.predict([1]), 0);
        assert.equal(p.predict([2]), 1);
    });

    it("learns a diagonal boundary", function () {
        const p = new PerceptronModel();
        for (let i = 0; i < 5; i++) {
            p.train([1, 1], 1);
            p.train([0, 1], 0);
            p.train([1, 0], 0);
            p.train([0, 0], 0);
        }
        assert.equal(p.predict([0, 0]), 0);
        assert.equal(p.predict([0, 1]), 0);
        assert.equal(p.predict([1, 0]), 0);
        assert.equal(p.predict([1, 1]), 1);
    });
});
