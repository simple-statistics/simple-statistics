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
});
