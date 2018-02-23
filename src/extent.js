/* @flow */

/**
 * This computes the minimum & maximum number in an array.
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x sample of one or more data points
 * @returns {Array<number>} minimum & maximum value
 * @throws {Error} if the the length of x is less than one
 * @example
 * extent([1, 2, 3, 4]);
 * // => [1, 4]
 */
function extent(x /*: Array<number> */) /*:Array<number>*/ {

    if (x.length === 0) {
        throw new Error('extent requires at least one data point');
    }

    var min = x[0];
    var max = x[0];
    for (var i = 1; i < x.length; i++) {
        if (x[i] > max) {
            max = x[i];
        }
        if (x[i] < min) {
            min = x[i];
        }
    }
    return [min, max];
}

export default extent;
