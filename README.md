# Simple Statistics


A JavaScript implementation of descriptive, regression, and inference statistics.

[![Circle CI](https://circleci.com/gh/simple-statistics/simple-statistics/tree/master.svg?style=shield)](https://circleci.com/gh/simple-statistics/simple-statistics/tree/master)
[![codecov.io](https://codecov.io/github/simple-statistics/simple-statistics/coverage.svg?branch=master)](https://codecov.io/github/simple-statistics/simple-statistics?branch=master)
[![npm version](https://badge.fury.io/js/simple-statistics.svg)](http://badge.fury.io/js/simple-statistics)
[![Greenkeeper badge](https://badges.greenkeeper.io/simple-statistics/simple-statistics.svg)](https://greenkeeper.io/)

Implemented in literate JavaScript with no dependencies, designed to work
in all modern browsers (including IE) as well as in [node.js](https://nodejs.org/).

* :green_book: [API Documentation](http://simplestatistics.org/docs/)
* :chart_with_upwards_trend: [Benchmarks](./benchmarks/)
* :kissing: [A list of other statistics libraries](./SEEALSO.md)

## Installation

* **I'm using Node.js, Webpack, Browserify, Rollup, or another module bundler,
  and install packages from npm.**
  * First, install the `simple-statistics` module, using `npm install simple-statistics`,
    then include the code with require or import:
  * **I use the `require` function to use modules in my project. (most likely)**
    * When you use `require`, you have the freedom to assign the module to any
      variable name you want, but you need to specify the module's name exactly:
      in this case, 'simple-statistics'. The `require` method returns an object
      with all of the module's methods attached to it.<br /> <pre>var ss = require('simple-statistics')</pre>
  * **I use `import` to use modules in my project. I'm probably using Babel, Webpack, or Rollup.**
    * This module only supports the 'default' export when you're using ES6 module:
      so you can import all of its methods, attached to an object, like in
      this example. Importing specific methods will work in Babel, but not
      in Rollup.<br /> <pre>import ss from 'simple-statistics';</pre>
* **I'm not using a module bundler. I'm writing a web page, and want to include
  simple-statistics using a script tag.**
  * When you use simple-statistics from a script tag, you don't get to choose
    the variable name it is assigned to: simple-statistics will always become
    available globally as the variable `ss`. You can reassign this variable to
    another name if you want to, but doing so is optional. <pre><script src='https://unpkg.com/simple-statistics@4.1.1/dist/simple-statistics.js' /></pre>
    There are two options for the `src` attribute of that script tag: one with
    `.min.js` that is compressed, and the other without, that is raw.
    * `https://unpkg.com/simple-statistics@4.1.1/dist/simple-statistics.js`
    * `https://unpkg.com/simple-statistics@4.1.1/dist/simple-statistics.min.js`
