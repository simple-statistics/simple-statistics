/**
 * This is the internal implementation of quantiles: when you know
 * that the order is sorted, you don't need to re-sort it, and the computations
 * are faster.
 *
 * This implements the linear interpolation method (type=7 in R/numpy),
 * which is the default in numpy.percentile and R's quantile.
 *
 * @param {Array<number>} x sample of one or more data points
 * @param {number} p desired quantile: a number between 0 to 1, inclusive
 * @returns {number} quantile value
 * @throws {Error} if p ix outside of the range from 0 to 1
 * @throws {Error} if x is empty
 * @example
 * quantileSorted([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
 */
function quantileSorted(x, p) {
    // Use (n-1) * p for index, matching numpy's linear method (type=7)
    const idx = (x.length - 1) * p;
    if (x.length === 0) {
        throw new Error("quantile requires at least one data point.");
    } else if (p < 0 || p > 1) {
        throw new Error("quantiles must be between 0 and 1");
    } else if (p === 1) {
        // If p is 1, directly return the last element
        return x[x.length - 1];
    } else if (p === 0) {
        // If p is 0, directly return the first element
        return x[0];
    } else if (idx % 1 !== 0) {
        // If idx is not integer, interpolate linearly between floor and ceil
        const lower = Math.floor(idx);
        const upper = Math.ceil(idx);
        const fraction = idx - lower;
        return x[lower] + fraction * (x[upper] - x[lower]);
    } else {
        // If idx is integer, type=7 returns the value at that index
        return x[idx];
    }
}

export default quantileSorted;
