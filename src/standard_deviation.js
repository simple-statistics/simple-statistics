'use strict';

var variance = require('./variance');

/**
 * # [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
 *
 * is just the square root of the variance.
 *
 * @param {Array<number>} x input
 * @returns {number} standard deviation
 */
function standard_deviation(x) {
    // The standard deviation of no numbers is null
    if (x.length === 0) return null;

    return Math.sqrt(variance(x));
}

module.exports = standard_deviation;
