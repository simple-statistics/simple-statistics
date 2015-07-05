'use strict';

var mean = require('./mean');

// # [variance](http://en.wikipedia.org/wiki/Variance)
//
// is the sum of squared deviations from the mean
//
// depends on `mean()`
function variance(x) {
    // The variance of no numbers is null
    if (x.length === 0) return null;

    var mean_value = mean(x),
        deviations = [];

    // Make a list of squared deviations from the mean.
    for (var i = 0; i < x.length; i++) {
        deviations.push(Math.pow(x[i] - mean_value, 2));
    }

    // Find the mean value of that list
    return mean(deviations);
}

module.exports = variance;
