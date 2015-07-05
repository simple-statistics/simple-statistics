'use strict';

var mean = require('./mean');

/**
 * The sum of deviations to the Nth power.
 * When n=2 it's the sum of squared deviations.
 * When n=3 it's the sum of cubed deviations.
 */
function sum_nth_power_deviations(x, n) {
    var mean_value = mean(x),
        sum = 0;

    for (var i = 0; i < x.length; i++) {
        sum += Math.pow(x[i] - mean_value, n);
    }

    return sum;
}

module.exports = sum_nth_power_deviations;
