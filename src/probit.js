'use strict';

var epsilon = require('./epsilon');
var inverse_error_function = require('./inverse_error_function');

/**
 * # [Probit](http://en.wikipedia.org/wiki/Probit)
 *
 * This is the inverse of cumulative_std_normal_probability(),
 * and is also known as the normal quantile function.
 *
 * It returns the number of standard deviations from the mean
 * where the p'th quantile of values can be found in a normal distribution.
 * So, for example, probit(0.5 + 0.6827/2) ≈ 1 because 68.27% of values are
 * normally found within 1 standard deviation above or below the mean.
 */
function probit(p) {
    if (p === 0) {
        p = epsilon;
    } else if (p >= 1) {
        p = 1 - epsilon;
    }
    return Math.sqrt(2) * inverse_error_function(2 * p - 1);
}

module.exports = probit;
