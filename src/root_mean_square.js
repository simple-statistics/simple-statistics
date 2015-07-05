'use strict';

/**
 * root mean square (RMS)
 *
 * a mean function used as a measure of the magnitude of a set
 * of numbers, regardless of their sign
 *
 * this is the square root of the mean of the squares of the
 * input numbers
 *
 * This runs on `O(n)`, linear time in respect to the array
 */
function root_mean_square(x) {
    if (x.length === 0) return null;

    var sum_of_squares = 0;
    for (var i = 0; i < x.length; i++) {
        sum_of_squares += Math.pow(x[i], 2);
    }

    return Math.sqrt(sum_of_squares / x.length);
}

module.exports = root_mean_square;
