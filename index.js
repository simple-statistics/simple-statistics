// # simple-statistics
//
// A simple, literate statistics system.

// Linear Regression
export * from "./src/linear_regression";
export * from "./src/linear_regression_line";
export * from "./src/standard_deviation";
export * from "./src/r_squared";
export * from "./src/mode";
export * from "./src/mode_fast";
export * from "./src/mode_sorted";
export * from "./src/min";
export * from "./src/max";
export * from "./src/extent";
export * from "./src/min_sorted";
export * from "./src/max_sorted";
export * from "./src/extent_sorted";
export * from "./src/sum";
export * from "./src/sum_simple";
export * from "./src/product";
export * from "./src/quantile";
export * from "./src/quantile_sorted";
export * from "./src/quantile_rank";
export * from "./src/quantile_rank_sorted";
export * from "./src/interquartile_range";
export * from "./src/median_absolute_deviation";
export * from "./src/chunk";
export * from "./src/sample_with_replacement";
export * from "./src/shuffle";
export * from "./src/shuffle_in_place";
export * from "./src/sample";
export * from "./src/ckmeans";
export * from "./src/unique_count_sorted";
export * from "./src/sum_nth_power_deviations";
export * from "./src/equal_interval_breaks";

// sample statistics
export * from "./src/sample_covariance";
export * from "./src/sample_correlation";
export * from "./src/sample_variance";
export * from "./src/sample_standard_deviation";
export * from "./src/sample_skewness";
export * from "./src/sample_kurtosis";

// combinatorics
export * from "./src/permutations_heap";
export * from "./src/combinations";
export * from "./src/combinations_replacement";

// measures of centrality
export * from "./src/add_to_mean";
export * from "./src/combine_means";
export * from "./src/combine_variances";
export * from "./src/geometric_mean";
export * from "./src/harmonic_mean";
export * from "./src/mean";
export * from "./src/median";
export * from "./src/median_sorted";
export * from "./src/subtract_from_mean";

export * from "./src/root_mean_square";
export * from "./src/variance";
export * from "./src/t_test";
export * from "./src/t_test_two_sample";
// ss.jenks = require('./src/jenks');

// Classifiers
export * from "./src/bayesian_classifier";
export * from "./src/perceptron";

// Distribution-related methods
export * from "./src/epsilon"; // We make ε available to the test suite.
export * from "./src/factorial";
export * from "./src/gamma";
export * from "./src/gammaln";
export * from "./src/bernoulli_distribution";
export * from "./src/binomial_distribution";
export * from "./src/poisson_distribution";
export * from "./src/chi_squared_distribution_table";
export * from "./src/chi_squared_goodness_of_fit";
export * from "./src/kernel_density_estimation";

// Normal distribution
export * from "./src/z_score";
export * from "./src/cumulative_std_normal_probability";
export * from "./src/standard_normal_table";
export * from "./src/error_function";
export * from "./src/inverse_error_function";
export * from "./src/probit";

// Non-parametric Methods
export * from "./src/permutation_test";

// Root-finding methods
export * from "./src/bisect";

// Utils
export * from "./src/quickselect";
export * from "./src/sign";
export * from "./src/numeric_sort";
