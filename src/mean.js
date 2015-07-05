'use strict';

var sum = require('./sum');

/**
 * The mean, _also known as average_,
 * is the sum over the number of values.
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x input values
 * @returns {number} mean
 * @example
 * console.log(mean([0, 10])); // 5
 */
function mean(x) {
    // The mean of no numbers is null
    if (x.length === 0) return null;

    return sum(x) / x.length;
}

module.exports = mean;
