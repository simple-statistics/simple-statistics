"use strict";
exports.__esModule = true;
var interquartile_range_1 = require("./interquartile_range");
var sample_standard_deviation_1 = require("./sample_standard_deviation");
var SQRT_2PI = Math.sqrt(2 * Math.PI);
/**
 * [Well-known kernels](https://en.wikipedia.org/wiki/Kernel_(statistics)#Kernel_functions_in_common_use)
 * @private
 */
var kernels = {
    /**
     * The gaussian kernel.
     * @private
     */
    gaussian: function (u) {
        return Math.exp(-0.5 * u * u) / SQRT_2PI;
    }
};
/**
 * Well known bandwidth selection methods
 * @private
 */
var bandwidthMethods = {
    /**
     * The ["normal reference distribution"
     * rule-of-thumb](https://stat.ethz.ch/R-manual/R-devel/library/MASS/html/bandwidth.nrd.html),
     * a commonly used version of [Silverman's
     * rule-of-thumb](https://en.wikipedia.org/wiki/Kernel_density_estimation#A_rule-of-thumb_bandwidth_estimator).
     * @private
     */
    nrd: function (x) {
        var s = sample_standard_deviation_1["default"](x);
        var iqr = interquartile_range_1["default"](x);
        if (typeof iqr === 'number') {
            s = Math.min(s, iqr / 1.34);
        }
        return 1.06 * s * Math.pow(x.length, -0.2);
    }
};
/**
 * [Kernel density estimation](https://en.wikipedia.org/wiki/Kernel_density_estimation)
 * is a useful tool for, among other things, estimating the shape of the
 * underlying probability distribution from a sample.
 *
 * @name kernelDensityEstimation
 * @param X sample values
 * @param kernel The kernel function to use. If a function is provided, it should return non-negative values and integrate to 1. Defaults to 'gaussian'.
 * @param bandwidthMethod The "bandwidth selection" method to use, or a fixed bandwidth value. Defaults to "nrd", the commonly-used ["normal reference distribution" rule-of-thumb](https://stat.ethz.ch/R-manual/R-devel/library/MASS/html/bandwidth.nrd.html).
 * @returns {Function} An estimated [probability density function](https://en.wikipedia.org/wiki/Probability_density_function) for the given sample. The returned function runs in `O(X.length)`.
 */
function kernelDensityEstimation(X, kernel, bandwidthMethod) {
    var kernelFn;
    if (kernel === undefined) {
        kernelFn = kernels.gaussian;
    }
    else if (typeof kernel === 'string') {
        if (!kernels[kernel]) {
            throw new Error('Unknown kernel "' + kernel + '"');
        }
        kernelFn = kernels[kernel];
    }
    else {
        kernelFn = kernel;
    }
    var bandwidth;
    if (typeof bandwidthMethod === 'undefined') {
        bandwidth = bandwidthMethods.nrd(X);
    }
    else if (typeof bandwidthMethod === 'string') {
        if (!bandwidthMethods[bandwidthMethod]) {
            throw new Error('Unknown bandwidth method "' + bandwidthMethod + '"');
        }
        bandwidth = bandwidthMethods[bandwidthMethod](X);
    }
    else {
        bandwidth = bandwidthMethod;
    }
    return function (x) {
        var i = 0;
        var sum = 0;
        for (i = 0; i < X.length; i++) {
            sum += kernelFn((x - X[i]) / bandwidth);
        }
        return sum / bandwidth / X.length;
    };
}
exports["default"] = kernelDensityEstimation;
