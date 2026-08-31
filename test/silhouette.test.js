import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

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

    // a(i) is the mean distance to the OTHER members of a point's own
    // cluster (excluding the point itself); b(i) is the mean distance to
    // every member of the nearest other cluster.
    //
    // Outer points (0.2 and 0.8) each have one other member in their own
    // cluster: a = 0.2. Their nearest-cluster mean is b = (0.4 + 0.6) / 2 = 0.5.
    // s = (b - a) / max(a, b) = (0.5 - 0.2) / 0.5 = 0.6.
    //
    // Inner points (0.4 and 0.6) each have one other member in their own
    // cluster: a = 0.2. Their nearest-cluster mean is b = (0.2 + 0.4) / 2 = 0.3.
    // s = (0.3 - 0.2) / 0.3 = 1/3.
    //
    // Cross-checked against scikit-learn 1.9.0's silhouette_samples for the
    // same points/labels: [0.6, 0.33333333333333337, 0.3333333333333322,
    // 0.5999999999999992] (matches to floating-point tolerance).
    it("Two clusters with two points each has metric 0.6", function () {
        const points = Object.freeze([[0.2], [0.4], [0.6], [0.8]]);
        const labels = Object.freeze([0, 0, 1, 1]);
        const actual = ss.silhouette(points, labels);
        const expected = Object.freeze([0.6, 1 / 3, 1 / 3, 0.6]);
        assert.ok(actual.every((val, i) => ss.approxEqual(val, expected[i])));
        const metric = ss.silhouetteMetric(points, labels);
        assert.ok(ss.approxEqual(metric, 0.6));
    });

    // A singleton cluster (here, cluster 0 has only point 0) has no other
    // member to average over for a(i), so by definition its silhouette
    // value is 0 — this must not divide by zero.
    //
    // Point 1 (cluster 1, with point 2): a = distance to point 2 = 1.
    // Nearest other cluster is {point 0}: b = 10. s = (10 - 1) / 10 = 0.9.
    // Point 2 (cluster 1, with point 1): a = distance to point 1 = 1.
    // Nearest other cluster is {point 0}: b = 11. s = (11 - 1) / 11 = 10/11.
    //
    // Cross-checked against scikit-learn 1.9.0's silhouette_samples for the
    // same points/labels: [0.0, 0.9, 0.9090909090909091].
    it("A singleton cluster has silhouette value 0, not NaN", function () {
        const points = Object.freeze([[0], [10], [11]]);
        const labels = Object.freeze([0, 1, 1]);
        const actual = ss.silhouette(points, labels);
        const expected = Object.freeze([0, 0.9, 10 / 11]);
        assert.ok(actual.every((val, i) => ss.approxEqual(val, expected[i])));
        assert.ok(actual.every((val) => !Number.isNaN(val)));
    });
});
