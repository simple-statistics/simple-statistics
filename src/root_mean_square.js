'use strict';

/**
 * Root Mean Square (RMS)
 *
 * A mean function used as a measure of the magnitude of a set
 * of numbers, regardless of their sign.
 *
 * This is the square root of the mean of the squares of the
 * input numbers.
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x input
 * @returns {number} root mean square
 */
function rootMeanSquare(x) {
    if (x.length === 0) return null;

    var sum_of_squares = 0;
    for (var i = 0; i < x.length; i++) {
        sum_of_squares += Math.pow(x[i], 2);
    }

    return Math.sqrt(sum_of_squares / x.length);
}

module.exports = rootMeanSquare;
