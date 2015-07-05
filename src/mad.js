'use strict';

var median = require('./median');

/**
 * # [Median Absolute Deviation](http://en.wikipedia.org/wiki/Median_absolute_deviation)
 *
 * The Median Absolute Deviation (MAD) is a robust measure of statistical
 * dispersion. It is more resilient to outliers than the standard deviation.
 */
function mad(x) {
    // The mad of nothing is null
    if (!x || x.length === 0) return null;

    var median_value = median(x),
        median_absolute_deviations = [];

    // Make a list of absolute deviations from the median
    for (var i = 0; i < x.length; i++) {
        median_absolute_deviations.push(Math.abs(x[i] - median_value));
    }

    // Find the median value of that list
    return median(median_absolute_deviations);
}

module.exports = mad;
