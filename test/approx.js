/**
 * Default tolerance for relative error.
 */
const TOLERANCE = 1.0e-6;

/**
 * Relative error.
 * @param {number} a One value.
 * @param {number} a The other value.
 * @returns {number} The relative error.
 */
function relativeError(a, b) {
    if (a === b) {
        return 0.0;
    }
    return Math.abs(a - b) / Math.max(Math.abs(a), Math.abs(b));
}

/**
 * Approximate equality.
 * @param {number} a One value.
 * @param {number} a The other value.
 * @param {number} tolerance The acceptable relative difference.
 * @returns {boolean} Whether numbers are within tolerance.
 */
function approxEqual(a, b, tolerance = TOLERANCE) {
    if (tolerance < 0.0) {
        throw new Error("tolerance must be non-negative");
    }
    return relativeError(a, b) <= tolerance;
}

/**
 * Approximate equality for all elements of two vectors.
 * @param {number} a One vector.
 * @param {number} a The other vector.
 * @param {number} tolerance The acceptable relative difference between elements.
 * @returns {boolean} Whether all numbers are within tolerance.
 */
function allApproxEqual(a, b, tolerance = TOLERANCE) {
    if (a.length !== b.length) {
        throw new Error("input vectors must have the same length")
    }
    const size = a.length;
    for (let i = 0; i < size; i++) {
        if (!approxEqual(a[i], b[i])) {
            return false;
        }
    }
    return true;
}

export {
    TOLERANCE,
    relativeError,
    approxEqual,
    allApproxEqual
};
