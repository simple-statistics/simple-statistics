import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ss from "../index.js";

// Data from Poisson goodness-of-fit example 10-19 in William W. Hines & Douglas C. Montgomery,
// "Probability and Statistics in Engineering and Management Science", Wiley (1980).
const data1019 = Object.freeze([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 3, 3, 3, 3
]);

describe("chiSquaredGoodnessOfFit", function () {
    it("can reject the null hypothesis with level of confidence specified at 0.05", function () {
        assert.equal(
            false,
            ss.chiSquaredGoodnessOfFit(data1019, ss.poissonDistribution, 0.05)
        );
    });
    it("can accept the null hypothesis with level of confidence specified at 0.10", function () {
        assert.equal(
            true,
            ss.chiSquaredGoodnessOfFit(data1019, ss.poissonDistribution, 0.1)
        );
    });
    it("can tolerate gaps in distribution", function () {
        assert.equal(
            true,
            ss.chiSquaredGoodnessOfFit(
                [0, 2, 3, 7, 7, 7, 7, 7, 7, 9, 10],
                ss.poissonDistribution,
                0.1
            )
        );
    });

    // Samples written as [value, count] pairs to keep them readable.
    function sample(pairs) {
        const data = [];
        for (const [value, count] of pairs) {
            for (let i = 0; i < count; i++) {
                data.push(value);
            }
        }
        return data;
    }

    // An observation past the last cell of the hypothesized distribution had no
    // expected frequency to be compared against, so the statistic came out NaN
    // and `criticalValue < NaN` reported the data as a fit.
    it("counts observations that fall outside the hypothesized distribution", function () {
        const observations = sample([
            [0, 25],
            [1, 10],
            [2, 10],
            [3, 10],
            [4, 5]
        ]);
        // p = 1.45e-4 without the outlier and 2.98e-6 with it, so a sample that
        // is already a poor fit cannot become a good one by gaining an outlier.
        assert.equal(
            ss.chiSquaredGoodnessOfFit(
                observations,
                ss.poissonDistribution,
                0.05
            ),
            true
        );
        assert.equal(
            ss.chiSquaredGoodnessOfFit(
                observations.concat([30]),
                ss.poissonDistribution,
                0.05
            ),
            true
        );
    });

    // Collapsing a class dropped the last class rather than the one that had
    // just been merged, which discarded observations and double counted others
    // as soon as one class was large enough to keep.
    it("keeps every observation when collapsing classes", function () {
        // 60 observations, chi-squared 9.2635 on 6 degrees of freedom, p = 0.159.
        const observations = sample([
            [2, 3],
            [3, 14],
            [4, 14],
            [5, 12],
            [6, 10],
            [7, 4],
            [8, 2],
            [9, 1]
        ]);
        assert.equal(
            ss.chiSquaredGoodnessOfFit(
                observations,
                ss.poissonDistribution,
                0.1
            ),
            false
        );
    });

    it("throws when the data leaves no degrees of freedom", function () {
        assert.throws(function () {
            ss.chiSquaredGoodnessOfFit(
                [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                ss.poissonDistribution,
                0.05
            );
        }, /degrees of freedom/);
    });

    it("throws for degrees of freedom the table does not cover", function () {
        const observations = [];
        for (let value = 0; value <= 120; value++) {
            for (let i = 0; i < 40; i++) {
                observations.push(value);
            }
        }
        assert.throws(function () {
            ss.chiSquaredGoodnessOfFit(
                observations,
                ss.poissonDistribution,
                0.05
            );
        }, /no critical values tabulated/);
    });

    // The table has columns for eleven significance levels. Any other one read
    // as undefined, and `undefined < chiSquared` reported the data as a fit.
    it("throws for a significance level the table does not cover", function () {
        assert.throws(function () {
            ss.chiSquaredGoodnessOfFit(data1019, ss.poissonDistribution, 0.075);
        }, /significance/);
    });

    it("throws when the distribution cannot be built for the mean", function () {
        // binomialDistribution takes two parameters and returns undefined here.
        assert.throws(function () {
            ss.chiSquaredGoodnessOfFit(data1019, ss.binomialDistribution, 0.05);
        }, /distributionType/);
        assert.throws(function () {
            ss.chiSquaredGoodnessOfFit(data1019, () => [0, 0, 0, 0], 0.05);
        }, /test statistic/);
    });

    // Critical values fall as the significance level rises, so a sample that is
    // rejected at one level has to stay rejected at every larger one. The levels
    // between the table's columns have to be refused rather than answered.
    it("gives a verdict that is monotone in the significance level", function () {
        const significances = [
            0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.2, 0.5, 0.9, 0.95, 0.975,
            0.99, 0.995
        ];
        const samples = [
            data1019,
            [0, 2, 3, 7, 7, 7, 7, 7, 7, 9, 10],
            sample([
                [2, 3],
                [3, 14],
                [4, 14],
                [5, 12],
                [6, 10],
                [7, 4],
                [8, 2],
                [9, 1]
            ])
        ];
        for (const observations of samples) {
            let rejected = false;
            for (const significance of significances) {
                let verdict;
                try {
                    verdict = ss.chiSquaredGoodnessOfFit(
                        observations,
                        ss.poissonDistribution,
                        significance
                    );
                } catch {
                    // Not one of the table's significance levels.
                    continue;
                }
                assert.equal(
                    verdict || !rejected,
                    true,
                    `rejected below ${significance} but not at it`
                );
                rejected = rejected || verdict;
            }
        }
    });
});
