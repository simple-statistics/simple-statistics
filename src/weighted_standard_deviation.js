import weightedVariance from "./weighted_variance.js";

/**
 * The [weighted standard deviation](https://en.wikipedia.org/wiki/Standard_deviation)
 * is the square root of the weighted variance.
 *
 * This is a population weighted standard deviation.
 *
 * @param {Array<number>} x population of one or more data points
 * @param {Array<number>} weights non-negative weights for each data point
 * @throws {Error} if x is empty, weights is a different length than x, all weights are zero, or a weight is negative
 * @returns {number} weighted standard deviation
 * @example
 * weightedStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9], [1, 1, 1, 1, 1, 1, 1, 1]); // => 2
 */
function weightedStandardDeviation(x, weights) {
    return Math.sqrt(weightedVariance(x, weights));
}

export default weightedStandardDeviation;
