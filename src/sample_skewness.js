'use strict';

var sum_nth_power_deviations = require('./sum_nth_power_deviations');
var sample_standard_deviation = require('./sample_standard_deviation');

// # [Skewness](http://en.wikipedia.org/wiki/Skewness)
//
// A measure of the extent to which a probability distribution of a
// real-valued random variable "leans" to one side of the mean.
// The skewness value can be positive or negative, or even undefined.
//
// Implementation is based on the adjusted Fisher-Pearson standardized
// moment coefficient, which is the version found in Excel and several
// statistical packages including Minitab, SAS and SPSS.
//
// Depends on `sum_nth_power_deviations()` and `sample_standard_deviation`
function sample_skewness(x) {
    // The skewness of less than three arguments is null
    if (x.length < 3) return null;

    var n = x.length,
        cubed_s = Math.pow(sample_standard_deviation(x), 3),
        sum_cubed_deviations = sum_nth_power_deviations(x, 3);

    return n * sum_cubed_deviations / ((n - 1) * (n - 2) * cubed_s);
}

module.exports = sample_skewness;
