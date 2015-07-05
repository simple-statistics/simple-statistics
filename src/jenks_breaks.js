'use strict';

/**
 * ## Pull Breaks Values for Jenks
 *
 * the second part of the jenks recipe: take the calculated matrices
 * and derive an array of n breaks.
 */
function jenksBreaks(data, lower_class_limits, n_classes) {

    var k = data.length,
        kclass = [],
        countNum = n_classes;

    // the calculation of classes will never include the upper
    // bound, so we need to explicitly set it
    kclass[n_classes] = data[data.length - 1];

    // the lower_class_limits matrix is used as indices into itself
    // here: the `k` variable is reused in each iteration.
    while (countNum > 0) {
        kclass[countNum - 1] = data[lower_class_limits[k][countNum] - 1];
        k = lower_class_limits[k][countNum] - 1;
        countNum--;
    }

    return kclass;
}

module.exports = jenksBreaks;
