'use strict';

var sortedUniqueCount = require('./sorted_unique_count'),
    numericSort = require('./numeric_sort'),
    makeMatrix = require('./make_matrix'),
    makeRange = require('./make_range');

/**
 * The real work of Ckmeans clustering happens in the matrix generation:
 * the generated matrices encode all possible clustering combinations, and
 * once they're generated we can solve for the best clustering groups
 * very quickly.
 * @param {Array} sorted
 * @param {Array<Array<number>>} backtrackMatrix
 * @returns {Object} clustering result
 */
function backtrack(sorted, backtrackMatrix) {
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
    for (var k = backtrackMatrix.length - 1; k >= 0; k--) {
        var sum = 0;
        result.withinss[k] = 0;

        clusterLeft = backtrackMatrix[k][clusterRight];

        for (var i = clusterLeft; i <= clusterRight; i++) {
            result.cluster[i] = k;
            sum += sorted[i];
        }

        result.centers[k] = sum / (clusterRight - clusterLeft + 1);

        for (var j = clusterLeft; j <= clusterRight; j++) {
            result.withinss[k] += Math.pow(sorted[j] - result.centers[k], 2);
        }

        result.size[k] = clusterRight - clusterLeft + 1;

        if (k > 0) {
            clusterRight = clusterLeft - 1;
        }
    }

    return result;
}

/**
 *
 * @param {Array<number>} data input data, as an array of number values
 * @param {number} nClusters number of desired classes
 * @returns {Array<number>} array of class break positions
 * @examples
 * // split data into 3 break points
 * jenks([1, 2, 4, 5, 7, 9, 10, 20], 3) // = [1, 7, 20, 20]
 */
function cKmeans(data, nClusters) {

    if (nClusters > data.length) {
        throw new Error('Cannot generate more classes than there are data values');
    }

    var sorted = numericSort(data),
        // we'll use this as the maximum number of clusters
        uniqueCount = sortedUniqueCount(sorted);

    // if all of the input values are identical, there's one cluster
    // with all of the input in it.
    if (uniqueCount === 1) {
        return {
            nClusters: 1,
            clusters: makeRange(sorted.length),
            centers: [sorted[0]],
            withinss: [0],
            size: [sorted.length]
        };
    }

    // named 'D' originally
    var matrix = makeMatrix(nClusters, sorted.length),
        // named 'B' originally
        backtrackMatrix = makeMatrix(nClusters, sorted.length);

    // This is a dynamic programming way to solve the problem of minimizing
    // within-cluster sum of squares. It's similar to linear regression
    // in this way, and this calculation incrementally computes the
    // sum of squares that are later read.

    // The outer loop iterates through clusters, from 0 to nClusters.
    for (var cluster = 0; cluster < nClusters; cluster++) {

        // At the start of each loop, the mean starts as the first element
        var firstClusterMean = sorted[0];

        for (var sortedIdx = Math.max(cluster, 1); sortedIdx < sorted.length; sortedIdx++) {

            if (cluster === 0) {

                // Increase the running sum of squares calculation by this
                // new value
                var squaredDifference = Math.pow(sorted[sortedIdx] - firstClusterMean, 2);
                matrix[cluster][sortedIdx] = matrix[cluster][sortedIdx - 1] +
                    ((sortedIdx - 1) / sortedIdx) * squaredDifference;

                // We're computing a running mean by taking the previous
                // mean value, multiplying it by the number of elements
                // seen so far, and then dividing it by the number of
                // elements total.
                var newSum = sortedIdx * firstClusterMean + sorted[sortedIdx];
                firstClusterMean = newSum / sortedIdx;

            } else {

                var sumSquaredDistances = 0,
                    meanXJ = 0;

                for (var j = sortedIdx; j >= cluster; j--) {

                    sumSquaredDistances += (sortedIdx - j) /
                        (sortedIdx - j + 1) *
                        Math.pow(sorted[j] - meanXJ, 2);

                    meanXJ = (sorted[j] + ((sortedIdx - j) * meanXJ)) /
                        (sortedIdx - j + 1);

                    if (j === sortedIdx) {
                        matrix[cluster][sortedIdx] = sumSquaredDistances;
                        backtrackMatrix[cluster][sortedIdx] = j;
                        if (j > 0) {
                            matrix[cluster][sortedIdx] += matrix[cluster - 1][j - 1];
                        }
                    } else {
                        if (j === 0) {
                            if (sumSquaredDistances <= matrix[cluster][sortedIdx]) {
                                matrix[cluster][sortedIdx] = sumSquaredDistances;
                                backtrackMatrix[cluster][sortedIdx] = j;
                            }
                        } else if (sumSquaredDistances + matrix[cluster - 1][j - 1] < matrix[cluster][sortedIdx]) {
                            matrix[cluster][sortedIdx] = sumSquaredDistances + matrix[cluster - 1][j - 1];
                            backtrackMatrix[cluster][sortedIdx] = j;
                        }
                    }
                }
            }
        }
    }

    return backtrack(sorted, backtrackMatrix);
}

module.exports = cKmeans;
