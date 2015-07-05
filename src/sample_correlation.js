'use strict';

var sample_covariance = require('./sample_covariance');
var sample_standard_deviation = require('./sample_standard_deviation');

/**
 * The [correlation](http://en.wikipedia.org/wiki/Correlation_and_dependence) is
 * a measure of how correlated two datasets are, between -1 and 1
 *
 * @param {Array<number>} x first input
 * @param {Array<number>} y second input
 * @returns {number} sample correlation
 */
function sample_correlation(x, y) {
    var cov = sample_covariance(x, y),
        xstd = sample_standard_deviation(x),
        ystd = sample_standard_deviation(y);

    if (cov === null || xstd === null || ystd === null) {
        return null;
    }

    return cov / xstd / ystd;
}

module.exports = sample_correlation;
