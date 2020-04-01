/* eslint no-shadow: 0 */

const test = require("tap").test;
const ss = require("../");

// Data from Poisson goodness-of-fit example 10-19 in William W. Hines & Douglas C. Montgomery,
// "Probability and Statistics in Engineering and Management Science", Wiley (1980).
const data1019 = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3
];

test("chiSquaredGoodnessOfFit", function (t) {
    t.test(
        "can reject the null hypothesis with level of confidence specified at 0.05",
        function (t) {
            t.equal(
                false,
                ss.chiSquaredGoodnessOfFit(
                    data1019,
                    ss.poissonDistribution,
                    0.05
                )
            );
            t.end();
        }
    );
    t.test(
        "can accept the null hypothesis with level of confidence specified at 0.10",
        function (t) {
            t.equal(
                true,
                ss.chiSquaredGoodnessOfFit(
                    data1019,
                    ss.poissonDistribution,
                    0.1
                )
            );
            t.end();
        }
    );
    t.test("can tolerate gaps in distribution", function (t) {
        t.equal(
            true,
            ss.chiSquaredGoodnessOfFit(
                [0, 2, 3, 7, 7, 7, 7, 7, 7, 9, 10],
                ss.poissonDistribution,
                0.1
            )
        );
        t.end();
    });
    t.end();
});
