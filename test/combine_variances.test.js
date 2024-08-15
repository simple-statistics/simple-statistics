/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

test("combineVariances", function (t) {
    t.test("can combine the variances of two lists", function (t) {
        const values1 = [8, 3, 4];
        const values2 = [2, 6, 4];

        t.equal(
            +ss
                .combineVariances(
                    ss.variance(values1),
                    ss.mean(values1),
                    values1.length,
                    ss.variance(values2),
                    ss.mean(values2),
                    values2.length,
                )
                .toPrecision(3),
            3.92,
        );
        t.equal(
            ss.combineVariances(
                ss.variance(values1),
                ss.mean(values1),
                values1.length,
                ss.variance(values2),
                ss.mean(values2),
                values2.length,
            ),
            ss.variance(values1.concat(values2)),
        );
        t.end();
    });
    t.end();
});
