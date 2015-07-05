'use strict';

/**
 * ## Fitting The Regression Line
 *
 * This is called after `.data()` and returns the
 * equation `y = f(x)` which gives the position
 * of the regression line at each point in `x`.
 *
 * @param {Object} mb object with `m` and `b` members, representing
 * slope and intersect of desired line
 * @returns {Function} method that computes y-value at any given
 * x-value on the line.
 */
function linearRegressionLine(mb) {
    // Get the slope, `m`, and y-intercept, `b`, of the line.
    var m = mb.m,
        b = mb.b;

    // Return a function that computes a `y` value for each
    // x value it is given, based on the values of `b` and `a`
    // that we just computed.
    return function(x) {
        return b + (m * x);
    };
}

module.exports = linearRegressionLine;
