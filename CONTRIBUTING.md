# Contributing to simple-statistics

Simple statistics is a statistics library that can be both used and read.
It should help programmers learn statistics and statisticians learn programming.
In order to achieve this goal, it must be **simple** and **explanatory**.

## Simple

`simple-statistics` is written in a subset of JavaScript. Unused features
include:

* [Conditional Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
* [ES5 Array methods](http://ie.microsoft.com/TestDrive/HTML5/ECMAScript5Array/Default.html)
* `with`, `eval`, and other forms of `eval`
* Most micro-optimizations, like [alternative for loop forms](http://jsperf.com/loops/70)
* [Shortcut branching](http://javascriptweblog.wordpress.com/2010/07/26/no-more-ifs-alternatives-to-statement-branching-in-javascript/)

## Explanatory

Example:

```js
// # harmonic mean
//
// a mean function typically used to find the average of rates
//
// this is the reciprocal of the arithmetic mean of the reciprocals
// of the input numbers
//
// This runs on `O(n)`, linear time in respect to the array
```

`simple-statistics` tries to stay away from speaking only in the language of math:
for instance, while JavaScript supports UTF8 characters like π, they are not used
in the source:

* UTF8 in JavaScript on pages without specific meta-tag or Content-Type encodings will fail
* UTF8 can be hard to type, since users need to memorize key combinations or code points
* Mathematical symbols have meanings that are often better communicated by words:
  in the form of code, we do not run out of space on the paper, and can afford
  to call a variable `reciprocal_sum` instead of `r`.

Every function has a comment that ideally includes:

* The English, long-form name of the method
* What the method does
* What purpose the method typically serves
* A link to a longer description on Wikipedia, Mathematica, or another
  web-accessible, non-paywalled source
* The efficiency of the function in terms of Big-O notation, if appropriate
* If the function depends on another function in the library, a note of this, like
  `depends on mean()`

## Tests

`simple-statistics` has a testsuite located in `test/spec/`. Each test file
covers a specific topic and tries to test against known values:

* Values produced by trusted statistics software like R or scipy
* Common-sense results

Tests can be run in [node.js](http://nodejs.org/) and are run on every commit
to GitHub by Travis-CI.

To run tests:

```sh
npm install
npm test
```

## Documentation

While the code is meant to readable, it is not documentation. We maintain
documentation in `API.md`, which has the simple form:

```md
### .geometric_mean(x)

[Geometric mean](http://en.wikipedia.org/wiki/Geometric_mean) of a single-dimensional array of **positive** numbers.
```

This file is written in [Markdown](https://daringfireball.net/projects/markdown/) and
specifies which functions are available, what type of arguments they receive,
what they compute, and what type of answer they return.

## Code Style

We use the [Airbnb style for Javascript](https://github.com/airbnb/javascript) with
only one difference:

**4 space soft tabs always for Javascript, not 2.**

No aligned `=`, no aligned arguments, spaces are either indents or the 1
space between expressions. No hard tabs.

* All comparisons should be as strict and obvious as possible: prefer `(foo === 0)` to
  `(!foo)`.
* Straightforward code is more important than most optimizations.
