'use strict';

var sum_nth_power_deviations = require('./sum_nth_power_deviations');

/*
 * # [variance](http://en.wikipedia.org/wiki/Variance)
 *
 * is the sum of squared deviations from the mean
 *
 * depends on `sum_nth_power_deviations`
 *
 * @param {Array<number>} x input array
 * @return {number} sample variance
 */
function sample_variance(x) {
    // The variance of no numbers is null
    if (x.length <= 1) return null;

    var sum_squared_deviations_value = sum_nth_power_deviations(x, 2);

    // Find the mean value of that list
    return sum_squared_deviations_value / (x.length - 1);
}

module.exports = sample_variance;
