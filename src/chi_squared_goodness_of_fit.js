'use strict';

var mean = require('./mean');
var chi_squared_distribution_table = require('./chi_squared_distribution_table');

// # χ2 (Chi-Squared) Goodness-of-Fit Test
//
// The [χ2 (Chi-Squared) Goodness-of-Fit Test](http://en.wikipedia.org/wiki/Goodness_of_fit#Pearson.27s_chi-squared_test)
// uses a measure of goodness of fit which is the sum of differences between observed and expected outcome frequencies
// (that is, counts of observations), each squared and divided by the number of observations expected given the
// hypothesized distribution. The resulting χ2 statistic, `chi_squared`, can be compared to the chi-squared distribution
// to determine the goodness of fit. In order to determine the degrees of freedom of the chi-squared distribution, one
// takes the total number of observed frequencies and subtracts the number of estimated parameters. The test statistic
// follows, approximately, a chi-square distribution with (k − c) degrees of freedom where `k` is the number of non-empty
// cells and `c` is the number of estimated parameters for the distribution.
function chi_squared_goodness_of_fit(data, distribution_type, significance) {
    // Estimate from the sample data, a weighted mean.
    var input_mean = mean(data),
        // Calculated value of the χ2 statistic.
        chi_squared = 0,
        // Degrees of freedom, calculated as (number of class intervals -
        // number of hypothesized distribution parameters estimated - 1)
        degrees_of_freedom,
        // Number of hypothesized distribution parameters estimated, expected to be supplied in the distribution test.
        // Lose one degree of freedom for estimating `lambda` from the sample data.
        c = 1,
        // The hypothesized distribution.
        // Generate the hypothesized distribution.
        hypothesized_distribution = distribution_type(input_mean),
        observed_frequencies = [],
        expected_frequencies = [],
        k;

    // Create an array holding a histogram from the sample data, of
    // the form `{ value: numberOfOcurrences }`
    for (var i = 0; i < data.length; i++) {
        if (observed_frequencies[data[i]] === undefined) {
            observed_frequencies[data[i]] = 0;
        }
        observed_frequencies[data[i]]++;
    }

    // The histogram we created might be sparse - there might be gaps
    // between values. So we iterate through the histogram, making
    // sure that instead of undefined, gaps have 0 values.
    for (i = 0; i < observed_frequencies.length; i++) {
        if (observed_frequencies[i] === undefined) {
            observed_frequencies[i] = 0;
        }
    }

    // Create an array holding a histogram of expected data given the
    // sample size and hypothesized distribution.
    for (k in hypothesized_distribution) {
        if (k in observed_frequencies) {
            expected_frequencies[k] = hypothesized_distribution[k] * data.length;
        }
    }

    // Working backward through the expected frequencies, collapse classes
    // if less than three observations are expected for a class.
    // This transformation is applied to the observed frequencies as well.
    for (k = expected_frequencies.length - 1; k >= 0; k--) {
        if (expected_frequencies[k] < 3) {
            expected_frequencies[k - 1] += expected_frequencies[k];
            expected_frequencies.pop();

            observed_frequencies[k - 1] += observed_frequencies[k];
            observed_frequencies.pop();
        }
    }

    // Iterate through the squared differences between observed & expected
    // frequencies, accumulating the `chi_squared` statistic.
    for (k = 0; k < observed_frequencies.length; k++) {
        chi_squared += Math.pow(
            observed_frequencies[k] - expected_frequencies[k], 2) /
            expected_frequencies[k];
    }

    // Calculate degrees of freedom for this test and look it up in the
    // `chi_squared_distribution_table` in order to
    // accept or reject the goodness-of-fit of the hypothesized distribution.
    degrees_of_freedom = observed_frequencies.length - c - 1;
    return chi_squared_distribution_table[degrees_of_freedom][significance] < chi_squared;
}

module.exports = chi_squared_goodness_of_fit;
