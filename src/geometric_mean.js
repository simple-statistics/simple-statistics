/**
 * The [Geometric Mean](https://en.wikipedia.org/wiki/Geometric_mean) is
 * a mean function that is more useful for numbers in different
 * ranges.
 *
 * This is the nth root of the input numbers multiplied by each other.
 *
 * The geometric mean is often useful for
 * **[proportional growth](https://en.wikipedia.org/wiki/Geometric_mean#Proportional_growth)**: given
 * growth rates for multiple years, like _80%, 16.66% and 42.85%_, a simple
 * mean will incorrectly estimate an average growth rate, whereas a geometric
 * mean will correctly estimate a growth rate that, over those years,
 * will yield the same end value.
 *
 * This runs in `O(n)`, linear time, with respect to the length of the array.
 *
 * @param {Array<number>} x sample of one or more data points
 * @returns {number} geometric mean
 * @throws {Error} if x is empty
 * @throws {Error} if x contains a negative number
 * @example
 * var growthRates = [1.80, 1.166666, 1.428571];
 * var averageGrowth = ss.geometricMean(growthRates);
 * var averageGrowthRates = [averageGrowth, averageGrowth, averageGrowth];
 * var startingValue = 10;
 * var startingValueMean = 10;
 * growthRates.forEach(function(rate) {
 *   startingValue *= rate;
 * });
 * averageGrowthRates.forEach(function(rate) {
 *   startingValueMean *= rate;
 * });
 * startingValueMean === startingValue;
 */
function geometricMean(x) {
    if (x.length === 0) {
        throw new Error("geometricMean requires at least one data point");
    }

    // the starting value.
    let value = 1;
    let containsZero = false;

    for (let i = 0; i < x.length; i++) {
        // the geometric mean is only valid for positive numbers
        if (x[i] < 0) {
            throw new Error(
                "geometricMean requires only non-negative numbers as input"
            );
        }

        if (x[i] === 0) {
            containsZero = true;
        }

        // repeatedly multiply the value by each number
        value *= x[i];
    }

    if (containsZero) {
        return 0;
    }

    // The running product leaves floating-point range long before the mean
    // does: 500 copies of 1e10 overflow the product to Infinity even though
    // the mean is exactly 1e10, and 500 copies of 1e-10 underflow it to 0.
    // Only in that case fall back to log space, so every input whose product
    // is representable keeps its exact product-based result.
    if (value === 0 || !Number.isFinite(value)) {
        let logSum = 0;
        for (let i = 0; i < x.length; i++) {
            logSum += Math.log(x[i]);
        }
        return Math.exp(logSum / x.length);
    }

    return Math.pow(value, 1 / x.length);
}

export default geometricMean;
