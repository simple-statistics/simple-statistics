function r_squared() {

    var r = {},
        data,
        f;

    // Assign the data to the model.
    r.data = function(x) {
        if (!arguments.length) return data;
        data = x.slice();
        return r;
    };

    // Assign the estimator function, that is used
    // to calculate the error in `r_squared` below.
    r.f = function(x) {
        if (!arguments.length) return f;
        f = x;
        return r;
    };

    r.r_squared = function() {
        if (data.length < 2) return 1;

        // Compute the average y value for the actual
        // data set in order to compute the
        // _total sum of squares_
        var sum = 0, average;
        for (var i = 0; i < data.length; i++) {
            sum += data[i][1];
        }
        average = sum / data.length;

        // Compute the total sum of squares - the
        // squared difference between each point
        // and the average of all points.
        var sum_of_squares = 0;
        for (var j = 0; j < data.length; j++) {
            sum_of_squares += Math.pow(average - data[j][1], 2);
        }

        // Finally estimate the error: the squared
        // difference between the estimate and the actual data
        // value at each point.
        var err = 0;
        for (var k = 0; k < data.length; k++) {
            err += Math.pow(data[k][1] - f(data[k][0]), 2);
        }

        // As the error grows larger, it's ratio to the
        // sum of squares increases and the r squared
        // value grows lower.
        return 1 - (err / sum_of_squares);

    };

    return r;
}

if (module && module.exports) module.exports = r_squared;
