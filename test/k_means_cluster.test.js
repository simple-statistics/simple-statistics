/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

// Force shuffling to return the first points in the array to ensure
// reproducibility of tests. This works because of the way the Fisher-Yates
// shuffle selects array elements via multiplication and flooring.
function nonRNG() {
    return 1.0 - ss.epsilon;
}

test("k-means clustering test", function (t) {
    t.test(
        "Single cluster of one point contains only that point",
        function (t) {
            const points = [[0.5]];
            const { labels, centroids } = ss.kMeansCluster(points, 1, nonRNG);
            t.same(labels, [0]);
            t.same(centroids, [[0.5]]);
            t.end();
        },
    );

    t.test("Clustering with default Math.random", function (t) {
        const points = [[0.5]];
        const { labels, centroids } = ss.kMeansCluster(points, 1);
        t.same(labels.length, 1);
        t.same(centroids.length, 1);
        t.end();
    });

    t.test("Single cluster of two points contains both points", function (t) {
        const points = [[0.0], [1.0]];
        const { labels, centroids } = ss.kMeansCluster(points, 1, nonRNG);
        t.same(labels, [0, 0]);
        t.same(centroids, [[0.5]]);
        t.end();
    });

    t.test(
        "Two clusters of two points puts each point in its own cluster",
        function (t) {
            const points = [[0.0], [1.0]];
            const { labels, centroids } = ss.kMeansCluster(points, 2, nonRNG);
            t.same(labels, [0, 1]);
            t.same(centroids, [[0.0], [1.0]]);
            t.end();
        },
    );

    t.test(
        "Two clusters of four paired points puts each pair in a cluster",
        function (t) {
            const points = [[0.0], [1.0], [0.0], [1.0]];
            const { labels, centroids } = ss.kMeansCluster(points, 2, nonRNG);
            t.same(labels, [0, 1, 0, 1]);
            t.same(centroids, [[0.0], [1.0]]);
            t.end();
        },
    );

    t.test(
        "Two clusters of two 2D points puts each point in its own cluster",
        function (t) {
            const points = [
                [0.0, 0.5],
                [1.0, 0.5],
            ];
            const { labels, centroids } = ss.kMeansCluster(points, 2, nonRNG);
            t.same(labels, [0, 1]);
            t.same(centroids, [
                [0.0, 0.5],
                [1.0, 0.5],
            ]);
            t.end();
        },
    );

    t.test("Base case of one value", function (t) {
        t.throws(() => {
            ss.kMeansCluster([1], 2, nonRNG);
        });
        t.end();
    });

    t.test(
        "Two clusters of three 2D points puts two points in one cluster and one in the other",
        function (t) {
            const points = [
                [0.0, 0.5],
                [1.0, 0.5],
                [0.1, 0.0],
            ];
            const { labels, centroids } = ss.kMeansCluster(points, 2, nonRNG);
            t.same(labels, [0, 1, 0]);
            t.same(centroids, [
                [0.05, 0.25],
                [1.0, 0.5],
            ]);
            t.end();
        },
    );

    t.end();
});
