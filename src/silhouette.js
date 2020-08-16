import euclideanDistance from "./euclidean_distance";
import makeMatrix from "./make_matrix";

/**
 * Calculate the [silhouette values](https://en.wikipedia.org/wiki/Silhouette_(clustering))
 * for clustered data.
 * @param {Array<Array<number>>} points N-dimensional coordinates of points.
 * @param {Array<number>} labels Labels of points. This must be the same length as `points`,
 * and values must lie in [0..G-1], where G is the number of groups.
 * @returns {Array<number>} The silhouette value for each point.
 */
function silhouette(points, labels) {
    if (points.length !== labels.length) {
        throw new Error("must have exactly as many labels as points");
    }
    const numPoints = points.length,
          groupings = createGroups(labels),
          distances = calculateAllDistances(points);
    const result = [];
    for (let i = 0; i < numPoints; i++){
        let s = 0;
        if (groupings[labels[i]].length > 1) {
            const a = meanDistanceWithinGroup(i, labels, groupings, distances);
            const b = meanDistanceToNearestGroup(i, labels, groupings, distances);
            s = (b - a) / Math.max(a, b);
        }
        result.push(s);
    }
    return result;
}

/**
 * Create a lookup table mapping group IDs to point IDs.
 * @param {Array<number>} labels Labels of points. This must be the same length as `points`,
 * and values must lie in [0..G-1], where G is the number of groups.
 * @returns {Array<Array<number>>} An array of length G, each of whose entries is an array
 * containing the indices of the points in that group.
 */
function createGroups(labels) {
    const numLabels = labels.length,
          numGroups = 1 + Math.max(...labels),
          result = Array(numGroups);
    for (let i = 0; i < numLabels; i++){
        const label = labels[i];
        if (result[label] === undefined){
            result[label] = [];
        }
        result[label].push(i);
    }
    return result;
}

/**
 * Create a lookup table of all inter-point distances.
 * @param {Array<Array<number>>} points N-dimensional coordinates of points.
 * @returns {Array<Array<number>>} A symmetric square array of inter-point distances
 * (zero on the diagonal).
 */
function calculateAllDistances(points) {
    const numPoints = points.length,
          result = makeMatrix(numPoints, numPoints);
    for (let i = 0; i < numPoints; i++){
        for (let j = 0; j < i; j++){
            result[i][j] = euclideanDistance(points[i], points[j]);
            result[j][i] = result[i][j];
        }
    }
    return result;
}

/**
 * Calculate the mean distance between a point and other points in its group
 * (which is zero if the group only has one element).
 * @param {number} which The index of this point.
 * @param {Array<number>} labels Labels of points.
 * @param {Array<Array<number>>} groupings An array whose entries are arrays
 * containing the indices of the points in that group.
 * @param {Array<Array<number>>} distances A symmetric square array of inter-point
 * distances.
 * @returns {number} The mean distance from this point to others in its group.
 */
function meanDistanceWithinGroup(which, labels, groupings, distances) {
    return meanDistanceFromPointToGroup(which, groupings[labels[which]], distances);
}

/**
 * Calculate the mean distance between this point and all the points in the
 * nearest group (as determined by which point in another group is closest).
 * @param {number} which The index of this point.
 * @param {Array<number>} labels Labels of points.
 * @param {Array<Array<number>>} groupings An array whose entries are arrays
 * containing the indices of the points in that group.
 * @param {Array<Array<number>>} distances A symmetric square array of inter-point
 * distances.
 * @returns {number} The mean distance from this point to others in the nearest
 * group.
 */
function meanDistanceToNearestGroup(which, labels, groupings, distances) {
    const label = labels[which],
          numGroups = groupings.length;
    let result = Number.MAX_VALUE;
    for (let i = 0; i < numGroups; i++){
        if (i !== label){
            const d = meanDistanceFromPointToGroup(which, groupings[i], distances);
            if (d < result){
                result = d;
            }
        }
    }
    return result;
}

/**
 * Calculate the mean distance between a point and all the points in a group
 * (possibly its own).
 * @param {number} which The index of this point.
 * @param {Array<number>} group The indices of all the points in the group in
 * question.
 * @param {Array<Array<number>>} distances A symmetric square array of inter-point
 * distances.
 * @returns {number} The mean distance from this point to others in the
 * specified group.
 */
function meanDistanceFromPointToGroup(which, group, distances) {
    const groupSize = group.length;
    let total = 0.0;
    for (let i = 0; i < groupSize; i++){
        total += distances[which][group[i]];
    }
    return total / groupSize;
}

export default silhouette;
