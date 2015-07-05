'use strict';

/**
 * # [Linear Regression](http://en.wikipedia.org/wiki/Linear_regression)
 *
 * [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
 * is a simple way to find a fitted line
 * between a set of coordinates.
 */
function linear_regression() {
    var linreg = {},
        data = [];

    // Assign data to the model. Data is assumed to be an array.
    linreg.data = function(x) {
        if (!arguments.length) return data;
        data = x.slice();
        return linreg;
    };

    // Calculate the slope and y-intercept of the regression line
    // by calculating the least sum of squares
    linreg.mb = function() {
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
        return { m: m, b: b };
    };

    // a shortcut for simply getting the slope of the regression line
    linreg.m = function() {
        return linreg.mb().m;
    };

    // a shortcut for simply getting the y-intercept of the regression
    // line.
    linreg.b = function() {
        return linreg.mb().b;
    };

    // ## Fitting The Regression Line
    //
    // This is called after `.data()` and returns the
    // equation `y = f(x)` which gives the position
    // of the regression line at each point in `x`.
    linreg.line = function() {

        // Get the slope, `m`, and y-intercept, `b`, of the line.
        var mb = linreg.mb(),
            m = mb.m,
            b = mb.b;

        // Return a function that computes a `y` value for each
        // x value it is given, based on the values of `b` and `a`
        // that we just computed.
        return function(x) {
            return b + (m * x);
        };
    };

    return linreg;
}

module.exports = linear_regression;
