'use strict';

/**
 * # [R Squared](http://en.wikipedia.org/wiki/Coefficient_of_determination)
 *
 * The r-squared value of data compared with a function `f`
 * is the sum of the squared differences between the prediction
 * and the actual value.
 *
 * @param {Array<Array<number>>} data input data: this should be doubly-nested
 * @param {Function} f function called on `[i][0]` values within the dataset
 * @returns {number} r-squared value
 */
function rSquared(data, f) {
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

    // As the error grows larger, its ratio to the
    // sum of squares increases and the r squared
    // value grows lower.
    return 1 - (err / sum_of_squares);
}

module.exports = rSquared;
