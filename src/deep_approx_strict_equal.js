import approxStrictEqual from "./approx_strict_equal";
import epsilon from "./epsilon";

/**
 * Approximate strict equality for all elements of two structures, which may be
 * null, undefined, number, string, array, or object.  This implements a subset
 * of the Node sourc file 'lib/internal/util/comparisons.js', which is mirrored
 * by 'internal/util/comparisons.js' in the CommonJS assert module.
 *
 * @param {number} actual The value to be tested.
 * @param {number} expected The reference value.
 * @param {number} tolerance The acceptable relative difference between elements.
 * @return {boolean} Whether all numbers are within tolerance.
 */
function deepApproxStrictEqual(actual, expected, tolerance = epsilon) {
    // Types must match
    if (typeof expected !== typeof actual) {
        return false;
    }

    // Undefined matches undefined
    else if (expected === undefined) {
        return actual === undefined;
    }

    // Null only equals null (check both sides to prevent attempts to access
    // properties of null further down)
    else if (expected === null) {
        return actual === null;
    }
    else if (actual === null) {
        return false;
    }

    // Booleans must be exactly equal
    else if (typeof expected === "boolean") {
        return expected === actual;
    }

    // Strings must be exactly equal
    else if (typeof expected === "string") {
        return expected === actual;
    }

    // Numbers must be approximately equal
    else if (typeof expected === "number") {
        return approxStrictEqual(actual, expected, tolerance);
    }

    // Corresponding array elements must be equal
    else if (Array.isArray(expected)) {
        return arrayApproxStrictEqual(actual, expected, tolerance);
    }
    else if (Array.isArray(actual)) {
        return false;
    }

    // Objects must have matching keys and approximately equal values
    else if (typeof expected === "object") {
        return objectApproxStrictEqual(actual, expected, tolerance);
    }

    // Functions, symbols, etc.
    return expected === actual;
}

/**
 * Approximate strict equality for corresponding elements of equal-sized arrays.
 *
 * @private
 * @param {number} actual The array to be tested.
 * @param {number} expected The reference array.
 * @param {number} tolerance The acceptable relative difference between elements.
 * @return {boolean} Whether all numbers are within tolerance.
 */
function arrayApproxStrictEqual(actual, expected, tolerance) {
    if (!Array.isArray(actual) || !Array.isArray(expected)) {
        return false;
    }
    if (expected.length !== actual.length) {
        return false;
    }
    for (let i = 0; i < expected.length; i++) {
        if (!deepApproxStrictEqual(actual[i], expected[i], tolerance)) {
            return false;
        }
    }
    return true;
}

/**
 * Approximate strict equality for corresponding elements of objects, which must
 * have exactly the same keys with approximately equal values.
 *
 * @private
 * @param {number} actual The object to be tested.
 * @param {number} expected The reference object.
 * @param {number} tolerance The acceptable relative difference between elements.
 * @return {boolean} Whether all numbers are within tolerance.
 */
function objectApproxStrictEqual(actual, expected, tolerance) {
    for (const key in expected) {
        if (!(key in actual)) {
            return false;
        }
        if (!deepApproxStrictEqual(actual[key], expected[key], tolerance)) {
            return false;
        }
    }
    for (const key in actual) {
        if (!(key in expected)) {
            return false;
        }
    }
    return true;
}

export default deepApproxStrictEqual;
