import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

// Force shuffling to return the first points in the array to ensure
// reproducibility of tests. This works because of the way the Fisher-Yates
// shuffle selects array elements via multiplication and flooring.
function nonRNG() {
    return 1.0 - ss.epsilon;
}

describe("k-means clustering test", function () {
    it("Single cluster of one point contains only that point", function () {
        const points = Object.freeze([[0.5]]);
        const { labels, centroids } = ss.kMeansCluster(points, 1, nonRNG);
        assert.deepEqual(labels, [0]);
        assert.deepEqual(centroids, [[0.5]]);
    });

    it("Clustering with default Math.random", function () {
        const points = Object.freeze([[0.5]]);
        const { labels, centroids } = ss.kMeansCluster(points, 1);
        assert.deepEqual(labels.length, 1);
        assert.deepEqual(centroids.length, 1);
    });

    it("Single cluster of two points contains both points", function () {
        const points = Object.freeze([[0.0], [1.0]]);
        const { labels, centroids } = ss.kMeansCluster(points, 1, nonRNG);
        assert.deepEqual(labels, [0, 0]);
        assert.deepEqual(centroids, [[0.5]]);
    });

    it("Two clusters of two points puts each point in its own cluster", function () {
        const points = Object.freeze([[0.0], [1.0]]);
        const { labels, centroids } = ss.kMeansCluster(points, 2, nonRNG);
        assert.deepEqual(labels, [0, 1]);
        assert.deepEqual(centroids, [[0.0], [1.0]]);
    });

    it("Two clusters of four paired points puts each pair in a cluster", function () {
        const points = Object.freeze([[0.0], [1.0], [0.0], [1.0]]);
        const { labels, centroids } = ss.kMeansCluster(points, 2, nonRNG);
        assert.deepEqual(labels, [0, 1, 0, 1]);
        assert.deepEqual(centroids, [[0.0], [1.0]]);
    });

    it("Two clusters of two 2D points puts each point in its own cluster", function () {
        const points = Object.freeze([
            [0.0, 0.5],
            [1.0, 0.5]
        ]);
        const { labels, centroids } = ss.kMeansCluster(points, 2, nonRNG);
        assert.deepEqual(labels, [0, 1]);
        assert.deepEqual(centroids, [
            [0.0, 0.5],
            [1.0, 0.5]
        ]);
    });

    it("Base case of one value", function () {
        assert.throws(() => {
            ss.kMeansCluster([1], 2, nonRNG);
        });
    });

    it("Two clusters of three 2D points puts two points in one cluster and one in the other", function () {
        const points = Object.freeze([
            [0.0, 0.5],
            [1.0, 0.5],
            [0.1, 0.0]
        ]);
        const { labels, centroids } = ss.kMeansCluster(points, 2, nonRNG);
        assert.deepEqual(labels, [0, 1, 0]);
        assert.deepEqual(centroids, [
            [0.05, 0.25],
            [1.0, 0.5]
        ]);
    });
});
