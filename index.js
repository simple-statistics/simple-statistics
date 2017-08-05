/* @flow */
'use strict';

// # simple-statistics
//
// A simple, literate statistics system.

var ss = module.exports = {};

// Linear Regression
ss.linearRegression = require('./src/linear_regression');
ss.linearRegressionLine = require('./src/linear_regression_line');
ss.standardDeviation = require('./src/standard_deviation');
ss.rSquared = require('./src/r_squared');
ss.mode = require('./src/mode');
ss.modeFast = require('./src/mode_fast');
ss.modeSorted = require('./src/mode_sorted');
ss.min = require('./src/min');
ss.max = require('./src/max');
ss.minSorted = require('./src/min_sorted');
ss.maxSorted = require('./src/max_sorted');
ss.sum = require('./src/sum');
ss.sumSimple = require('./src/sum_simple');
ss.product = require('./src/product');
ss.quantile = require('./src/quantile');
ss.quantileSorted = require('./src/quantile_sorted');
ss.interquartileRange = ss.iqr = require('./src/interquartile_range');
ss.medianAbsoluteDeviation = ss.mad = require('./src/median_absolute_deviation');
ss.chunk = require('./src/chunk');
ss.sampleWithReplacement = require('./src/sample_with_replacement');
ss.shuffle = require('./src/shuffle');
ss.shuffleInPlace = require('./src/shuffle_in_place');
ss.sample = require('./src/sample');
ss.ckmeans = require('./src/ckmeans');
ss.uniqueCountSorted = require('./src/unique_count_sorted');
ss.sumNthPowerDeviations = require('./src/sum_nth_power_deviations');
ss.equalIntervalBreaks = require('./src/equal_interval_breaks');

// sample statistics
ss.sampleCovariance = require('./src/sample_covariance');
ss.sampleCorrelation = require('./src/sample_correlation');
ss.sampleVariance = require('./src/sample_variance');
ss.sampleStandardDeviation = require('./src/sample_standard_deviation');
ss.sampleSkewness = require('./src/sample_skewness');
ss.sampleKurtosis = require('./src/sample_kurtosis');

// combinatorics
ss.permutationsHeap = require('./src/permutations_heap');
ss.combinations = require('./src/combinations');
ss.combinationsReplacement = require('./src/combinations_replacement');

// measures of centrality
ss.addToMean = require('./src/add_to_mean');
ss.combineMeans = require('./src/combine_means');
ss.combineVariances = require('./src/combine_variances');
ss.geometricMean = require('./src/geometric_mean');
ss.harmonicMean = require('./src/harmonic_mean');
ss.mean = ss.average = require('./src/mean');
ss.median = require('./src/median');
ss.medianSorted = require('./src/median_sorted');
ss.subtractFromMean = require('./src/subtract_from_mean');

ss.rootMeanSquare = ss.rms = require('./src/root_mean_square');
ss.variance = require('./src/variance');
ss.tTest = require('./src/t_test');
ss.tTestTwoSample = require('./src/t_test_two_sample');
// ss.jenks = require('./src/jenks');

// Classifiers
ss.BayesianClassifier = ss.bayesian = require('./src/bayesian_classifier');
ss.PerceptronModel = ss.perceptron = require('./src/perceptron');

// Distribution-related methods
ss.epsilon = require('./src/epsilon'); // We make ε available to the test suite.
ss.factorial = require('./src/factorial');
ss.bernoulliDistribution = require('./src/bernoulli_distribution');
ss.binomialDistribution = require('./src/binomial_distribution');
ss.poissonDistribution = require('./src/poisson_distribution');
ss.chiSquaredGoodnessOfFit = require('./src/chi_squared_goodness_of_fit');

// Normal distribution
ss.zScore = require('./src/z_score');
ss.cumulativeStdNormalProbability = require('./src/cumulative_std_normal_probability');
ss.standardNormalTable = require('./src/standard_normal_table');
ss.errorFunction = ss.erf = require('./src/error_function');
ss.inverseErrorFunction = require('./src/inverse_error_function');
ss.probit = require('./src/probit');

// Root-finding methods
ss.bisect = require('./src/bisect');
