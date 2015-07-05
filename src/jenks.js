'use strict';

var jenksBreaks = require('./jenks_breaks');
var jenksMatrices = require('./jenks_matrices');

/**
 * ## [Jenks natural breaks optimization](http://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization)
 *
 * @param {Array<number>} data input data, as an array of number values
 * @param {number} n_classes number of desired classes
 * @returns {Array<number>} array of class break positions
 */
function jenks(data, n_classes) {

    if (n_classes > data.length) return null;

    // sort data in numerical order, since this is expected
    // by the matrices function
    data = data.slice().sort(function (a, b) { return a - b; });

    // get our basic matrices
    var matrices = jenksMatrices(data, n_classes),
        // we only need lower class limits here
        lower_class_limits = matrices.lower_class_limits;

    // extract n_classes out of the computed matrices
    return jenksBreaks(data, lower_class_limits, n_classes);
}

module.exports = jenks;
