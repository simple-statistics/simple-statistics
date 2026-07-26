import chiSquaredDistributionTable from "./chi_squared_distribution_table.js";
import mean from "./mean.js";

/**
 * The [χ2 (Chi-Squared) Goodness-of-Fit Test](http://en.wikipedia.org/wiki/Goodness_of_fit#Pearson.27s_chi-squared_test)
 * uses a measure of goodness of fit which is the sum of differences between observed and expected outcome frequencies
 * (that is, counts of observations), each squared and divided by the number of observations expected given the
 * hypothesized distribution. The resulting χ2 statistic, `chiSquared`, can be compared to the chi-squared distribution
 * to determine the goodness of fit. In order to determine the degrees of freedom of the chi-squared distribution, one
 * takes the total number of observed frequencies and subtracts the number of estimated parameters. The test statistic
 * follows, approximately, a chi-square distribution with (k − c) degrees of freedom where `k` is the number of non-empty
 * cells and `c` is the number of estimated parameters for the distribution.
 *
 * @param {Array<number>} data
 * @param {Function} distributionType a function that returns a point in a distribution:
 * for instance, binomial, bernoulli, or poisson
 * @param {number} significance
 * @returns {number} chi squared goodness of fit
 * @example
 * // Data from Poisson goodness-of-fit example 10-19 in William W. Hines & Douglas C. Montgomery,
 * // "Probability and Statistics in Engineering and Management Science", Wiley (1980).
 * var data1019 = [
 *     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 *     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 *     1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
 *     2, 2, 2, 2, 2, 2, 2, 2, 2,
 *     3, 3, 3, 3
 * ];
 * ss.chiSquaredGoodnessOfFit(data1019, ss.poissonDistribution, 0.05); //= false
 */
function chiSquaredGoodnessOfFit(data, distributionType, significance) {
    // Estimate from the sample data, a weighted mean.
    const inputMean = mean(data);
    // Calculated value of the χ2 statistic.
    let chiSquared = 0;
    // Number of hypothesized distribution parameters estimated, expected to be supplied in the distribution test.
    // Lose one degree of freedom for estimating `lambda` from the sample data.
    const c = 1;
    // The hypothesized distribution.
    // Generate the hypothesized distribution.
    const hypothesizedDistribution = distributionType(inputMean);
    const observedFrequencies = [];
    const expectedFrequencies = [];

    // Create an array holding a histogram from the sample data, of
    // the form `{ value: numberOfOcurrences }`
    for (let i = 0; i < data.length; i++) {
        if (observedFrequencies[data[i]] === undefined) {
            observedFrequencies[data[i]] = 0;
        }
        observedFrequencies[data[i]]++;
    }

    // The histogram we created might be sparse - there might be gaps
    // between values. So we iterate through the histogram, making
    // sure that instead of undefined, gaps have 0 values.
    for (let i = 0; i < observedFrequencies.length; i++) {
        if (observedFrequencies[i] === undefined) {
            observedFrequencies[i] = 0;
        }
    }

    // Create an array holding a histogram of expected data given the
    // sample size and hypothesized distribution.
    for (const k in hypothesizedDistribution) {
        if (k in observedFrequencies) {
            expectedFrequencies[+k] = hypothesizedDistribution[k] * data.length;
        }
    }

    if (expectedFrequencies.length === 0) {
        throw new Error(
            "chiSquaredGoodnessOfFit requires distributionType to return a distribution for the mean of the data"
        );
    }

    // The hypothesized distribution can stop short of the largest observation,
    // leaving those observations with no expected frequency to be compared
    // against. Fold them into the last class the distribution does cover, the
    // same treatment the collapse below gives to sparse classes, so that the
    // two histograms describe the same classes.
    const lastClass = expectedFrequencies.length - 1;
    for (let k = observedFrequencies.length - 1; k > lastClass; k--) {
        observedFrequencies[lastClass] += observedFrequencies[k];
        observedFrequencies.pop();
    }

    // Working backward through the expected frequencies, collapse classes
    // if less than three observations are expected for a class.
    // This transformation is applied to the observed frequencies as well.
    // The class that was merged is the one that has to go: popping instead
    // drops the last class, which is only the same thing until a class is
    // large enough to keep. The first class is left alone, since there is no
    // class before it to collapse it into.
    for (let k = expectedFrequencies.length - 1; k >= 1; k--) {
        if (expectedFrequencies[k] < 3) {
            expectedFrequencies[k - 1] += expectedFrequencies[k];
            expectedFrequencies.splice(k, 1);

            observedFrequencies[k - 1] += observedFrequencies[k];
            observedFrequencies.splice(k, 1);
        }
    }

    // Iterate through the squared differences between observed & expected
    // frequencies, accumulating the `chiSquared` statistic.
    for (let k = 0; k < observedFrequencies.length; k++) {
        chiSquared +=
            Math.pow(observedFrequencies[k] - expectedFrequencies[k], 2) /
            expectedFrequencies[k];
    }

    if (!Number.isFinite(chiSquared)) {
        throw new Error(
            "chiSquaredGoodnessOfFit could not compute a test statistic for this data and distribution"
        );
    }

    // Calculate degrees of freedom for this test and look it up in the
    // `chiSquaredDistributionTable` in order to
    // accept or reject the goodness-of-fit of the hypothesized distribution.
    // Degrees of freedom, calculated as (number of class intervals -
    // number of hypothesized distribution parameters estimated - 1)
    const degreesOfFreedom = observedFrequencies.length - c - 1;
    if (degreesOfFreedom < 1) {
        throw new Error(
            "chiSquaredGoodnessOfFit requires more data: the classes that survive collapsing leave no degrees of freedom"
        );
    }

    const criticalValues = chiSquaredDistributionTable[degreesOfFreedom];
    if (criticalValues === undefined) {
        throw new Error(
            `chiSquaredGoodnessOfFit has no critical values tabulated for ${degreesOfFreedom} degrees of freedom`
        );
    }
    if (criticalValues[significance] === undefined) {
        throw new Error(
            `chiSquaredGoodnessOfFit has no critical value tabulated for a significance of ${significance}`
        );
    }

    return criticalValues[significance] < chiSquared;
}

export default chiSquaredGoodnessOfFit;
