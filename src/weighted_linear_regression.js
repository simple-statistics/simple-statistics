import validateWeightedInput from "./validate_weighted_input.js";

/**
 * [Weighted least squares](https://en.wikipedia.org/wiki/Weighted_least_squares)
 * fits a line through a set of coordinates in which some observations count
 * for more than others, which is what R's `lm()` does when given a `weights`
 * argument. `linearRegression` is the special case where every weight is
 * equal.
 *
 * A weight of zero drops its observation from the fit. Weights are relative,
 * so scaling all of them by the same factor leaves the line unchanged.
 *
 * @param {Array<Array<number>>} data an array of two-element arrays,
 * like `[[0, 1], [2, 3]]`
 * @param {Array<number>} weights weight for each coordinate
 * @returns {Object} object containing slope and intersect of regression line
 * @throws {Error} if data is empty, weights is a different length than data,
 * all weights are zero, or a weight is negative
 * @example
 * weightedLinearRegression([[0, 0], [1, 1], [2, 2]], [1, 1, 1]); // => { m: 1, b: 0 }
 */
function weightedLinearRegression(data, weights) {
    const totalWeight = validateWeightedInput(
        data,
        weights,
        "weightedLinearRegression"
    );

    // With one point the slope is unconstrained, so match `linearRegression`
    // and take the horizontal line through it.
    if (data.length === 1) {
        return { m: 0, b: data[0][1] };
    }

    // The weighted means of x and y. Centering on them before accumulating
    // the cross products keeps the sums small when the coordinates are not.
    let sumWeightedX = 0;
    let sumWeightedY = 0;
    for (let i = 0; i < data.length; i++) {
        sumWeightedX += weights[i] * data[i][0];
        sumWeightedY += weights[i] * data[i][1];
    }
    const meanX = sumWeightedX / totalWeight;
    const meanY = sumWeightedY / totalWeight;

    let sumXY = 0;
    let sumXX = 0;
    for (let i = 0; i < data.length; i++) {
        const deviationX = data[i][0] - meanX;
        sumXY += weights[i] * deviationX * (data[i][1] - meanY);
        sumXX += weights[i] * deviationX * deviationX;
    }

    const m = sumXY / sumXX;

    return { m: m, b: meanY - m * meanX };
}

export default weightedLinearRegression;
