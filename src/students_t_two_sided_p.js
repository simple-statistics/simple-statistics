import incompleteBeta from "./incomplete_beta.js";

/**
 * The two-sided p-value of a t statistic under [Student's t-distribution](https://en.wikipedia.org/wiki/Student%27s_t-distribution),
 * that is, the probability of observing a statistic at least as far from zero
 * as this one when the null hypothesis holds.
 *
 * Computed from the regularized incomplete beta function rather than read off a
 * table, so it is exact for any degrees of freedom:
 * `p = I_{v/(v+t^2)}(v/2, 1/2)`.
 *
 * @private
 * @param {number} t a t statistic
 * @param {number} degreesOfFreedom degrees of freedom, greater than zero
 * @returns {number|null} the two-sided p-value, or null when the degrees of
 * freedom are not positive and no p-value is defined
 */
function studentsTTwoSidedP(t, degreesOfFreedom) {
    if (!(degreesOfFreedom > 0) || !Number.isFinite(t)) {
        return null;
    }

    return incompleteBeta(
        degreesOfFreedom / 2,
        0.5,
        degreesOfFreedom / (degreesOfFreedom + t * t)
    );
}

export default studentsTTwoSidedP;
