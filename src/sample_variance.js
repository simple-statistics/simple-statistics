'use strict';

var sumNthPowerDeviations = require('./sum_nth_power_deviations');

/*
 * The [variance](http://en.wikipedia.org/wiki/Variance)
 * is the sum of squared deviations from the mean.
 *
 * depends on `sumNthPowerDeviations`
 *
 * @param {Array<number>} x input array
 * @return {number} sample variance
 */
function sampleVariance(x) {
    // The variance of no numbers is null
    if (x.length <= 1) { return null; }

    var sumSquaredDeviationsValue = sumNthPowerDeviations(x, 2);

    // Find the mean value of that list
    return sumSquaredDeviationsValue / (x.length - 1);
}

module.exports = sampleVariance;
