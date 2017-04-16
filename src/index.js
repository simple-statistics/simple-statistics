/* @flow */

// # simple-statistics
//
// A simple, literate statistics system.

// Linear Regression
export { linearRegression } from './linear_regression';
export { linearRegressionLine } from './linear_regression_line';
export { standardDeviation } from './standard_deviation';
export { rSquared } from './r_squared';
export { mode } from './mode';
export { modeFast } from './mode_fast';
export { modeSorted } from './mode_sorted';
export { min } from './min';
export { max } from './max';
export { minSorted } from './min_sorted';
export { maxSorted } from './max_sorted';
export { sum } from './sum';
export { sumSimple } from './sum_simple';
export { product } from './product';
export { quantile } from './quantile';
export { quantileSorted } from './quantile_sorted';
export {
  interquartileRange,
  interquartileRange as iqr
} from './interquartile_range';
export {
  medianAbsoluteDeviation,
  medianAbsoluteDeviation as mad
} from './median_absolute_deviation';
export { chunk } from './chunk';
export { sampleWithReplacement } from './sample_with_replacement';
export { shuffle } from './shuffle';
export { shuffleInPlace } from './shuffle_in_place';
export { sample } from './sample';
export { ckmeans } from './ckmeans';
export { uniqueCountSorted } from './unique_count_sorted';
export { sumNthPowerDeviations } from './sum_nth_power_deviations';
export { equalIntervalBreaks } from './equal_interval_breaks';

// sample statistics
export { sampleCovariance } from './sample_covariance';
export { sampleCorrelation } from './sample_correlation';
export { sampleVariance } from './sample_variance';
export { sampleStandardDeviation } from './sample_standard_deviation';
export { sampleSkewness } from './sample_skewness';

// combinatorics
export { permutationsHeap } from './permutations_heap';
export { combinations } from './combinations';
export { combinationsReplacement } from './combinations_replacement';

// measures of centrality
export { addToMean } from './add_to_mean';
export { combineMeans } from './combine_means';
export { combineVariances } from './combine_variances';
export { geometricMean } from './geometric_mean';
export { harmonicMean } from './harmonic_mean';
export { mean, mean as average } from './mean';
export { median } from './median';
export { medianSorted } from './median_sorted';
export { subtractFromMean } from './subtract_from_mean';

export { rootMeanSquare, rootMeanSquare as rms } from './root_mean_square';
export { variance } from './variance';
export { tTest } from './t_test';
export { tTestTwoSample } from './t_test_two_sample';
// export { jenks } from './jenks';

// Classifiers
export {
  BayesianClassifier,
  BayesianClassifier as bayesian
} from './bayesian_classifier';
export { PerceptronModel, PerceptronModel as perceptron } from './perceptron';

// Distribution-related methods
export { epsilon } from './epsilon'; // We make ε available to the test suite.
export { factorial } from './factorial';
export { bernoulliDistribution } from './bernoulli_distribution';
export { binomialDistribution } from './binomial_distribution';
export { poissonDistribution } from './poisson_distribution';
export { chiSquaredGoodnessOfFit } from './chi_squared_goodness_of_fit';

// Normal distribution
export { zScore } from './z_score';
export {
  cumulativeStdNormalProbability
} from './cumulative_std_normal_probability';
export { standardNormalTable } from './standard_normal_table';
export { errorFunction, errorFunction as erf } from './error_function';
export { inverseErrorFunction } from './inverse_error_function';
export { probit } from './probit';
export { mixin } from './mixin';

// Root-finding methods
export { bisect } from './bisect';
