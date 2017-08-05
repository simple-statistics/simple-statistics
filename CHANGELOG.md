# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="4.1.1"></a>
## [4.1.1](https://github.com/simple-statistics/simple-statistics/compare/v4.1.0...v4.1.1) (2017-08-05)


### Bug Fixes

* expose BayesianClassifier & PerceptronModel instead of bayesian and perceptron ([1d03671](https://github.com/simple-statistics/simple-statistics/commit/1d03671))



<a name="4.1.0"></a>
# [4.1.0](https://github.com/simple-statistics/simple-statistics/compare/v4.0.0...v4.1.0) (2017-04-27)


### Features

* sampleKurtosis ([1d9eec2](https://github.com/simple-statistics/simple-statistics/commit/1d9eec2))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/simple-statistics/simple-statistics/compare/v3.0.0...v4.0.0) (2017-04-25)


### Bug Fixes

* Remove mixin method ([#215](https://github.com/simple-statistics/simple-statistics/issues/215)) ([85036e2](https://github.com/simple-statistics/simple-statistics/commit/85036e2)), closes [#211](https://github.com/simple-statistics/simple-statistics/issues/211)


### Performance Improvements

* **binomialDistribution:** avoid expensive factorial calculations ([#205](https://github.com/simple-statistics/simple-statistics/issues/205)) ([525f9c0](https://github.com/simple-statistics/simple-statistics/commit/525f9c0))
* **core:** Improve performance of min, max, sumNthPowerDeviations, variance, sampleVariance ([#195](https://github.com/simple-statistics/simple-statistics/issues/195)) ([9d2569a](https://github.com/simple-statistics/simple-statistics/commit/9d2569a))
* **distributions:** return array instead of object ([#209](https://github.com/simple-statistics/simple-statistics/issues/209)) ([6c5df5f](https://github.com/simple-statistics/simple-statistics/commit/6c5df5f))
* **poissonDistribution:** avoid expensive factorial calculation ([#206](https://github.com/simple-statistics/simple-statistics/issues/206)) ([b34aceb](https://github.com/simple-statistics/simple-statistics/commit/b34aceb))
* **poissonDistribution:** use Math.exp instead of Math.pow ([#208](https://github.com/simple-statistics/simple-statistics/issues/208)) ([6491dfa](https://github.com/simple-statistics/simple-statistics/commit/6491dfa))
* **sampleSkewness:** Improve sampleSkewness performance ([#197](https://github.com/simple-statistics/simple-statistics/issues/197)) ([03d37eb](https://github.com/simple-statistics/simple-statistics/commit/03d37eb))
* **sum:** Switch from Kahan to Kahan-Babuska algorithm ([1b42d7f](https://github.com/simple-statistics/simple-statistics/commit/1b42d7f))


### BREAKING CHANGES

* Removes .mixin(). Instead use simple-statistics in a functional style.
* **distributions:** The return value of bernoulliDistribution, binomialDistribution, and poissonDistribution is no longer an Object with number keys, it is now an Array of numbers.



<a name="3.0.0"></a>
# [3.0.0](https://github.com/simple-statistics/simple-statistics/compare/v2.5.0...v3.0.0) (2017-04-06)

**Breaking change**: before this release, simple-statistics would return `NaN`
when provided with invalid input. After 3.0.0, simple-statistics will throw
exceptions when provided with invalid input. If you previously used `isNaN` to
test for these error cases, switch to using `try` and `catch`, or make sure
that valid input is given to simple-statistics.

### Features

* **mean:** combineMeans, a method for combining calculated means ([d9e3ebc](https://github.com/simple-statistics/simple-statistics/commit/d9e3ebc))
* **mean:** subtractFromMean, a method to remove a value from the mean ([afe76e9](https://github.com/simple-statistics/simple-statistics/commit/afe76e9))
* **variance:** combineVariances, a method for combining pre-calculated variances of two dataset ([68133f7](https://github.com/simple-statistics/simple-statistics/commit/68133f7))



<a name="2.5.0"></a>
# [2.5.0](https://github.com/simple-statistics/simple-statistics/compare/v2.4.0...v2.5.0) (2017-02-24)


### Features

* **mean:** addToMean, a method to update an mean with a new element ([b6637b4](https://github.com/simple-statistics/simple-statistics/commit/b6637b4))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/simple-statistics/simple-statistics/compare/v2.3.0...v2.4.0) (2017-02-22)


### Bug Fixes

* **build:** Ignore conventional-changelog-core for Flow ([4874868](https://github.com/simple-statistics/simple-statistics/commit/4874868))

### Features

* **mode:** Implement modeFast, an indexed mode implementation (#183) ([59b7191](https://github.com/simple-statistics/simple-statistics/commit/59b7191))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/simple-statistics/simple-statistics/compare/v2.2.0...v2.3.0) (2017-02-17)


### Features

* **core:** sampleWithReplacement (#174) ([a8d05d1](https://github.com/simple-statistics/simple-statistics/commit/a8d05d1))



# CHANGELOG

## 2.2.0

* Improved [Ckmeans](https://github.com/simple-statistics/simple-statistics/pull/163) algorithm
  from the [updated R project](https://cran.r-project.org/web/packages/Ckmeans.1d.dp/NEWS)
  that dramatically increases performance.
* Adds `permutationHeap` method for computing all permutations of an array.
* Adds `combinations` for combinations without replacement
* Adds `combinationsReplacement` for combinations with replacement

## 2.1.0

* Adds `bisect` method that implements the [bisection method](https://en.wikipedia.org/wiki/Bisection_method)
  for root-finding. Thanks [Jamie Neubert Pedersen](https://github.com/eikooc)
  for the contribution!

## 2.0.0

New features:

* `product`: returns the product of a series of numbers
* `medianSorted`: exposes the internal method of `median`
  that only operates on sorted arrays and works in constant time
* `modeSorted`: exposes the internal method of `mode` and works
  in linear time.

Specifications:

* Adds [Flow](http://flowtype.org/) annotations to all methods, allowing
  up-front typechecking if you use Flow in your application.

Changes:

* Invalid input now uniformly produces the value `NaN` instead
  of previously a mix of `null` and `undefined`.
* The method `sortedUniqueCount` is now called `uniqueCountSorted` to
  match the other sorted methods, `medianSorted` and `modeSorted`

Fixes:

* `equalIntervalBreaks` was not exported by `index.js`, and now is.

## 1.0.1

Fixes:

* Fixes to ckmeans algorithm (thanks to @llimllib) (#125)

Housekeeping:

* Add keywords to package. Fixes #120
* Standardize indentation, add example for epsilon
* Browser testing with Sauce Labs

Bundle size optimizations:

* Add external sourcemaps for minified and unminified standalone bundles
* Use bundle-collapser for smaller bundles
* Indicate numericSort as an internal method.

## 1.0.0

### Breaking Changes

* Removed the .m() and .b() shortcuts from the linear regression
  class. Use `.mb().b` and `.mb().m` instead.
* linearRegression is now a function, and linearRegressionLine is a separate
  function.

**UPGRADING**

#### Linear Regression

Before:

```js
var l = ss.linear_regression().data([[0, 0], [1, 1]]);
l.line()(0); // 0
```

After:

```js
var line = ss.linearRegressionLine(ss.linearRegression([[0, 0], [1, 1]]));
line(0); // 0
```

#### Jenks -> ckmeans

The implementation of Jenks natural breaks was removed: an implementation
of Ckmeans, an improvement on its technique, is added. Ckmeans should
work better for nearly all Jenks usecases.

Before:

```js
ss.jenks([1, 2, 4, 5, 7, 9, 10, 20], 3) //= [1, 7, 20, 20]
```

After:

```js
ss.ckmeans([1, 2, 4, 5, 7, 9, 10, 20], 3))

[ [ 1,
    2,
    4,
    5,
    7,
    9 ],
  [ 10 ],
  [ 20 ] ]
```

Instead of class breaks, ckmeans returns clustered data. Class breaks
can be derived by taking the first value from each cluster:

```js
var breaks = ss.ckmeans([1, 2, 4, 5, 7, 9, 10, 20], 3)).map(function(cluster) {
  return cluster[0];
});
```

* `BayesModel` is now a class
* `PerceptronModel` is now a class, and the `weights` and `bias` members
  are accessable as properties rather than methods.
* All multi-word method names are now camelCase rather than underscore_cased:
  this means that a method like `ss.r_squared` is now accessible as `ss.rSquared`

### New Features

* Ckmeans replaces Jenks
* `sortedUniqueCount` provides an extremely fast method for counting
  unique values of sorted arrays.
* `sumNthPowerDeviations` is now exposed, providing a simple way to calculate
  the fundamental aspect of measures like variance and skewness.

### Non-Breaking Changes

* JSDoc documentation throughout
* Each function is now its own file, and simple-statistics
  is assembled with CommonJS-style require() statements. simple-statistics can
  still be used in a browser with browserify.
* The standard normal table is now calculated using the cumulative distribution
  function, rather than hardcoded.

## 0.9.2

* Improved test coverage
* Switched linting from JSHint to [eslint](http://eslint.org/) and fixed
  style issues this uncovered.

## 0.9.1

* Fixes `.jenks` corner cases.

## 0.9.0

* Adds `.sample` for simple random sampling
* Adds `.shuffle` and `.shuffleInPlace` for random permutations
* Adds `.chunk` for splitting arrays into chunked subsets

## 0.8.1

* fixes a bug in `mode` that favored the last new number

## 0.8.0

* `mixin` can now take an array in order to mixin functions into a single array
  instance rather than the global Array prototype.

## 0.7.0

* Adds `simple_statistics.harmonicMean` thanks to [jseppi](https://github.com/jseppi)

## 0.6.0

* Adds `simple_statistics.quantileSorted` thanks to [rluta](http://github.com/rluta)
* `simple_statistics.quantile` now accepts a sorted list of quantiles as a second argument
* Improved test coverage

## 0.5.0

* Adds `simple_statistics.cumulativeStdNormalProbability` by [doronlinder](https://github.com/doronlinder)
* Adds `simple_statistics.zScore` by doronlinder
* Adds `simple_statistics.standardNormalTable`

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
* Adds `simple_statistics.geometricMean()`
* Adds `simple_statistics.sampleVariance()`
* Adds `simple_statistics.sampleCovariance()`

## 0.1.0

* Adds `simple_statistics.tTest()`
* Adds `simple_statistics.min()`
* Adds `simple_statistics.max()`
