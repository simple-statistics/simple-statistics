/* @flow */

import standardDeviation from './standard_deviation';

/**
 * The [standard error](https://en.wikipedia.org/wiki/Standard_error)
 * of a statistic (here the mean) is the standard deviation of its sampling
 * distribution or sometimes an estimate of that standard deviation.
 *
 * @param {Array<number>} x input
 * @returns {number} standard error
 * @example
 * standardError([2, 4, 4, 4, 5, 5, 7, 9]); // => 2 / Math.sqrt(8)
 */
function standardError(x /*: Array<number> */)/*:number*/ {
    if (x.length === 1) {
        return 0;
    }

    var std = standardDeviation(x);

    return std / Math.sqrt(x.length);
}

export default standardError;
