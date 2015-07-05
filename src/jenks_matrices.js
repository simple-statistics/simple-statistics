'use strict';

// ## Compute Matrices for Jenks
//
// Compute the matrices required for Jenks breaks. These matrices
// can be used for any classing of data with `classes <= n_classes`
function jenksMatrices(data, n_classes) {

    // in the original implementation, these matrices are referred to
    // as `LC` and `OP`
    //
    // * lower_class_limits (LC): optimal lower class limits
    // * variance_combinations (OP): optimal variance combinations for all classes
    var lower_class_limits = [],
        variance_combinations = [],
        // loop counters
        i, j,
        // the variance, as computed at each step in the calculation
        variance = 0;

    // Initialize and fill each matrix with zeroes
    for (i = 0; i < data.length + 1; i++) {
        var tmp1 = [], tmp2 = [];
        // despite these arrays having the same values, we need
        // to keep them separate so that changing one does not change
        // the other
        for (j = 0; j < n_classes + 1; j++) {
            tmp1.push(0);
            tmp2.push(0);
        }
        lower_class_limits.push(tmp1);
        variance_combinations.push(tmp2);
    }

    for (i = 1; i < n_classes + 1; i++) {
        lower_class_limits[1][i] = 1;
        variance_combinations[1][i] = 0;
        // in the original implementation, 9999999 is used but
        // since Javascript has `Infinity`, we use that.
        for (j = 2; j < data.length + 1; j++) {
            variance_combinations[j][i] = Infinity;
        }
    }

    for (var l = 2; l < data.length + 1; l++) {

        // `SZ` originally. this is the sum of the values seen thus
        // far when calculating variance.
        var sum = 0,
            // `ZSQ` originally. the sum of squares of values seen
            // thus far
            sum_squares = 0,
            // `WT` originally. This is the number of
            w = 0,
            // `IV` originally
            i4 = 0;

        // in several instances, you could say `Math.pow(x, 2)`
        // instead of `x * x`, but this is slower in some browsers
        // introduces an unnecessary concept.
        for (var m = 1; m < l + 1; m++) {

            // `III` originally
            var lower_class_limit = l - m + 1,
                val = data[lower_class_limit - 1];

            // here we're estimating variance for each potential classing
            // of the data, for each potential number of classes. `w`
            // is the number of data points considered so far.
            w++;

            // increase the current sum and sum-of-squares
            sum += val;
            sum_squares += val * val;

            // the variance at this point in the sequence is the difference
            // between the sum of squares and the total x 2, over the number
            // of samples.
            variance = sum_squares - (sum * sum) / w;

            i4 = lower_class_limit - 1;

            if (i4 !== 0) {
                for (j = 2; j < n_classes + 1; j++) {
                    // if adding this element to an existing class
                    // will increase its variance beyond the limit, break
                    // the class at this point, setting the `lower_class_limit`
                    // at this point.
                    if (variance_combinations[l][j] >=
                        (variance + variance_combinations[i4][j - 1])) {
                        lower_class_limits[l][j] = lower_class_limit;
                        variance_combinations[l][j] = variance +
                            variance_combinations[i4][j - 1];
                    }
                }
            }
        }

        lower_class_limits[l][1] = 1;
        variance_combinations[l][1] = variance;
    }

    // return the two matrices. for just providing breaks, only
    // `lower_class_limits` is needed, but variances can be useful to
    // evaluate goodness of fit.
    return {
        lower_class_limits: lower_class_limits,
        variance_combinations: variance_combinations
    };
}

module.exports = jenksMatrices;
