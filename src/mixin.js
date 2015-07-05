'use strict';

// # Mixin
//
// Mixin simple_statistics to a single Array instance if provided
// or the Array native object if not. This is an optional
// feature that lets you treat simple_statistics as a native feature
// of Javascript.
function mixin(ss, array) {
    var support = !!(Object.defineProperty && Object.defineProperties);
    // Coverage testing will never test this error.
    /* istanbul ignore next */
    if (!support) throw new Error('without defineProperty, simple-statistics cannot be mixed in');

    // only methods which work on basic arrays in a single step
    // are supported
    var arrayMethods = ['median', 'standard_deviation', 'sum',
        'sample_skewness',
        'mean', 'min', 'max', 'quantile', 'geometric_mean',
        'harmonic_mean', 'root_mean_square'];

    // create a closure with a method name so that a reference
    // like `arrayMethods[i]` doesn't follow the loop increment
    function wrap(method) {
        return function() {
            // cast any arguments into an array, since they're
            // natively objects
            var args = Array.prototype.slice.apply(arguments);
            // make the first argument the array itself
            args.unshift(this);
            // return the result of the ss method
            return ss[method].apply(ss, args);
        };
    }

    // select object to extend
    var extending;
    if (array) {
        // create a shallow copy of the array so that our internal
        // operations do not change it by reference
        extending = array.slice();
    } else {
        extending = Array.prototype;
    }

    // for each array function, define a function that gets
    // the array as the first argument.
    // We use [defineProperty](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty)
    // because it allows these properties to be non-enumerable:
    // `for (var in x)` loops will not run into problems with this
    // implementation.
    for (var i = 0; i < arrayMethods.length; i++) {
        Object.defineProperty(extending, arrayMethods[i], {
            value: wrap(arrayMethods[i]),
            configurable: true,
            enumerable: false,
            writable: true
        });
    }

    return extending;
}

module.exports = mixin;
