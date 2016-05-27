'use strict';
/* @flow */

/**
 * This is the internal implementation of quantiles: when you know
 * that the order is sorted, you don't need to re-sort it, and the computations
 * are faster.
 *
 * @param {Array<number>} sample input data
 * @param {number} p desired quantile: a number between 0 to 1, inclusive
 * @returns {number} quantile value
 * @example
 * quantileSorted([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
 */
function quantileSorted(sample /*: Array<number> */, p /*: number */)/*:number*/ {
    var idx = sample.length * p;
    if (p < 0 || p > 1) {
        return NaN;
    } else if (p === 1) {
        // If p is 1, directly return the last element
        return sample[sample.length - 1];
    } else if (p === 0) {
        // If p is 0, directly return the first element
        return sample[0];
    } else if (idx % 1 !== 0) {
        // If p is not integer, return the next element in array
        return sample[Math.ceil(idx) - 1];
    } else if (sample.length % 2 === 0) {
        // If the list has even-length, we'll take the average of this number
        // and the next value, if there is one
        return (sample[idx - 1] + sample[idx]) / 2;
    } else {
        // Finally, in the simple case of an integer value
        // with an odd-length list, return the sample value at the index.
        return sample[idx];
    }
}

module.exports = quantileSorted;
