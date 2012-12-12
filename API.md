Basic contracts of functions:

* Functions do not modify their arguments e.g. change their order
* Invalid input, like empty lists to functions that need 1+ items to work, will cause functions to return `null`.

# Basic Array Operations

### .mixin()

_Optionally_ mix in the following functions into the `Array` prototype. Otherwise
you can use them off of the simple-statistics object itself.

### .mean(x)

Mean of a single-dimensional Array of numbers.

### .sum(x)

Sum of a single-dimensional Array of numbers.

### .variance(x)

[Variance](http://en.wikipedia.org/wiki/Variance) of a single-dimensional Array of numbers.

### .standard_deviation(x)

[Standard Deviation](http://en.wikipedia.org/wiki/Standard_deviation) of a single-dimensional Array of numbers.

### .median(x)

[Median](http://en.wikipedia.org/wiki/Median) of a single-dimensional array of numbers.

### .geometric_mean(x)

[Geometric mean](http://en.wikipedia.org/wiki/Geometric_mean) of a single-dimensional array of **positive** numbers.

### .min(x)

Finds the minimum of a single-dimensional array of numbers. This runs in linear `O(n)` time.

### .max(x)

Finds the maximum of a single-dimensional array of numbers. This runs in linear `O(n)` time.


### .t_test(sample, x)

Does a [student's t-test](http://en.wikipedia.org/wiki/Student's_t-test) of a dataset `sample`, represented by a single-dimensional array of numbers. `x` is the known value, and the result is a measure of [statistical significance](http://en.wikipedia.org/wiki/Statistical_significance).

### .quantile(sample, p)

Does a [quantile](http://en.wikipedia.org/wiki/Quantile) of a dataset `sample`,
at p. For those familiary with the `k/q` syntax, `p == k/q`. `sample` must
be a single-dimensional array of numbers, and p must be a number greater
than zero and less than one.

### .r_squared(data, function)

Find the [r-squared](http://en.wikipedia.org/wiki/Coefficient_of_determination) value of a particular dataset, expressed as a two-dimensional `Array` of numbers, against a `Function`.

    var r_squared = ss.r_squared([[1, 1]], function(x) { return x * 2; });

## Regression

### .linear_regression()

Create a new linear regression solver.

#### .data([[1, 1], [2, 2]])

Set the data of a linear regression. The input is a two-dimensional array of numbers, which are treated as coordinates, like `[[x, y], [x1, y1]]`.

#### .line()

Get the linear regression line: this returns a function that you can give `x` values and it will return `y` values.

    var linear_regression_line = ss.linear_regression()
        .data([[0, 1], [2, 2], [3, 3]]).line();
    linear_regression_line(5);

## Classification

### .bayesian()

Create a bayesian classifier.

### .train(item, category)

Train the classifier to classify a certain item, given as an object with keys,
to be in a certain category, given as a string.

### .score(item)

Get the classifications of a certain item, given as an object of
`category -> score` mappings.

    var bayes = ss.bayesian();
    bayes.train({ species: 'Cat' }, 'animal');
    bayes.score({ species: 'Cat' });
    // { animal: 1 }
