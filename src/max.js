/**
 * This computes the maximum number in an array.
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x sample of one or more data points
 * @returns {number} maximum value
 * @throws {Error} if the the length of x is less than one
 * @example
 * max([1, 2, 3, 4]);
 * // => 4
 */
function max(x) {
    if (x.length === 0) {
        throw new Error("max requires at least one data point");
    }

    return Math.max.apply(null, x);
}

export default max;
