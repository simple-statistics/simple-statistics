'use strict';

var quantile = require('./quantile');

/**
 * # [Interquartile range](http://en.wikipedia.org/wiki/Interquartile_range)
 *
 * A measure of statistical dispersion, or how scattered, spread, or
 * concentrated a distribution is. It's computed as the difference between
 * the third quartile and first quartile.
 */
function interquartile_range(sample) {
    // We can't derive quantiles from an empty list
    if (sample.length === 0) return null;

    // Interquartile range is the span between the upper quartile,
    // at `0.75`, and lower quartile, `0.25`
    return quantile(sample, 0.75) - quantile(sample, 0.25);
}

module.exports = interquartile_range;
