"use strict";
exports.__esModule = true;
var sample_covariance_1 = require("./sample_covariance");
var sample_standard_deviation_1 = require("./sample_standard_deviation");
/**
 * The [correlation](http://en.wikipedia.org/wiki/Correlation_and_dependence) is
 * a measure of how correlated two datasets are, between -1 and 1
 *
 * @param {Array<number>} x first input
 * @param {Array<number>} y second input
 * @returns {number} sample correlation
 * @example
 * sampleCorrelation([1, 2, 3, 4, 5, 6], [2, 2, 3, 4, 5, 60]).toFixed(2);
 * // => '0.69'
 */
function sampleCorrelation(x, y) {
    var cov = sample_covariance_1["default"](x, y), xstd = sample_standard_deviation_1["default"](x), ystd = sample_standard_deviation_1["default"](y);
    return cov / xstd / ystd;
}
exports["default"] = sampleCorrelation;
