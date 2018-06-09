"use strict";
exports.__esModule = true;
var sample_variance_1 = require("./sample_variance");
/**
 * The [sample standard deviation](http://en.wikipedia.org/wiki/Standard_deviation#Sample_standard_deviation)
 * is the square root of the sample variance.
 *
 * @param {Array<number>} x input array
 * @returns {number} sample standard deviation
 * @example
 * sampleStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]).toFixed(2);
 * // => '2.14'
 */
function sampleStandardDeviation(x) {
    // The standard deviation of no numbers is null
    var sampleVarianceX = sample_variance_1["default"](x);
    return Math.sqrt(sampleVarianceX);
}
exports["default"] = sampleStandardDeviation;
