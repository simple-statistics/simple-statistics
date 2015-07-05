'use strict';

var jenksBreaks = require('./jenks_breaks');
var jenksMatrices = require('./jenks_matrices');

/**
 * ## [Jenks natural breaks optimization](http://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization)
 *
 * @param {Array<number>} data input data, as an array of number values
 * @param {number} nClasses number of desired classes
 * @returns {Array<number>} array of class break positions
 */
function jenks(data, nClasses) {

    if (nClasses > data.length) { return null; }

    // sort data in numerical order, since this is expected
    // by the matrices function
    data = data.slice().sort(function (a, b) { return a - b; });

    // get our basic matrices
    var matrices = jenksMatrices(data, nClasses),
        // we only need lower class limits here
        lowerClassLimits = matrices.lowerClassLimits;

    // extract nClasses out of the computed matrices
    return jenksBreaks(data, lowerClassLimits, nClasses);
}

module.exports = jenks;
