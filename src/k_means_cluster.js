<<<<<<< HEAD
import euclideanDistance from "./euclidean_distance";
import makeMatrix from "./make_matrix";
import sample from "./sample";

/**
 * @typedef {Object} kMeansReturn
 * @property {Array<number>} labels The labels.
 * @property {Array<Array<number>>} centroids The cluster centroids.
 */

/**
 * Perform k-means clustering.
 *
 * @param {Array<Array<number>>} points N-dimensional coordinates of points to be clustered.
 * @param {number} numCluster How many clusters to create.
 * @param {Function} randomSource An optional entropy source that generates uniform values in [0, 1).
 * @return {kMeansReturn} Labels (same length as data) and centroids (same length as numCluster).
 * @throws {Error} If any centroids wind up friendless (i.e., without associated points).
 *
 * @example
 * kMeansCluster([[0.0, 0.5], [1.0, 0.5]], 2); // => {labels: [0, 1], centroids: [[0.0, 0.5], [1.0 0.5]]}
 */
function kMeansCluster(points, numCluster, randomSource = Math.random) {
    let oldCentroids = null;
    let newCentroids = sample(points, numCluster, randomSource);
    let labels = null;
    let change = Number.MAX_VALUE;
=======
import sample from "./sample";

/**
 * Perform k-means clustering.
 *
 * @param {Array<Array<number>>} points XY coordinates of points to cluster.
 * @param {number} numCluster How many clusters to create.
 * @param {Function} randomSource An optional entropy source that generates uniform values in [0, 1).
 * @returns {Array<number>, Array<Array<number>>} Labels (same length as data)
 * and centroids (XY coordinates, same length as numCluster).
 * @throws {Error} If any centroids wind up friendless (i.e., without associated points).
 */
const kMeansCluster = (points, numCluster, randomSource=Math.random) => {
    let oldCentroids = null,
        newCentroids = generateInitialCentroids(points, numCluster, randomSource),
        labels = null,
        change = Number.MAX_VALUE;
>>>>>>> 4b76304... Implementing k-means clustering using the naïve version of Lloyd's algorithm.
    while (change !== 0) {
        labels = labelPoints(points, newCentroids);
        oldCentroids = newCentroids;
        newCentroids = calculateCentroids(points, labels, numCluster);
        change = calculateChange(newCentroids, oldCentroids);
    }
<<<<<<< HEAD
    return {
        labels: labels,
        centroids: newCentroids
    };
=======
    return {labels: labels, centroids: newCentroids};
}

/**
 * Generate starting points for clusters by randomly selecting points.
 * @param {Array<Array<number>>} points Array of XY coordinates.
 * @param {number} num How many points to select.
 * @param {function} randomSource Generate uniform random values in [0, 1).
 * @returns {Array<Array<number>>} XY coordinates of centroids.
 */
const generateInitialCentroids = (points, num, randomSource) => {
    return sample(points, num, randomSource);
>>>>>>> 4b76304... Implementing k-means clustering using the naïve version of Lloyd's algorithm.
}

/**
 * Label each point according to which centroid it is closest to.
<<<<<<< HEAD
 *
 * @private
 * @param {Array<Array<number>>} points Array of XY coordinates.
 * @param {Array<Array<number>>} centroids Current centroids.
 * @return {Array<number>} Group labels.
 */
function labelPoints(points, centroids) {
    return points.map((p) => {
        let minDist = Number.MAX_VALUE;
        let label = -1;
        for (let i = 0; i < centroids.length; i++) {
            const dist = euclideanDistance(p, centroids[i]);
=======
 * @param {Array<Array<number>>} points Array of XY coordinates.
 * @param {Array<Array<number>>} centroids Current centroids.
 * @returns {Array<number>} Group labels.
 */
const labelPoints = (points, centroids) => {
    return points.map(p => {
        let minDist = Number.MAX_VALUE,
            label = -1;
        centroids.forEach((c, i) => {
            const dist = distance(p, c);
>>>>>>> 4b76304... Implementing k-means clustering using the naïve version of Lloyd's algorithm.
            if (dist < minDist) {
                minDist = dist;
                label = i;
            }
<<<<<<< HEAD
        }
        return label;
    });
=======
        })
        return label;
    })
>>>>>>> 4b76304... Implementing k-means clustering using the naïve version of Lloyd's algorithm.
}

/**
 * Calculate centroids for points given labels.
<<<<<<< HEAD
 *
 * @private
 * @param {Array<Array<number>>} points Array of XY coordinates.
 * @param {Array<number>} labels Which groups points belong to.
 * @param {number} numCluster Number of clusters being created.
 * @return {Array<Array<number>>} Centroid for each group.
 * @throws {Error} If any centroids wind up friendless (i.e., without associated points).
 */
function calculateCentroids(points, labels, numCluster) {
    // Initialize accumulators.
    const dimension = points[0].length;
    const centroids = makeMatrix(numCluster, dimension);
    const counts = Array(numCluster).fill(0);

    // Add points to centroids' accumulators and count points per centroid.
    const numPoints = points.length;
    for (let i = 0; i < numPoints; i++) {
        const point = points[i];
        const label = labels[i];
        const current = centroids[label];
        for (let j = 0; j < dimension; j++) {
            current[j] += point[j];
        }
        counts[label] += 1;
    }

    // Rescale centroids, checking for any that have no points.
    for (let i = 0; i < numCluster; i++) {
        if (counts[i] === 0) {
            throw new Error(`Centroid ${i} has no friends`);
        }
        const centroid = centroids[i];
        for (let j = 0; j < dimension; j++) {
            centroid[j] /= counts[i];
        }
    }

=======
 * @param {Array<Array<number>>} points Array of XY coordinates.
 * @param {Array<number>} labels Which groups points belong to.
 * @param {number} num Number of clusters being created.
 * @returns {Array<Array<number>>} Centroid for each group.
 * @throws {Error} If any centroids wind up friendless (i.e., without associated points).
 */
const calculateCentroids = (points, labels, num) => {
    // Initialize accumulators.
    const width = points[0].length;
    const centroids = [];
    for (let i=0; i<num; i++) {
        centroids.push(Array(width).fill(0));
    }
    const counts = Array(num).fill(0);

    // Add points to centroids' accumulators and count points per centroid.
    points.forEach((p, i) => {
        const lbl = labels[i];
        const current = centroids[lbl];
        current.forEach((soFar, j) => {
            current[j] = soFar + p[j];
        })
        counts[lbl] += 1;
    })

    // Rescale centroids, checking for any that have no points.
    centroids.forEach((c, i) => {
        if (counts[i] === 0) {
            throw new Change(`Centroid ${i} has no friends`);
        }
        centroids[i] = centroids[i].map(total => total / counts[i]);
    })
    
>>>>>>> 4b76304... Implementing k-means clustering using the naïve version of Lloyd's algorithm.
    return centroids;
}

/**
 * Calculate the difference between old centroids and new centroids.
<<<<<<< HEAD
 *
 * @private
 * @param {Array<Array<number>>} left One list of centroids.
 * @param {Array<Array<number>>} right Another list of centroids.
 * @return {number} Distance between centroids.
 */
function calculateChange(left, right) {
    let total = 0;
    for (let i = 0; i < left.length; i++) {
        total += euclideanDistance(left[i], right[i]);
    }
    return total;
=======
 * @param {number[][2]} left One set of centroids.
 * @param {number[][2]} right Another set of centroids.
 * @returns {number} Distance between centroids.
 */
const calculateChange = (left, right) => {
    return left.reduce((total, pLeft, i) => {
        return total + distance(pLeft, right[i]);
    }, 0)
}

/**
 * Calculate Euclidean distance between two points.
 * @param {Object} left First point.
 * @param {Object} right Second point.
 * @returns {number} Distance.
 */
const distance = (left, right) => {
    let sum = 0;
    left.forEach((v, i) => {
        sum += (v - right[i]) ** 2;
    })
    return Math.sqrt(sum);
>>>>>>> 4b76304... Implementing k-means clustering using the naïve version of Lloyd's algorithm.
}

export default kMeansCluster;
