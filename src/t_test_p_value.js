import studentsTTwoSidedP from "./students_t_two_sided_p.js";
import tTest from "./t_test.js";

/**
 * The two-sided [p-value](http://en.wikipedia.org/wiki/P-value) of a
 * [one-sample t-test](https://en.wikipedia.org/wiki/Student%27s_t-test#One-sample_t-test).
 *
 * `tTest` returns the t statistic, which then has to be looked up in a table.
 * This does that lookup exactly, giving the probability of observing a sample
 * mean at least this far from `expectedValue` if the population mean really is
 * `expectedValue`.
 *
 * The test has `x.length - 1` degrees of freedom, so at least two values are
 * needed and `null` is returned otherwise.
 *
 * @param {Array<number>} x sample of two or more numbers
 * @param {number} expectedValue expected value of the population mean
 * @returns {number|null} the two-sided p-value, or null when the sample is too
 * small for the test to have any degrees of freedom
 *
 * @example
 * tTestPValue([1, 2, 3, 4, 5, 6], 3.385).toFixed(4); // => '0.8755'
 */
function tTestPValue(x, expectedValue) {
    const degreesOfFreedom = x.length - 1;
    if (degreesOfFreedom < 1) {
        return null;
    }

    return studentsTTwoSidedP(tTest(x, expectedValue), degreesOfFreedom);
}

export default tTestPValue;
