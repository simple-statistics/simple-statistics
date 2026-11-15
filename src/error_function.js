// Below this the series is used: at 0.5 its terms shrink by a factor of
// four or more each step, so twenty of them reach full double precision.
const SERIES_LIMIT = 0.5;

/**
 * **[Gaussian error function](http://en.wikipedia.org/wiki/Error_function)**
 *
 * The `errorFunction(x/(sd * Math.sqrt(2)))` is the probability that a value in a
 * normal distribution with standard deviation sd is within x of the mean.
 *
 * This function returns a numerical approximation to the exact value.
 * It uses Horner's method to evaluate the polynomial of τ (tau).
 * Below 0.5 in size it sums the Maclaurin series instead.
 *
 * @param {number} x input
 * @return {number} error estimation
 * @example
 * errorFunction(1).toFixed(2); // => '0.84'
 */
function errorFunction(x) {
    // The approximation further down is only good to about 1e-7 in
    // absolute terms. Near zero that is bigger than the answer itself:
    // errorFunction(0) came out as -3e-8 and errorFunction(1e-9) was
    // negative. Sum the Maclaurin series there instead,
    // erf(x) = 2 / sqrt(pi) * (x - x^3 / 3 + x^5 / 10 - x^7 / 42 + ...),
    // whose n-th term is (-1)^n * x^(2n + 1) / (n! * (2n + 1)).
    if (Math.abs(x) < SERIES_LIMIT) {
        // `power` holds (-1)^n * x^(2n + 1) / n!
        let power = x;
        let sum = x;
        for (let n = 1; n < 20; n++) {
            power *= (-x * x) / n;
            sum += power / (2 * n + 1);
        }
        return (2 / Math.sqrt(Math.PI)) * sum;
    }

    const t = 1 / (1 + 0.5 * Math.abs(x));
    const tau =
        t *
        Math.exp(
            -x * x +
                ((((((((0.17087277 * t - 0.82215223) * t + 1.48851587) * t -
                    1.13520398) *
                    t +
                    0.27886807) *
                    t -
                    0.18628806) *
                    t +
                    0.09678418) *
                    t +
                    0.37409196) *
                    t +
                    1.00002368) *
                    t -
                1.26551223
        );
    if (x >= 0) {
        return 1 - tau;
    } else {
        return tau - 1;
    }
}

export default errorFunction;
