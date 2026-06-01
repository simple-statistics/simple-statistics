import validateWeightedInput from "./validate_weighted_input.js";
import weightedMean from "./weighted_mean.js";

/**
 * The [weighted variance](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean#Weighted_sample_variance)
 * is the average weighted squared deviation from the weighted mean.
 *
 * This is a population weighted variance: see the `variance` method for the
 * unweighted population variance.
 *
 * @param {Array<number>} x population of one or more data points
 * @param {Array<number>} weights non-negative weights for each data point
 * @throws {Error} if x is empty, weights is a different length than x, all weights are zero, or a weight is negative
 * @returns {number} weighted variance
 * @example
 * weightedVariance([2, 4, 4, 4, 5, 5, 7, 9], [1, 1, 1, 1, 1, 1, 1, 1]); // => 4
 */
function weightedVariance(x, weights) {
    const totalWeight = validateWeightedInput(x, weights, "weightedVariance");
    const mean = weightedMean(x, weights);
    let weightedSumSquaredDeviations = 0;

    for (let i = 0; i < x.length; i++) {
        const deviation = x[i] - mean;
        weightedSumSquaredDeviations += weights[i] * deviation * deviation;
    }

    return weightedSumSquaredDeviations / totalWeight;
}

export default weightedVariance;
