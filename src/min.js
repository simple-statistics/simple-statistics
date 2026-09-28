/**
 * The min is the lowest number in the array.
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * If any value is `NaN`, the result is `NaN`, wherever that value appears.
 *
 * @param {Array<number>} x sample of one or more data points
 * @throws {Error} if the length of x is less than one
 * @returns {number} minimum value
 * @example
 * min([1, 5, -10, 100, 2]); // => -10
 */
function min(x) {
    if (x.length === 0) {
        throw new Error("min requires at least one data point");
    }

    let value = x[0];
    for (let i = 1; i < x.length; i++) {
        // Every comparison with NaN is false, so without this check a NaN
        // would be skipped unless it happened to be the first value.
        if (Number.isNaN(x[i])) {
            return Number.NaN;
        }
        if (x[i] < value) {
            value = x[i];
        }
    }
    return value;
}

export default min;
