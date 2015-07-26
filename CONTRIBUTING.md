# Contribution Policy

## What?

Individuals making significant and valuable contributions are given commit-access
to a project to contribute as they see fit. A project is more like an
open wiki than a standard guarded open source project.

## Rules

There are a few basic ground-rules for contributors:

1. **No `--force` pushes** or modifying the Git history in any way.
1. **Non-master branches** ought to be used for ongoing work.
1. **External API changes and significant modifications** ought to be subject to an **internal pull-request** to solicit feedback from other contributors.
1. Internal pull-requests to solicit feedback are *encouraged* for any other non-trivial contribution but left to the discretion of the contributor.
1. Contributors should attempt to adhere to the prevailing code-style.

## Releases

Declaring formal releases remains the prerogative of the project maintainer(s).

## Changes to this arrangement

This is an experiment and feedback is welcome! This document may also be
subject to pull-requests or changes by contributors where you believe you have
something valuable to add or change.

This contribution policy is based on [The level organization Open Open Source Policy](https://github.com/Level/community/blob/master/CONTRIBUTING.md).

-----------------------------------------

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
/**
 * harmonic mean
 *
 * a mean function typically used to find the average of rates
 *
 * this is the reciprocal of the arithmetic mean of the reciprocals
 * of the input numbers
 *
 * This runs on `O(n)`, linear time in respect to the array
 */
```

`simple-statistics` tries to stay away from speaking only in the language of math:
for instance, while JavaScript supports UTF8 characters like π, they are not used
in the source:

* UTF8 in JavaScript on pages without specific meta-tag or Content-Type encodings will fail
* UTF8 can be hard to type, since users need to memorize key combinations or code points
* Mathematical symbols have meanings that are often better communicated by words:
  in the form of code, we do not run out of space on the paper, and can afford
  to call a variable `reciprocalSum` instead of `r`.

Every function has a comment that ideally includes:

* The English, long-form name of the method
* What the method does
* What purpose the method typically serves
* A link to a longer description on Wikipedia, Mathematica, or another
  web-accessible, non-paywalled source
* The efficiency of the function in terms of Big-O notation, if appropriate

## Tests

`simple-statistics` has a testsuite located in `test/`. Each test file
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

Simple statistics maintains API documentation with [JSDoc](http://usejsdoc.org/) syntax
and the [documentation.js](https://github.com/documentationjs/documentation) generator.
Consult the JSDoc and [gettings started docs](https://github.com/documentationjs/documentation/blob/master/docs/GETTTING_STARTED.md) for
hints for how to document each function, or read other documentation comments
in `src` for inspiration.

## Code Style

We use the [Airbnb style for Javascript](https://github.com/airbnb/javascript) with
only one difference:

**4 space soft tabs always for Javascript, not 2.**

No aligned `=`, no aligned arguments, spaces are either indents or the 1
space between expressions. No hard tabs.

* All comparisons should be as strict and obvious as possible: prefer `(foo === 0)` to
  `(!foo)`.
* Straightforward code is more important than most optimizations.

