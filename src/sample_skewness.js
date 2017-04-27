'use strict';
/* @flow */

var mean = require('./mean');

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
 * @since 4.1.0
 * @param {Array<number>} x a sample of 3 or more data points
 * @returns {number} sample skewness
 * @throws {Error} if x has length less than 3
 * @example
 * sampleSkewness([2, 4, 6, 3, 1]); // => 0.590128656384365
 */
function sampleSkewness(x /*: Array<number> */)/*:number*/ {

    if (x.length < 3) {
        throw new Error('sampleSkewness requires at least three data points');
    }

    var meanValue = mean(x);
    var tempValue;
    var sumSquaredDeviations = 0;
    var sumCubedDeviations = 0;

    for (var i = 0; i < x.length; i++) {
        tempValue = x[i] - meanValue;
        sumSquaredDeviations += tempValue * tempValue;
        sumCubedDeviations += tempValue * tempValue * tempValue;
    }

    // this is Bessels' Correction: an adjustment made to sample statistics
    // that allows for the reduced degree of freedom entailed in calculating
    // values from samples rather than complete populations.
    var besselsCorrection = x.length - 1;

    // Find the mean value of that list
    var theSampleStandardDeviation = Math.sqrt(sumSquaredDeviations / besselsCorrection);

    var n = x.length,
        cubedS = Math.pow(theSampleStandardDeviation, 3);

    return n * sumCubedDeviations / ((n - 1) * (n - 2) * cubedS);
}

module.exports = sampleSkewness;
