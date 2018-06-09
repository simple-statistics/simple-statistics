"use strict";
exports.__esModule = true;
var epsilon_1 = require("./epsilon");
var inverse_error_function_1 = require("./inverse_error_function");
/**
 * The [Probit](http://en.wikipedia.org/wiki/Probit)
 * is the inverse of cumulativeStdNormalProbability(),
 * and is also known as the normal quantile function.
 *
 * It returns the number of standard deviations from the mean
 * where the p'th quantile of values can be found in a normal distribution.
 * So, for example, probit(0.5 + 0.6827/2) ≈ 1 because 68.27% of values are
 * normally found within 1 standard deviation above or below the mean.
 *
 * @param {number} p
 * @returns {number} probit
 */
function probit(p) {
    if (p === 0) {
        p = epsilon_1["default"];
    }
    else if (p >= 1) {
        p = 1 - epsilon_1["default"];
    }
    return Math.sqrt(2) * inverse_error_function_1["default"](2 * p - 1);
}
exports["default"] = probit;
