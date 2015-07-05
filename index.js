'use strict';

// # simple-statistics
//
// A simple, literate statistics system.

var ss = module.exports = {};

ss.linearRegression = require('./src/linear_regression');
ss.linearRegressionLine = require('./src/linear_regression_line');
ss.standard_deviation = require('./src/standard_deviation');
ss.r_squared = require('./src/r_squared');
ss.median = require('./src/median');
ss.mean = ss.average = require('./src/mean');
ss.mode = require('./src/mode');
ss.min = require('./src/min');
ss.max = require('./src/max');
ss.sum = require('./src/sum');
ss.quantile = require('./src/quantile');
ss.quantile_sorted = require('./src/quantile_sorted');
ss.iqr = ss.interquartile_range = require('./src/interquartile_range');
ss.median_absolute_deviation = ss.mad = require('./src/mad');

ss.chunk = require('./src/chunk');
ss.shuffle = require('./src/shuffle');
ss.shuffle_in_place = require('./src/shuffle_in_place');

ss.sample = require('./src/sample');

ss.sample_covariance = require('./src/sample_covariance');
ss.sample_correlation = require('./src/sample_correlation');
ss.sample_variance = require('./src/sample_variance');
ss.sample_standard_deviation = require('./src/sample_standard_deviation');
ss.sample_skewness = require('./src/sample_skewness');

ss.geometric_mean = require('./src/geometric_mean');
ss.harmonic_mean = require('./src/harmonic_mean');
ss.root_mean_square = ss.rms = require('./src/root_mean_square');
ss.variance = require('./src/variance');
ss.t_test = require('./src/t_test');
ss.t_test_two_sample = require('./src/t_test_two_sample');

// jenks
ss.jenksMatrices = require('./src/jenks_matrices');
ss.jenksBreaks = require('./src/jenks_breaks');
ss.jenks = require('./src/jenks');

ss.bayesian = require('./src/bayesian_classifier');

ss.perceptron = require('./src/perceptron');

// Distribution-related methods
ss.epsilon = require('./src/epsilon'); // We make ε available to the test suite.
ss.factorial = require('./src/factorial');
ss.bernoulli_distribution = require('./src/bernoulli_distribution');
ss.binomial_distribution = require('./src/binomial_distribution');
ss.poisson_distribution = require('./src/poisson_distribution');
ss.chi_squared_goodness_of_fit = require('./src/chi_squared_goodness_of_fit');

// Normal distribution
ss.z_score = require('./src/z_score');
ss.cumulative_std_normal_probability = require('./src/cumulative_std_normal_probability');
ss.standard_normal_table = require('./src/standard_normal_table');
ss.error_function = ss.erf = require('./src/error_function');
ss.inverse_error_function = require('./src/inverse_error_function');
ss.probit = require('./src/probit');

ss.mixin = require('./src/mixin');
