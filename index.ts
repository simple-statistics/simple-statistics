/* @flow */

// # simple-statistics
//
// A simple, literate statistics system.

// Linear Regression
export { default as linearRegression } from './src/linear_regression.ts';
export { default as linearRegressionLine } from './src/linear_regression_line.ts';
export { default as standardDeviation } from './src/standard_deviation.ts';
export { default as rSquared } from './src/r_squared.ts';
export { default as mode } from './src/mode.ts';
export { default as modeFast } from './src/mode_fast.ts';
export { default as modeSorted } from './src/mode_sorted.ts';
export { default as min } from './src/min.ts';
export { default as max } from './src/max.ts';
export { default as extent } from './src/extent.ts';
export { default as minSorted } from './src/min_sorted.ts';
export { default as maxSorted } from './src/max_sorted.ts';
export { default as extentSorted } from './src/extent_sorted.ts';
export { default as sum } from './src/sum.ts';
export { default as sumSimple } from './src/sum_simple.ts';
export { default as product } from './src/product.ts';
export { default as quantile } from './src/quantile.ts';
export { default as quantileSorted } from './src/quantile_sorted.ts';
export { default as quantileRank } from './src/quantile_rank.ts';
export { default as quantileRankSorted } from './src/quantile_rank_sorted.ts';
export { default as interquartileRange, default as iqr } from './src/interquartile_range.ts';
export { default as medianAbsoluteDeviation, default as mad } from './src/median_absolute_deviation.ts';
export { default as chunk } from './src/chunk.ts';
export { default as sampleWithReplacement } from './src/sample_with_replacement.ts';
export { default as shuffle } from './src/shuffle.ts';
export { default as shuffleInPlace } from './src/shuffle_in_place.ts';
export { default as sample } from './src/sample.ts';
export { default as ckmeans } from './src/ckmeans.ts';
export { default as uniqueCountSorted } from './src/unique_count_sorted.ts';
export { default as sumNthPowerDeviations } from './src/sum_nth_power_deviations.ts';
export { default as equalIntervalBreaks } from './src/equal_interval_breaks.ts';

// sample statistics
export { default as sampleCovariance } from './src/sample_covariance.ts';
export { default as sampleCorrelation } from './src/sample_correlation.ts';
export { default as sampleVariance } from './src/sample_variance.ts';
export { default as sampleStandardDeviation } from './src/sample_standard_deviation.ts';
export { default as sampleSkewness } from './src/sample_skewness.ts';
export { default as sampleKurtosis } from './src/sample_kurtosis.ts';

// combinatorics
export { default as permutationsHeap } from './src/permutations_heap.ts';
export { default as combinations } from './src/combinations.ts';
export { default as combinationsReplacement } from './src/combinations_replacement.ts';

// measures of centrality
export { default as addToMean } from './src/add_to_mean.ts';
export { default as combineMeans } from './src/combine_means.ts';
export { default as combineVariances } from './src/combine_variances.ts';
export { default as geometricMean } from './src/geometric_mean.ts';
export { default as harmonicMean } from './src/harmonic_mean.ts';
export { default as average, default as mean } from './src/mean.ts';
export { default as median } from './src/median.ts';
export { default as medianSorted } from './src/median_sorted.ts';
export { default as subtractFromMean } from './src/subtract_from_mean.ts';

export { default as rootMeanSquare, default as rms } from './src/root_mean_square.ts';
export { default as variance } from './src/variance.ts';
export { default as tTest } from './src/t_test.ts';
export { default as tTestTwoSample } from './src/t_test_two_sample.ts';
// ss.jenks = require('./src/jenks');

// Classifiers
export { default as BayesianClassifier, default as bayesian } from './src/bayesian_classifier.ts';
export { default as PerceptronModel, default as perceptron } from './src/perceptron.ts';

// Distribution-related methods
export { default as epsilon } from './src/epsilon.ts'; // We make ε available to the test suite.
export { default as factorial } from './src/factorial.ts';
export { default as gamma } from './src/gamma.ts';
export { default as bernoulliDistribution } from './src/bernoulli_distribution.ts';
export { default as binomialDistribution } from './src/binomial_distribution.ts';
export { default as poissonDistribution } from './src/poisson_distribution.ts';
export { default as chiSquaredDistributionTable } from './src/chi_squared_distribution_table.ts';
export { default as chiSquaredGoodnessOfFit } from './src/chi_squared_goodness_of_fit.ts';
export { default as kernelDensityEstimation, default as kde } from './src/kernel_density_estimation.ts';

// Normal distribution
export { default as zScore } from './src/z_score.ts';
export { default as cumulativeStdNormalProbability } from './src/cumulative_std_normal_probability.ts';
export { default as standardNormalTable } from './src/standard_normal_table.ts';
export { default as errorFunction, default as erf } from './src/error_function.ts';
export { default as inverseErrorFunction } from './src/inverse_error_function.ts';
export { default as probit } from './src/probit.ts';

// Non-parametric Methods
export { default as permutationTest } from './src/permutation_test.ts';

// Root-finding methods
export { default as bisect } from './src/bisect.ts';

// Utils
export { default as quickselect } from './src/quickselect.ts';
export { default as sign } from './src/sign.ts';
export { default as numericSort } from './src/numeric_sort.ts';
