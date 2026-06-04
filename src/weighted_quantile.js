import validateWeightedInput from "./validate_weighted_input.js";

/**
 * The weighted quantile is the value whose cumulative weight reaches the
 * requested probability.
 *
 * This implementation sorts value/weight pairs by value, then returns the
 * first value where cumulative weight is greater than or equal to `p` times the
 * total weight. When p is an array, the result is also an array containing the
 * appropriate weighted quantiles in input order.
 *
 * @param {Array<number>} x sample of one or more data points
 * @param {Array<number>} weights non-negative weights for each data point
 * @param {Array<number> | number} p the desired quantile, as a number between 0 and 1
 * @throws {Error} if x is empty, weights is a different length than x, all weights are zero, a weight is negative, or p is outside of the range from 0 to 1
 * @returns {number} weighted quantile
 * @example
 * weightedQuantile([1, 2, 3], [1, 1, 2], 0.5); // => 3
 */
function weightedQuantile(x, weights, p) {
    const totalWeight = validateWeightedInput(x, weights, "weightedQuantile");
    const sorted = [];

    for (let i = 0; i < x.length; i++) {
        sorted.push([x[i], weights[i]]);
    }

    sorted.sort(compareValue);

    if (Array.isArray(p)) {
        const results = [];

        for (let i = 0; i < p.length; i++) {
            results[i] = weightedQuantileSorted(sorted, totalWeight, p[i]);
        }

        return results;
    }

    return weightedQuantileSorted(sorted, totalWeight, p);
}

function weightedQuantileSorted(sorted, totalWeight, p) {
    if (p < 0 || p > 1) {
        throw new Error("quantiles must be between 0 and 1");
    }

    if (p === 0) {
        return sorted[0][0];
    }

    const threshold = p * totalWeight;
    let cumulativeWeight = 0;

    for (let i = 0; i < sorted.length; i++) {
        cumulativeWeight += sorted[i][1];

        if (cumulativeWeight >= threshold) {
            return sorted[i][0];
        }
    }

    return sorted[sorted.length - 1][0];
}

function compareValue(a, b) {
    return a[0] - b[0];
}

export default weightedQuantile;
