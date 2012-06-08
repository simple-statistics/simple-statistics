// # Linear Regression
// [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
// is a simple way to find a fitted line
// between a set of coordinates.
function linearregression() {
    var linreg = {},
        data = [];

    linreg.data = function(x) {
        if (!arguments.length) return data;
        data = x.slice();
        data.sort(function(a, b) { return a[0] - b[0]; });
        return linreg;
    };

    linreg.path = function() {
        var sum_x = 0, sum_y = 0,
            sum_xx = 0, sum_xy = 0,
            m, b;

        for (var i = 0; i < data.length; i++) {
            sum_x += data[i][0];
            sum_y += data[i][0];

            sum_xx += Math.pow(data[i][0], 2);
            sum_xy += data[i][0] * data[i][1];
        }

        m = (data.length * sum_xy - sum_x * sum_y) /
            (data.length * sum_xx - sum_x * sum_x);
        b = (sum_y / data.length) - (m * sum_x) / data.length;

        return [
            [data[0][0], data[0][0] * m + b],
            [data[data.length - 1][0], data[data.length - 1][0] * m + b]
        ];
    };

    return linreg;
}

// This implementation was influenced by
// 
// * [Least squares in Javascript](http://dracoblue.net/dev/linear-least-squares-in-javascript/159/)
// * [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
