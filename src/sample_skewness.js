'use strict';
/* @flow */

var sumNthPowerDeviations = require('./sum_nth_power_deviations');
var sampleStandardDeviation = require('./sample_standard_deviation');

/**
 * [Skewness](http://en.wikipedia.org/wiki/Skewness) is
 * a measure of the extent to which a probability distribution of a
 * real-valued random variable "leans" to one side of the mean.
 * The skewness value can be positive or negative, or even undefined.
 *
 * Implementation is based on the adjusted Fisher-Pearson standardized
 * moment coefficient, which is the version found in Excel and several
 * statistical packages including Minitab, SAS and SPSS.
 *
 * @param {Array<number>} x a sample of 3 or more data points
 * @returns {number} sample skewness
 * @throws {Error} if x has length of 3 or less
 * @example
 * sampleSkewness([2, 4, 6, 3, 1]); // => 0.590128656384365
 */
function sampleSkewness(x /*: Array<number> */)/*:number*/ {
    // The skewness of less than three arguments is null
    var theSampleStandardDeviation = sampleStandardDeviation(x);

    if (x.length < 3) {
        throw new Error('sampleSkewness requires at least three data points');
    }

    var n = x.length,
        cubedS = Math.pow(theSampleStandardDeviation, 3),
        sumCubedDeviations = sumNthPowerDeviations(x, 3);

    return n * sumCubedDeviations / ((n - 1) * (n - 2) * cubedS);
}

module.exports = sampleSkewness;
