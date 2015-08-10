'use strict';

var sortedUniqueCount = require('./sorted_unique_count'),
    numericSort = require('./numeric_sort');

/**
 * Create a new column x row matrix.
 *
 * @private
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
 * Ckmeans clustering is an improvement on heuristic-based clustering
 * approaches like Jenks. The algorithm was developed in
 * [Haizhou Wang and Mingzhou Song](http://journal.r-project.org/archive/2011-2/RJournal_2011-2_Wang+Song.pdf)
 * as a [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) approach
 * to the problem of clustering numeric data into groups with the least
 * within-group sum-of-squared-deviations.
 *
 * Minimizing the difference within groups - what Wang & Song refer to as
 * `withinss`, or within sum-of-squares, means that groups are optimally
 * homogenous within and the data is split into representative groups.
 *
 * Being a dynamic approach, this algorithm is based on two matrices that
 * store incrementally-computed values for squared deviations and backtracking
 * indexes.
 *
 * Unlike the [original implementation](https://cran.r-project.org/web/packages/Ckmeans.1d.dp/index.html),
 * this implementation does not include any code to automatically determine
 * the optimal number of clusters: this information needs to be explicitly
 * provided.
 *
 * ### References
 * _Ckmeans.1d.dp: Optimal k-means Clustering in One Dimension by Dynamic
 * Programming_ Haizhou Wang and Mingzhou Song ISSN 2073-4859
 *
 * from The R Journal Vol. 3/2, December 2011
 * @param {Array<number>} data input data, as an array of number values
 * @param {number} nClusters number of desired classes. This cannot be
 * greater than the number of values in the data array.
 * @returns {Array<Array<number>>} clustered input
 * @examples
 * // split data into 3 break points
 * jenks([1, 2, 4, 5, 7, 9, 10, 20], 3) // = [1, 7, 20, 20]
 */
function ckmeans(data, nClusters) {

    if (nClusters > data.length) {
        throw new Error('Cannot generate more classes than there are data values');
    }

    var sorted = numericSort(data),
        // we'll use this as the maximum number of clusters
        uniqueCount = sortedUniqueCount(sorted);

    // if all of the input values are identical, there's one cluster
    // with all of the input in it.
    if (uniqueCount === 1) {
        return [sorted];
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

        for (var sortedIdx = Math.max(cluster, 1);
             sortedIdx < sorted.length;
             sortedIdx++) {

            if (cluster === 0) {

                // Increase the running sum of squares calculation by this
                // new value
                var squaredDifference = Math.pow(
                    sorted[sortedIdx] - firstClusterMean, 2);
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

    // The real work of Ckmeans clustering happens in the matrix generation:
    // the generated matrices encode all possible clustering combinations, and
    // once they're generated we can solve for the best clustering groups
    // very quickly.
    var clusters = [],
        clusterRight = backtrackMatrix[0].length - 1;

    // Backtrack the clusters from the dynamic programming matrix. This
    // starts at the bottom-right corner of the matrix (if the top-left is 0, 0),
    // and moves the cluster target with the loop.
    for (cluster = backtrackMatrix.length - 1; cluster >= 0; cluster--) {

        var clusterLeft = backtrackMatrix[cluster][clusterRight];

        // fill the cluster from the sorted input by taking a slice of the
        // array. the backtrack matrix makes this easy - it stores the
        // indexes where the cluster should start and end.
        clusters[cluster] = sorted.slice(clusterLeft, clusterRight + 1);

        if (cluster > 0) {
            clusterRight = clusterLeft - 1;
        }
    }

    return clusters;
}

module.exports = ckmeans;
