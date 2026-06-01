/**
 * Validate values and weights for weighted statistics and return the total
 * weight.
 *
 * @param {Array<number>} x input values
 * @param {Array<number>} weights weights for each input value
 * @param {string} name function name for error messages
 * @returns {number} total weight
 * @private
 */
function validateWeightedInput(x, weights, name) {
    if (x.length === 0) {
        throw new Error(`${name} requires at least one data point`);
    }

    if (x.length !== weights.length) {
        throw new Error(
            `${name} requires values and weights to be the same length`
        );
    }

    let totalWeight = 0;

    for (let i = 0; i < weights.length; i++) {
        if (weights[i] < 0) {
            throw new Error(`${name} requires weights to be non-negative`);
        }

        totalWeight += weights[i];
    }

    if (totalWeight === 0) {
        throw new Error(`${name} requires at least one positive weight`);
    }

    return totalWeight;
}

export default validateWeightedInput;
