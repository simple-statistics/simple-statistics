/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("quantile", function (t) {
    // Data and results from
    // [Wikipedia](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population),
    // Updated to use numpy linear interpolation method (type=7)
    t.test("can get proper quantiles of an even-length list", function (t) {
        const even = Object.freeze([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
        t.equal(ss.quantile(even, 0.25), 7.25);
        t.equal(ss.quantile(even, 0.5), 9);
        t.equal(ss.quantile(even, 0.75), 14.5);
        t.end();
    });

    t.test("can get proper quantiles of an odd-length list", function (t) {
        const odd = Object.freeze([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]);
        t.equal(ss.quantile(odd, 0.25), 7.5);
        t.equal(ss.quantile(odd, 0.5), 9);
        t.equal(ss.quantile(odd, 0.75), 14);
        t.end();
    });

    t.test("the median quantile is equal to the median", function (t) {
        const rand = Object.freeze([1, 4, 5, 8]);
        t.equal(ss.quantile(rand, 0.5), ss.median(rand));
        const rand2 = Object.freeze([10, 50, 2, 4, 4, 5, 8]);
        t.equal(ss.quantile(rand2, 0.5), ss.median(rand2));
        t.end();
    });

    t.throws(function () {
        ss.quantile([], 0.5);
    }, "a zero-length list throws an error");

    t.test("test odd-value case", function (t) {
        t.equal(ss.quantile([0, 1, 2, 3, 4], 0.2), 0.8);
        t.end();
    });

    t.test("bad bounds throw an error", function (t) {
        t.throws(function () {
            ss.quantile([1, 2, 3], 1.1);
        });
        t.throws(function () {
            ss.quantile([1, 2, 3], -0.5);
        });
        t.end();
    });

    t.test("max quantile is equal to the max", function (t) {
        t.equal(ss.quantile([1, 2, 3], 1), ss.max([1, 2, 3]));
        t.end();
    });

    t.test("min quantile is equal to the min", function (t) {
        t.equal(ss.quantile([1, 2, 3], 0), ss.min([1, 2, 3]));
        t.end();
    });

    t.test(
        "if quantile arg is an array, response is an array of quantiles",
        function (t) {
            const odd = Object.freeze([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]);
            t.same(
                ss.quantile(odd, [0, 0.25, 0.5, 0.75, 1]),
                [3, 7.5, 9, 14, 20]
            );
            t.same(ss.quantile(odd, [0.75, 0.5]), [14, 9]);
            t.end();
        }
    );

    t.test(
        "can get an array of quantiles on a small number of elements",
        function (t) {
            const input = Object.freeze([500, 468, 454, 469]);
            t.same(
                ss.quantile(input, [0.25, 0.5, 0.75]),
                [464.5, 468.5, 476.75]
            );
            t.same(
                ss.quantile(input, [0.05, 0.25, 0.5, 0.75, 0.95]),
                [456.1, 464.5, 468.5, 476.75, 495.34999999999997]
            );
            t.end();
        }
    );

    t.test(
        "array of quantiles is independent of which quantiles are requested (#704)",
        function (t) {
            // Each quantile must equal the result of computing it on its own,
            // regardless of the other quantiles requested alongside it.
            const data = Object.freeze([
                4534264.499853279, 0, 0, 4441655.968117084, 7982031.499157332,
                11183760.330270268, 8374531.7466523405, 7537166.851276029,
                6408451.109897822, 4858231.646338846, 6409803.519554875,
                4296216.572964368, 5367514.3078208575, 6364913.420875475,
                8621150.51996475, 9236261.500350267, 7850954.174512796,
                6026897.449805159, 3569031.9331034794, 5336662.162307054,
                6953168.388225255, 6789669.207787706, 6225885.17604323,
                5217135.654872652, 6199349.484675659, 5858452.126622974
            ]);
            const ps = [0.0, 0.05, 0.95, 1.0];
            t.same(
                ss.quantile(data, ps),
                ps.map((p) => ss.quantile(data, p))
            );
            t.end();
        }
    );

    t.test(
        "array of quantiles matches a full sort for tricky inputs",
        function (t) {
            // Regression for multiQuantileSelect: a narrow quickselect could
            // disturb an already-finalized order statistic. Compare against a
            // brute-force fully-sorted computation across duplicate-heavy data.
            const quantileSorted = (sorted, p) => {
                const idx = (sorted.length - 1) * p;
                if (p === 1) return sorted[sorted.length - 1];
                if (p === 0) return sorted[0];
                const lower = Math.floor(idx);
                const upper = Math.ceil(idx);
                return (
                    sorted[lower] +
                    (idx - lower) * (sorted[upper] - sorted[lower])
                );
            };
            const cases = [
                {
                    x: [
                        31, 16, 67, 56, 16, 12, 79, 13, 3, 37, 41, 68, 3, 52,
                        88, 55, 44, 7
                    ],
                    ps: [0.75, 0, 0.1, 0.95, 0.2]
                },
                {
                    x: [
                        9784654, 9784654, 1295491, 3093978, 5430034, 0, 9057878,
                        4402670, 9734910, 4110841, 8156564, 2673582, 3841950
                    ],
                    ps: [0, 0.33, 0.5, 0.95, 1]
                }
            ];
            for (const { x, ps } of cases) {
                const sorted = x.slice().sort((a, b) => a - b);
                t.same(
                    ss.quantile(x, ps),
                    ps.map((p) => quantileSorted(sorted, p))
                );
            }
            t.end();
        }
    );

    t.end();
});
