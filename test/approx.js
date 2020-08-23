const ss = require("../");

/**
 * Relative error.
 *
 * @param {number} a One value.
 * @param {number} a The other value.
 * @return {number} The relative error.
 */
function relativeError(a, b) {
    if (a === b) {
        return 0;
    }
    return Math.abs(a - b) / Math.max(Math.abs(a), Math.abs(b));
}

/**
 * Approximate equality.
 *
 * @param {number} a One value.
 * @param {number} a The other value.
 * @param {number} tolerance The acceptable relative difference.
 * @return {boolean} Whether numbers are within tolerance.
 */
function approxEqual(a, b, tolerance = ss.epsilon) {
    return relativeError(a, b) <= tolerance;
}

/**
 * Approximate equality for all elements of two vectors.
 *
 * @param {number} a One vector.
 * @param {number} a The other vector.
 * @param {number} tolerance The acceptable relative difference between elements.
 * @return {boolean} Whether all numbers are within tolerance.
 */
function allApproxEqual(a, b, tolerance = ss.epsilon) {
    if (a.length !== b.length) {
        throw new Error("input vectors must have the same length");
    }
    const size = a.length;
    for (let i = 0; i < size; i++) {
        if (!approxEqual(a[i], b[i])) {
            return false;
        }
    }
    return true;
}

export { relativeError, approxEqual, allApproxEqual };
