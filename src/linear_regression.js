'use strict';

/**
 * [Linear Regression](http://en.wikipedia.org/wiki/Linear_regression)
 *
 * [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
 * is a simple way to find a fitted line
 * between a set of coordinates.
 *
 * Calculate the slope and y-intercept of the regression line
 * by calculating the least sum of squares
 *
 * @param {Array<Array<number>>} data an array of two-element of arrays,
 * like `[[0, 1], [2, 3]]`
 * @returns {Object} object containing slope and intersect of regression line
 */
function linearRegression(data) {

    var m, b;

    // Store data length in a local variable to reduce
    // repeated object property lookups
    var data_length = data.length;

    //if there's only one point, arbitrarily choose a slope of 0
    //and a y-intercept of whatever the y of the initial point is
    if (data_length === 1) {
        m = 0;
        b = data[0][1];
    } else {
        // Initialize our sums and scope the `m` and `b`
        // variables that define the line.
        var sum_x = 0, sum_y = 0,
            sum_xx = 0, sum_xy = 0;

        // Use local variables to grab point values
        // with minimal object property lookups
        var point, x, y;

        // Gather the sum of all x values, the sum of all
        // y values, and the sum of x^2 and (x*y) for each
        // value.
        //
        // In math notation, these would be SS_x, SS_y, SS_xx, and SS_xy
        for (var i = 0; i < data_length; i++) {
            point = data[i];
            x = point[0];
            y = point[1];

            sum_x += x;
            sum_y += y;

            sum_xx += x * x;
            sum_xy += x * y;
        }

        // `m` is the slope of the regression line
        m = ((data_length * sum_xy) - (sum_x * sum_y)) /
            ((data_length * sum_xx) - (sum_x * sum_x));

        // `b` is the y-intercept of the line.
        b = (sum_y / data_length) - ((m * sum_x) / data_length);
    }

    // Return both values as an object.
    return {
        m: m,
        b: b
    };
}


module.exports = linearRegression;
