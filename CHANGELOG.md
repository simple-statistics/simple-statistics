# CHANGELOG

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
