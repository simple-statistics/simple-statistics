'use strict';

/**
 * # harmonic mean
 *
 * a mean function typically used to find the average of rates
 *
 * this is the reciprocal of the arithmetic mean of the reciprocals
 * of the input numbers
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x input
 * @returns {number} harmonic mean
 */
function harmonic_mean(x) {
    // The mean of no numbers is null
    if (x.length === 0) return null;

    var reciprocal_sum = 0;

    for (var i = 0; i < x.length; i++) {
        // the harmonic mean is only valid for positive numbers
        if (x[i] <= 0) return null;

        reciprocal_sum += 1 / x[i];
    }

    // divide n by the the reciprocal sum
    return x.length / reciprocal_sum;
}

module.exports = harmonic_mean;
