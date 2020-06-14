/* @flow */

import standardDeviation from "./standard_deviation";

/**
 * The [standard error](https://en.wikipedia.org/wiki/Standard_error)
 * of a statistic (here the mean) is the standard deviation of its sampling
 * distribution or sometimes an estimate of that standard deviation.
 *
 * @param {Array<number>} x input
 * @throws {Error} if x has is an empty array
 * @returns {number} standard error
 * @example
 * standardError([2, 4, 4, 4, 5, 5, 7, 9]); // => 2 / Math.sqrt(8)
 */
function standardError(x /*: Array<number> */) /*:number*/ {
    if (x.length === 0) {
        throw new Error("standardError is not defined for empty arrays");
    }

    return standardDeviation(x) / Math.sqrt(x.length);
}

export default standardError;
