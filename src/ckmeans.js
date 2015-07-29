'use strict';

var uniq = require('uniq');

/**
 * The **[jenks natural breaks optimization](http://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization)**
 * is an algorithm commonly used in cartography and visualization to decide
 * upon groupings of data values that minimize variance within themselves
 * and maximize variation between themselves.
 *
 * For instance, cartographers often use jenks in order to choose which
 * values are assigned to which colors in a [choropleth](https://en.wikipedia.org/wiki/Choropleth_map)
 * map.
 *
 * @param {Array<number>} data input data, as an array of number values
 * @param {number} nClasses number of desired classes
 * @returns {Array<number>} array of class break positions
 * @examples
 * // split data into 3 break points
 * jenks([1, 2, 4, 5, 7, 9, 10, 20], 3) // = [1, 7, 20, 20]
 */
function cKmeans(data, nClasses) {

    if (nClasses > data.length) { return null; }

    // .slice() to avoid changing the input data in-place
    var sorted = data.slice().sort(function(a, b) {
      return a - b;
    });

    // we'll use this as the maximum number of clusters
    var uniqueCount = uniq(sorted.slice()).length;

    // named 'D' originally
    var matrix = [];

    // named 'B' originally
    var backtrackMatrix = [];

    // Initialize dynamic programming matrices
    for (var n = 0; n < sorted.length; n++) {
      matrix[n] = [];
      backtrackMatrix[n] = [];
      for (var k = 0; k < uniqueCount; k++) {
        // in the original implementation, this initialization to
        // 1 is deferred
        // to `fill_dp_matrix`, but JavaScript arrays don't have the
        // same initialization style: `(new Array(2))[0] == undefined`,
        // not 0. so we do it in one step.
        if (k === 0) {
          matrix[n][k] = 1;
          backtrackMatrix[n][k] = 1;
        } else {
          matrix[n][k] = 0;
          backtrackMatrix[n][k] = 0;
        }
      }
    }

    var meanX1 = 0;
    var meanXJ = 0;
    var sumSquaredDistances = 0;

    // Fill the matrices
    for (var k = 0; k < matrix.length; k++) {
      for (var i = 0; i < matrix[0].length; i++) {
        if (k === 0) {
          backtrackMatrix[k][i] = 1;
        }
      }
    }

    return matrix;
}

module.exports = cKmeans;
