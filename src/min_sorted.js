/**
 * The minimum is the lowest number in the array. With a sorted array,
 * the first element in the array is always the smallest, so this calculation
 * can be done in one step, or constant time.
 *
 * @param {Array<number>} x input
 * @returns {number} minimum value
 * @throws {Error} if x is empty
 * @example
 * minSorted([-100, -10, 1, 2, 5]); // => -100
 */
function minSorted(x) {
    if (x.length === 0) {
        throw new Error("min requires at least one data point");
    }

    return x[0];
}

export default minSorted;
