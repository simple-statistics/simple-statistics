/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");
const { allApproxEqual } = require("./approx");

test("silhouette test", function (t) {
    t.test("Single cluster of one point has metric 0",
        function (t) {
            const points = [[0.5]];
            const labels = [0];
            const actual = ss.silhouette(points, labels);
            t.deepEqual(actual, [0.0]);
            t.end();
    });

    t.test("Single cluster of two points has metric 1.0",
        function (t) {
            const points = [[0.25], [0.75]];
            const labels = [0, 0];
            const actual = ss.silhouette(points, labels);
            t.deepEqual(actual, [1.0, 1.0]);
            t.end();
    });

    t.test("Two clusters with one point each has metric 0.0",
        function (t) {
            const points = [[0.25], [0.75]];
            const labels = [0, 1];
            const actual = ss.silhouette(points, labels);
            t.deepEqual(actual, [0.0, 0.0]);
            t.end();
    });

    // Outer points have a = 0.2, b = 0.5, s = 3/5.
    // Inner points have a = 0.2, b = 0.3, s = 1/3.
    t.test("Two clusters with two points each has metric 0.5",
        function (t) {
            const points = [[0.2], [0.4], [0.6], [0.8]];
            const labels = [0, 0, 1, 1];
            const actual = ss.silhouette(points, labels);
            const expected = [3/5, 1/3, 1/3, 3/5];
            t.true(allApproxEqual(actual, expected));
            t.end();
    });

    t.end();
});
