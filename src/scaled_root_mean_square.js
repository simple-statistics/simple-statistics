/**
 * The [root mean square](https://en.wikipedia.org/wiki/Root_mean_square)
 * computed by scaling, which is an equivalent way of computing
 * `rootMeanSquare` suitable for values whose squares leave floating point
 * range.
 *
 * `rootMeanSquare` sums the squares directly, so it returns `Infinity` once
 * a value exceeds about 1e154 and `0` once every value falls below about
 * 1e-162. This function divides through by the largest magnitude first, so
 * the squares it sums are all at most one.
 *
 * It runs in `O(n)`, linear time, with respect to the length of the array,
 * in two passes rather than one.
 *
 * @param {Array<number>} x a sample of one or more data points
 * @returns {number} root mean square
 * @throws {Error} if x is empty
 * @example
 * scaledRootMeanSquare([-1, 1, -1, 1]); // => 1
 * scaledRootMeanSquare([1e200, 2e200, 3e200]); // => 2.1602468994692866e+200
 */
function scaledRootMeanSquare(x) {
    if (x.length === 0) {
        throw new Error(
            "scaledRootMeanSquare requires at least one data point"
        );
    }

    let max = 0;
    for (let i = 0; i < x.length; i++) {
        const magnitude = Math.abs(x[i]);
        if (magnitude > max) {
            max = magnitude;
        }
    }

    // Every value is zero, and the division below would be 0 / 0.
    if (max === 0) {
        return 0;
    }

    // An infinite or missing largest value cannot be scaled away, and
    // dividing by it would turn the result into NaN. Report it as
    // `rootMeanSquare` does.
    if (!Number.isFinite(max)) {
        return max;
    }

    let sumOfSquares = 0;
    for (let i = 0; i < x.length; i++) {
        const scaled = x[i] / max;
        sumOfSquares += scaled * scaled;
    }

    return max * Math.sqrt(sumOfSquares / x.length);
}

export default scaledRootMeanSquare;
