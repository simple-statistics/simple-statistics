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
ss.min = require('./src/min');
ss.max = require('./src/max');
ss.sum = require('./src/sum');
ss.quantile = require('./src/quantile');
ss.quantileSorted = require('./src/quantile_sorted');
ss.iqr = ss.interquartileRange = require('./src/interquartile_range');
ss.medianAbsoluteDeviation = ss.mad = require('./src/mad');
ss.chunk = require('./src/chunk');
ss.shuffle = require('./src/shuffle');
ss.shuffleInPlace = require('./src/shuffle_in_place');
ss.sample = require('./src/sample');
ss.ckmeans = require('./src/ckmeans');
ss.sortedUniqueCount = require('./src/sorted_unique_count');
ss.sumNthPowerDeviations = require('./src/sum_nth_power_deviations');

// sample statistics
ss.sampleCovariance = require('./src/sample_covariance');
ss.sampleCorrelation = require('./src/sample_correlation');
ss.sampleVariance = require('./src/sample_variance');
ss.sampleStandardDeviation = require('./src/sample_standard_deviation');
ss.sampleSkewness = require('./src/sample_skewness');

// measures of centrality
ss.geometricMean = require('./src/geometric_mean');
ss.harmonicMean = require('./src/harmonic_mean');
ss.mean = ss.average = require('./src/mean');
ss.median = require('./src/median');

ss.rootMeanSquare = ss.rms = require('./src/root_mean_square');
ss.variance = require('./src/variance');
ss.tTest = require('./src/t_test');
ss.tTestTwoSample = require('./src/t_test_two_sample');
// ss.jenks = require('./src/jenks');

// Classifiers
ss.bayesian = require('./src/bayesian_classifier');
ss.perceptron = require('./src/perceptron');

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
ss.mixin = require('./src/mixin');
