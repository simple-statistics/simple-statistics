'use strict';
/* @flow */

var sum = require('./sum');

/**
 * The mean, _also known as average_,
 * is the sum of all values over the number of values.
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x input values
 * @returns {number} mean
 * @example
 * mean([0, 10]); // => 5
 */
function mean(x /*: Array<number> */)/*:number*/ {
    // The mean of no numbers is null
    if (x.length === 0) { return NaN; }

    return sum(x) / x.length;
}

module.exports = mean;
