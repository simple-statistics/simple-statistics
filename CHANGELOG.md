# CHANGELOG

## 1.0.0

* JSDoc documentation throughout
* Each function is now its own file, and simple-statistics
  is assembled with CommonJS-style require() statements. It can
  still be used in a browser with browserify.
* Removed the .m() and .b() shortcuts from the linear regression
  class. Use `.mb().b` and `.mb().m` instead.
* linearRegression is now a function, and linearRegressionLine is a separate
  function.
* `BayesModel` is now a class
* `PerceptronModel` is now a class, and the `weights` and `bias` members
  are accessable as properties rather than methods.

## 0.9.2

* Improved test coverage
* Switched linting from JSHint to [eslint](http://eslint.org/) and fixed
  style issues this uncovered.

## 0.9.1

* Fixes `.jenks` corner cases.

## 0.9.0

* Adds `.sample` for simple random sampling
* Adds `.shuffle` and `.shuffle_in_place` for random permutations
* Adds `.chunk` for splitting arrays into chunked subsets

## 0.8.1

* fixes a bug in `mode` that favored the last new number

## 0.8.0

* `mixin` can now take an array in order to mixin functions into a single array
  instance rather than the global Array prototype.

## 0.7.0

* Adds `simple_statistics.harmonic_mean` thanks to [jseppi](https://github.com/jseppi)

## 0.6.0

* Adds `simple_statistics.quantile_sorted` thanks to [rluta](http://github.com/rluta)
* `simple_statistics.quantile` now accepts a sorted list of quantiles as a second argument
* Improved test coverage

## 0.5.0

* Adds `simple_statistics.cumulative_std_normal_probability` by [doronlinder](https://github.com/doronlinder)
* Adds `simple_statistics.z_score` by doronlinder
* Adds `simple_statistics.standard_normal_table`

## 0.4.0

* Adds `simple_statistics.median_absolute_deviation()` by siculars
* Adds `simple_statistics.iqr()` by siculars
* Adds `simple_statistics.skewness()` by Doron Linder
* Lower-level accessors for linear regression allow users to do the line
  equation themselves

## 0.3.0

* Adds `simple_statistics.jenks()`
* Adds `simple_statistics.jenksMatrices()`
* Improves test coverage and validation

## 0.2.0

* Adds `simple_statistics.quantile()`
* Adds `simple_statistics.mixin()`
* Adds `simple_statistics.geometric_mean()`
* Adds `simple_statistics.sample_variance()`
* Adds `simple_statistics.sample_covariance()`

## 0.1.0

* Adds `simple_statistics.t_test()`
* Adds `simple_statistics.min()`
* Adds `simple_statistics.max()`
