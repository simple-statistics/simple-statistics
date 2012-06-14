// # Linear Regression
// [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
// is a simple way to find a fitted line
// between a set of coordinates.
function linear_regression() {
    var linreg = {},
        data = [];

    // Assign the data to the model.
    linreg.data = function(x) {
        if (!arguments.length) return data;
        data = x.slice();
        return linreg;
    };

    // ## Fitting The Regression Line
    //
    // This is called after `.data()` and returns the
    // equation `y = f(x)` which gives the position
    // of the regression line at each point in `x`.
    linreg.line = function() {

        //if there's only one point, arbitrarily choose a slope of 0
        //and a y-intercept of whatever the y of the initial point is
        if (data.length == 1) {
            m = 0;
            b = data[0][1];
        } else {
            // Initialize our sums and scope the `m` and `b`
            // variables that define the line.
            var sum_x = 0, sum_y = 0,
                sum_xx = 0, sum_xy = 0,
                m, b;

            // Gather the sum of all x values, the sum of all
            // y values, and the sum of x^2 and (x*y) for each
            // value.
            //
            // In math notation, these would be SS_x, SS_y, SS_xx, and SS_xy
            for (var i = 0; i < data.length; i++) {
                sum_x += data[i][0];
                sum_y += data[i][1];

                sum_xx += data[i][0] * data[i][0];
                sum_xy += data[i][0] * data[i][1];
            }

            // `m` is the slope of the regression line
            m = ((data.length * sum_xy) - (sum_x * sum_y)) /
                ((data.length * sum_xx) - (sum_x * sum_x));

            // `b` is the y-intercept of the line.
            b = (sum_y / data.length) - ((m * sum_x) / data.length);
        }

        // Return a function that computes a `y` value for each
        // x value it is given, based on the values of `b` and `a`
        // that we just computed.
        return function(x) {
            return b + (m * x);
        };
    };

    return linreg;
}

// This implementation was influenced by
//
// * [Least squares in Javascript](http://dracoblue.net/dev/linear-least-squares-in-javascript/159/)
// * [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
