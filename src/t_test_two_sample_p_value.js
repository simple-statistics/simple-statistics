import studentsTTwoSidedP from "./students_t_two_sided_p.js";
import tTestTwoSample from "./t_test_two_sample.js";

/**
 * The two-sided [p-value](http://en.wikipedia.org/wiki/P-value) of a
 * [two-sample t-test](http://en.wikipedia.org/wiki/Student's_t-test).
 *
 * `tTestTwoSample` returns the t statistic, which then has to be looked up in a
 * table. This does that lookup exactly, giving the probability of observing a
 * difference in sample means at least this large when the two populations
 * really differ by `difference`.
 *
 * The pooled test has `sampleX.length + sampleY.length - 2` degrees of freedom,
 * so `null` is returned when that is not positive, and whenever
 * `tTestTwoSample` itself cannot produce a statistic.
 *
 * @param {Array<number>} sampleX a sample as an array of numbers
 * @param {Array<number>} sampleY a sample as an array of numbers
 * @param {number} [difference=0] the difference in means under the null hypothesis
 * @returns {number|null} the two-sided p-value, or null when it is not defined
 *
 * @example
 * tTestTwoSamplePValue([1, 2, 3, 4], [3, 4, 5, 6], 0).toFixed(4); // => '0.0710'
 */
function tTestTwoSamplePValue(sampleX, sampleY, difference) {
    const degreesOfFreedom = sampleX.length + sampleY.length - 2;
    if (degreesOfFreedom < 1) {
        return null;
    }

    const t = tTestTwoSample(sampleX, sampleY, difference);
    // `tTestTwoSample` yields null for an empty sample, and undefined when the
    // sample statistics it needs are themselves undefined.
    if (typeof t !== "number") {
        return null;
    }

    return studentsTTwoSidedP(t, degreesOfFreedom);
}

export default tTestTwoSamplePValue;
