'use strict';

var sample_variance = require('./sample_variance');

/**
 * # [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
 *
 * is just the square root of the variance.
 *
 * depends on `sample_variance()`
 *
 * @param {Array<number>} x input array
 * @returns {number} sample standard deviation
 */
function sample_standard_deviation(x) {
    // The standard deviation of no numbers is null
    if (x.length <= 1) return null;

    return Math.sqrt(sample_variance(x));
}

module.exports = sample_standard_deviation;
