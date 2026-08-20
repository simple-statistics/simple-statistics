/**
 * The Root Mean Square (RMS) is
 * a mean function used as a measure of the magnitude of a set
 * of numbers, regardless of their sign.
 * This is the square root of the mean of the squares of the
 * input numbers.
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x a sample of one or more data points
 * @returns {number} root mean square
 * @throws {Error} if x is empty
 * @example
 * rootMeanSquare([-1, 1, -1, 1]); // => 1
 */
function rootMeanSquare(x) {
    if (x.length === 0) {
        throw new Error("rootMeanSquare requires at least one data point");
    }

    let sumOfSquares = 0;
    for (let i = 0; i < x.length; i++) {
        sumOfSquares += Math.pow(x[i], 2);
    }

    // Squaring leaves floating-point range well before the result does:
    // 1e200 squares to Infinity even though its root mean square is 1e200,
    // and 1e-200 squares to 0 even though its root mean square is 1e-200.
    // Only in those cases divide through by the largest magnitude first, so
    // every input whose squares are representable keeps its exact result.
    if (sumOfSquares === 0 || !Number.isFinite(sumOfSquares)) {
        let largest = 0;
        for (let i = 0; i < x.length; i++) {
            const magnitude = Math.abs(x[i]);
            if (magnitude > largest) {
                largest = magnitude;
            }
        }

        // every value was zero, so the root mean square is zero
        if (largest === 0 || !Number.isFinite(largest)) {
            return Math.sqrt(sumOfSquares / x.length);
        }

        let scaledSumOfSquares = 0;
        for (let i = 0; i < x.length; i++) {
            scaledSumOfSquares += Math.pow(x[i] / largest, 2);
        }

        return largest * Math.sqrt(scaledSumOfSquares / x.length);
    }

    return Math.sqrt(sumOfSquares / x.length);
}

export default rootMeanSquare;
