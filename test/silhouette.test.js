const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const ss = require("../dist/simple-statistics.js");

describe("silhouette test", function () {
    it("Requires equal-sized arrays", function () {
        assert.throws(function () {
            ss.silhouette([[0]], [1, 2]);
        });
    });

    it("Single cluster of one point has metric 0", function () {
        const points = Object.freeze([[0.5]]);
        const labels = Object.freeze([0]);
        const actual = ss.silhouette(points, labels);
        assert.deepEqual(actual, [0.0]);
        const metric = ss.silhouetteMetric(points, labels);
        assert.equal(metric, 0.0);
    });

    it("Single cluster of two points has metric 1.0", function () {
        const points = Object.freeze([[0.25], [0.75]]);
        const labels = Object.freeze([0, 0]);
        const actual = ss.silhouette(points, labels);
        assert.deepEqual(actual, [1.0, 1.0]);
        const metric = ss.silhouetteMetric(points, labels);
        assert.equal(metric, 1.0);
    });

    it("Two clusters with one point each has metric 0.0", function () {
        const points = Object.freeze([[0.25], [0.75]]);
        const labels = Object.freeze([0, 1]);
        const actual = ss.silhouette(points, labels);
        assert.deepEqual(actual, [0.0, 0.0]);
        const metric = ss.silhouetteMetric(points, labels);
        assert.equal(metric, 0.0);
    });

    // Outer points have a = 0.1, b = 0.5, s = 4/5.
    // Inner points have a = 0.1, b = 0.3, s = 2/3.
    it("Two clusters with two points each has metric 0.5", function () {
        const points = Object.freeze([[0.2], [0.4], [0.6], [0.8]]);
        const labels = Object.freeze([0, 0, 1, 1]);
        const actual = ss.silhouette(points, labels);
        const expected = Object.freeze([4 / 5, 2 / 3, 2 / 3, 4 / 5]);
        assert.ok(actual.every((val, i) => ss.approxEqual(val, expected[i])));
        const metric = ss.silhouetteMetric(points, labels);
        assert.ok(ss.approxEqual(metric, 4 / 5));
    });
});
