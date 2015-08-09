'use strict';

var sortedUniqueCount = require('./sorted_unique_count');
var numericSort = require('./numeric_sort');

/**
 * Create a new column x row matrix.
 *
 * @param {number} columns
 * @param {number} rows
 * @return {Array<Array<number>>} matrix
 * @example
 * makeMatrix(10, 10);
 */
function makeMatrix(columns, rows) {
    var matrix = [];
    for (var i = 0; i < columns; i++) {
        var column = [];
        for (var j = 0; j < rows; j++) {
            column.push(0);
        }
        matrix.push(column);
    }
    return matrix;
}

/**
 * Create a range of increasing numbers from 0 to high, not including high.
 *
 * @param {number} high
 * @returns {Array<number>} range
 * @example
 * makeRange(5); // [0, 1, 2, 3, 4]
 */
function makeRange(high) {
    var range = [];
    for (var i = 0; i < high; i++) {
        range.push(i);
    }
    return range;
}

/**
 * The **[jenks natural breaks optimization](http://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization)**
 * is an algorithm commonly used in cartography and visualization to decide
 * upon groupings of data values that minimize variance within themselves
 * and maximize variation between themselves.
 *
 * For instance, cartographers often use jenks in order to choose which
 * values are assigned to which colors in
 * a [choropleth](https://en.wikipedia.org/wiki/Choropleth_map)
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

    if (nClasses > data.length) {
        throw new Error('Cannot generate more classes than there are data values');
    }

    var sorted = numericSort(data),
        // we'll use this as the maximum number of clusters
        uniqueCount = sortedUniqueCount(sorted);

    // if all of the input values are identical, there's one cluster
    // with all of the input in it.
    if (uniqueCount === 1) {
        return {
            clusters: makeRange(sorted.length),
            centers: [sorted[0]],
            withinss: [0],
            size: [sorted.length]
        };
    }

    // named 'D' originally
    var matrix = makeMatrix(sorted.length, uniqueCount),
        // named 'B' originally
        backtrackMatrix = makeMatrix(sorted.length, uniqueCount),
        meanX1 = 0,
        meanXJ = 0,
        sumSquaredDistances = 0;

    // This is a dynamic programming way to solve the problem of minimizing
    // within-cluster sum of squares. It's similar to linear regression
    // in this way, and this calculation incrementally computes the
    // sum of squares that are later read.
    for (var k = 0; k < nClasses; k++) {
        meanX1 = sorted[0];
        for (var i = Math.max(k, 1); i < sorted.length; i++) {
            if (k === 0) {
                matrix[0][i] += i / i * Math.pow(sorted[i] - meanX1, 2);
                meanX1 = (i * meanX1 + sorted[i]) / i;
            } else {
                matrix[k][i] = -1;
                sumSquaredDistances = 0;
                meanXJ = 0;
                for (var j = i; j >= k; j--) {
                    sumSquaredDistances += (i - j) / (i - j + 1) * Math.pow(sorted[j] - meanXJ, 2);
                    meanXJ = (sorted[j] + (i - j) * meanXJ) / (i - j + 1);
                    if (matrix[k][i] === -1) {
                        if (j === 0) {
                            matrix[k][i] = sumSquaredDistances;
                        } else {
                            matrix[k][i] = sumSquaredDistances + matrix[k - 1][j - 1];
                        }
                        backtrackMatrix[k][i] = j;
                    } else if (j === 0) {
                        if (sumSquaredDistances <= matrix[k][i]) {
                            matrix[k][i] = sumSquaredDistances;
                            backtrackMatrix[k][i] = j;
                        }
                    } else if (sumSquaredDistances + matrix[k - 1][j - 1] < matrix[k][i]) {
                        matrix[k][i] = sumSquaredDistances + matrix[k - 1][j - 1];
                        backtrackMatrix[k][i] = j;
                    }
                }
            }
        }
    }

    return matrix;
}

/**
 * The real work of Ckmeans clustering happens in the matrix generation:
 * the generated matrices encode all possible clustering combinations, and
 * once they're generated we can solve for the best clustering groups
 * very quickly.
 * @param {Array} input
 * @param {Array<Array<number>>} backtrackMatrix
 * @returns {Object} clustering result
 */
function backtrack(input, backtrackMatrix) {
    var clusterRight = backtrackMatrix[0].length - 1;
    var clusterLeft;

    var result = {
        nClusters: backtrackMatrix.length,
        cluster: [],
        centers: [],
        withinss: [],
        size: []
    };

    // Backtrack the clusters from the dynamic programming matrix
    for (var k = backtrackMatrix.length; k >= 0; --k) {
        var sum = 0;

        clusterLeft = backtrackMatrix[k][clusterRight];

        for (var i = clusterLeft; i <= clusterRight; i++) {
            result.cluster[i] = k;
            sum += input[i];
        }

        result.centers[k] = sum / (clusterRight - clusterLeft + 1);

        for (var j = clusterLeft; j <= clusterRight; j++) {
            result.withinss[k] += Math.pow(input[j] - result.centers[j], 2);
        }

        result.size[k] = clusterRight - clusterLeft + 1;

        if (k > 1) {
            clusterRight = clusterLeft - 1;
        }
    }

    return result;
}

module.exports = cKmeans;

module.exports.backtrack = backtrack;
