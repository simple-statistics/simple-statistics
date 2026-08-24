import errorFunction from "./error_function.js";

/**
 * **[Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution)**
 *
 * Returns either the probability density or the cumulative probability of a
 * normal distribution with the given mean and standard deviation, evaluated
 * at x. It is the equivalent of the NORM.DIST function found in spreadsheet
 * software.
 *
 * The cumulative form is computed with `errorFunction`, so it is more precise
 * than converting x to a z-score and looking it up in the four-decimal
 * `standardNormalTable` used by `cumulativeStdNormalProbability`.
 *
 * @param {number} x the value for which you want the distribution
 * @param {number} mean the mean of the distribution
 * @param {number} standardDeviation the standard deviation of the distribution
 * @param {boolean} [cumulative=false] if true, return the cumulative
 * distribution function; if false, return the probability density function
 * @returns {number} the probability density at x, or the probability of a
 * value at most x
 * @throws {Error} if standardDeviation is not greater than zero
 * @example
 * normalDistribution(42, 40, 1.5, true).toFixed(4); // => '0.9088'
 * normalDistribution(42, 40, 1.5, false).toFixed(4); // => '0.1093'
 */
function normalDistribution(x, mean, standardDeviation, cumulative = false) {
    if (standardDeviation <= 0) {
        throw new Error(
            "normalDistribution requires a standard deviation greater than zero"
        );
    }

    const standardizedX = (x - mean) / standardDeviation;

    if (cumulative) {
        return 0.5 * (1 + errorFunction(standardizedX / Math.SQRT2));
    }
    return (
        Math.exp(-0.5 * standardizedX * standardizedX) /
        (standardDeviation * Math.sqrt(2 * Math.PI))
    );
}

export default normalDistribution;
