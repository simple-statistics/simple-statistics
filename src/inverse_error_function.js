import errorFunction from "./error_function.js";

const TWO_OVER_SQRT_PI = 2 / Math.sqrt(Math.PI);

/**
 * The Inverse [Gaussian error function](http://en.wikipedia.org/wiki/Error_function)
 * returns a numerical approximation to the value that would have caused
 * `errorFunction()` to return x.
 *
 * Winitzki's approximation supplies the initial estimate, which is then
 * refined by [Newton's method](https://en.wikipedia.org/wiki/Newton%27s_method)
 * against `errorFunction()`. The derivative of the error function is
 * `2 / sqrt(π) * exp(-x²)`.
 *
 * @param {number} x value of error function
 * @returns {number} estimated inverted value
 */
function inverseErrorFunction(x) {
    // `errorFunction` is off by a few parts in 1e8 at zero, so the
    // refinement below would walk the exact answer away from it.
    if (x === 0) {
        return 0;
    }

    const a = (8 * (Math.PI - 3)) / (3 * Math.PI * (4 - Math.PI));

    const logTerm = Math.log(1 - x * x);
    const halfLog = 2 / (Math.PI * a) + logTerm / 2;

    let estimate = Math.sqrt(
        Math.sqrt(halfLog * halfLog - logTerm / a) - halfLog
    );

    if (x < 0) {
        estimate = -estimate;
    }

    // At |x| >= 1 the estimate is already infinite or not a number, and
    // there is nothing for the refinement below to converge towards.
    if (!Number.isFinite(estimate)) {
        return estimate;
    }

    // Two Newton steps take the estimate from the roughly 1e-3 accuracy of
    // the approximation down to the accuracy of `errorFunction` itself.
    for (let i = 0; i < 2; i++) {
        const slope = TWO_OVER_SQRT_PI * Math.exp(-estimate * estimate);

        // Far out in the tails the slope underflows to zero, and a step
        // divided by it would be infinite. The estimate there is already
        // as close as this method can bring it.
        if (slope === 0) {
            break;
        }

        estimate -= (errorFunction(estimate) - x) / slope;
    }

    return estimate;
}

export default inverseErrorFunction;
