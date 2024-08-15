/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../dist/simple-statistics.js");

function rnd(x) {
    return Math.round(x * 1000) / 1000;
}

test("sample correlation", function (t) {
    t.test("can get the sample correlation of identical arrays", function (t) {
        const data = [1, 2, 3, 4, 5, 6];
        t.equal(rnd(ss.sampleCorrelation(data, data)), 1);
        t.end();
    });

    t.test("can get the sample correlation of different arrays", function (t) {
        const a = [1, 2, 3, 4, 5, 6];
        const b = [2, 2, 3, 4, 5, 60];
        t.equal(rnd(ss.sampleCorrelation(a, b)), 0.691);
        t.end();
    });

    t.test("zero-length corner case", function (t) {
        t.throws(function () {
            ss.sampleCorrelation([], []);
        });
        t.end();
    });

    t.end();
});

test("sample rank correlation", function (t) {
    t.test(
        "absolute rank correlation for monotonic function equals one",
        function (t) {
            const x = [1, 2, 3, 4, 5, 6];
            let y;
            for (const sign of [-1, 1]) {
                y = x.map((a) => sign * a * a);
                if (rnd(ss.sampleRankCorrelation(x, y)) !== sign * 1) {
                    t.fail("absolute rank correlation not equal to one");
                }
            }
            t.end();
        },
    );

    t.test("rank correlation agrees with R calculation", function (t) {
        const x = [
            -0.008718749, -0.06111878, 0.067698537, -1.075537181, 0.041328545,
            0.56687373, 0.193619496, -2.057133298, -1.058808987, -0.173177955,
        ];
        const y = [
            -3.02455481, -1.30596109, 0.03873244, -1.27909938, -0.24630809,
            -0.18103793, -0.48281339, -2.78997293, -1.30551335, -1.63361636,
        ];
        const rankCorr = 0.6484848; // calculated using cor(x, y, method = "spearman") in R
        if (Math.abs(ss.sampleRankCorrelation(x, y) - rankCorr) > ss.epsilon) {
            console.log(ss.sampleRankCorrelation(x, y));
            t.fail("rank correlation is incorrect for sample data");
        }
        t.end();
    });
    t.end();
});
