'use strict';
/* @flow */

var quantile = require('./quantile');

/**
 * The [Interquartile range](http://en.wikipedia.org/wiki/Interquartile_range) is
 * a measure of statistical dispersion, or how scattered, spread, or
 * concentrated a distribution is. It's computed as the difference between
 * the third quartile and first quartile.
 *
 * @param {Array<number>} sample
 * @returns {number} interquartile range: the span between lower and upper quartile,
 * 0.25 and 0.75
 * @example
 * interquartileRange([0, 1, 2, 3]); // => 2
 */
function interquartileRange(sample/*: Array<number> */) {
    // Interquartile range is the span between the upper quartile,
    // at `0.75`, and lower quartile, `0.25`
    var q1 = quantile(sample, 0.75),
        q2 = quantile(sample, 0.25);

    if (typeof q1 === 'number' && typeof q2 === 'number') {
        return q1 - q2;
    }
}

module.exports = interquartileRange;
