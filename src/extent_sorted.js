/**
 * The extent is the lowest & highest number in the array. With a sorted array,
 * the first element in the array is always the lowest while the last element is always the largest, so this calculation
 * can be done in one step, or constant time.
 *
 * @param {Array<number>} x input
 * @returns {Array<number>} minimum & maximum value
 * @throws {Error} if x is empty
 * @example
 * extentSorted([-100, -10, 1, 2, 5]); // => [-100, 5]
 */
function extentSorted(x) {
    if (x.length === 0) {
        throw new Error("extent requires at least one data point");
    }

    return [x[0], x[x.length - 1]];
}

export default extentSorted;
