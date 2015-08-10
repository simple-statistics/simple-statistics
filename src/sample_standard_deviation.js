'use strict';

var sampleVariance = require('./sample_variance');

/**
 * The [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
 * is the square root of the variance.
 *
 * @param {Array<number>} x input array
 * @returns {number} sample standard deviation
 * @example
 * ss.sampleStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]);
 * //= 2.138
 */
function sampleStandardDeviation(x) {
    // The standard deviation of no numbers is null
    if (x.length <= 1) { return null; }

    return Math.sqrt(sampleVariance(x));
}

module.exports = sampleStandardDeviation;
