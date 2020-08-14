import sample from "./sample";

/**
 * Perform k-means clustering.
 *
 * @param {Array<Array<number>>} points N-dimensional coordinates of points to be clustered.
 * @param {number} numCluster How many clusters to create.
 * @param {Function} randomSource An optional entropy source that generates uniform values in [0, 1).
 * @returns {Array<number>, Array<Array<number>>} Labels (same length as data)
 * and centroids (XY coordinates, same length as numCluster).
 * @throws {Error} If any centroids wind up friendless (i.e., without associated points).
 */
function kMeansCluster (points, numCluster, randomSource=Math.random) {
    let oldCentroids = null,
        newCentroids = generateInitialCentroids(points, numCluster, randomSource),
        labels = null,
        change = Number.MAX_VALUE;
    while (change !== 0) {
        labels = labelPoints(points, newCentroids);
        oldCentroids = newCentroids;
        newCentroids = calculateCentroids(points, labels, numCluster);
        change = calculateChange(newCentroids, oldCentroids);
    }
    return {labels: labels, centroids: newCentroids};
}

/**
 * Generate starting points for clusters by randomly selecting points.
 * @param {Array<Array<number>>} points Array of XY coordinates.
 * @param {number} num How many points to select.
 * @param {function} randomSource Generate uniform random values in [0, 1).
 * @returns {Array<Array<number>>} XY coordinates of centroids.
 */
function generateInitialCentroids (points, num, randomSource) {
    return sample(points, num, randomSource);
}

/**
 * Label each point according to which centroid it is closest to.
 * @param {Array<Array<number>>} points Array of XY coordinates.
 * @param {Array<Array<number>>} centroids Current centroids.
 * @returns {Array<number>} Group labels.
 */
function labelPoints (points, centroids) {
    return points.map(p => {
        let minDist = Number.MAX_VALUE,
            label = -1;
        for (let i=0; i<centroids.length; i++) {
            const dist = distance(p, centroids[i]);
            if (dist < minDist) {
                minDist = dist;
                label = i;
            }
        }
        return label;
    })
}

/**
 * Calculate centroids for points given labels.
 * @param {Array<Array<number>>} points Array of XY coordinates.
 * @param {Array<number>} labels Which groups points belong to.
 * @param {number} num Number of clusters being created.
 * @returns {Array<Array<number>>} Centroid for each group.
 * @throws {Error} If any centroids wind up friendless (i.e., without associated points).
 */
function calculateCentroids (points, labels, num) {
    // Initialize accumulators.
    const width = points[0].length;
    const centroids = [];
    for (let i=0; i<num; i++) {
        centroids.push(Array(width).fill(0));
    }
    const counts = Array(num).fill(0);

    // Add points to centroids' accumulators and count points per centroid.
    for (let i=0; i<points.length; i++) {
        const point = points[i];
        const label = labels[i];
        const current = centroids[label];
        for (let j=0; j<current.length; j++) {
            current[j] += point[j];
        }
        counts[label] += 1;
    }

    // Rescale centroids, checking for any that have no points.
    for (let i=0; i<centroids.length; i++) {
        if (counts[i] === 0) {
            throw new Error(`Centroid ${i} has no friends`);
        }
        const centroid = centroids[i];
        for (let j=0; j<centroid.length; j++) {
            centroid[j] /= counts[i];
        }
    }
    
    return centroids;
}

/**
 * Calculate the difference between old centroids and new centroids.
 * @param {Array<Array<number>>} left One list of centroids.
 * @param {Array<Array<number>>} right Another list of centroids.
 * @returns {number} Distance between centroids.
 */
function calculateChange (left, right) {
    let total = 0;
    for (let i=0; i<left.length; i++) {
        total += distance(left[i], right[i]);
    }
    return total;
}

/**
 * Calculate Euclidean distance between two points.
 * @param {Array<number>} left First N-dimensional point.
 * @param {Array<number>} right Second N-dimensional point.
 * @returns {number} Distance.
 */
function distance (left, right) {
    let sum = 0;
    for (let i=0; i<left.length; i++) {
        const diff = left[i] - right[i];
        sum += diff * diff
    }
    return Math.sqrt(sum);
}

export default kMeansCluster;
