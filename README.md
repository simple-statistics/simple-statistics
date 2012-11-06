[![Build Status](https://secure.travis-ci.org/tmcw/simple-statistics.png?branch=master)](http://travis-ci.org/tmcw/simple-statistics)

A project to learn about and make simple reference implementations
of statistics algorithms.

This code is designed to work in browsers (including IE)
as well as in node.js.

```javascript
// Require simple statistics
var ss = require('simple-statistics');

// The input is a simple array
var list = [1, 2, 3];

// Many different descriptive statistics are supported
var sum = ss.sum(list),
    mean = ss.mean(list),
    min = ss.min(list),
    max = ss.min(list),
    quantile = ss.quantile(0.25);

// For a linear regression, it's a two-dimensional array
var data = [ [1, 2], [2, 3] ];

// simple-statistics can produce a linear regression and return
// a friendly javascript function for the line.
var line = ss.linear_regression()
    .data(data)
    .line();

// get a point along the line function
line(0);

var line = ss.linear_regression()

// Get the r-squared value of the line estimation
ss.r_squared(data, line);
```

## Examples

* [Linear regression with simple-statistics and d3js](http://bl.ocks.org/3931800)

## Usage

To use it in browsers, grab [simple_statistics.js](https://raw.github.com/tmcw/simple-statistics/master/src/simple_statistics.js).
To use it in node, install it with [npm](https://npmjs.org/) or add it to your package.json.

    npm install simple-statistics

To use it with [component](https://github.com/component/component),

    component install tmcw/simple-statistics

# [Documentation](https://github.com/tmcw/simple-statistics/blob/master/API.md)
# [Tests](http://travis-ci.org/#!/tmcw/simple-statistics)

# Contributors

* Tom MacWright
* [Matt Sacks](https://github.com/mattsa)

## See Also

* [stream-statistics](https://github.com/tmcw/stream-statistics), a sister project that implements
  many of the same measures for streaming data - as online algorithms

### Javascript

* [science.js](https://github.com/jasondavies/science.js)
* [atoll.js](https://github.com/nsfmc/atoll.js)
* [descriptive_statistics](https://github.com/thirtysixthspan/descriptive_statistics)
* [jStat](http://www.jstat.org/)
* [classifier](https://github.com/harthur/classifier) is a naive bayesian classifier (though specialized for the words-spam case)

### Python

* [Pandas](http://pandas.pydata.org/)
* [SciPy](http://www.scipy.org/)

### Their Own Language

* [Julia Language](http://julialang.org/)
* [R language](http://www.r-project.org/)
