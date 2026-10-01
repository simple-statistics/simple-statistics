import gammaln from "./gammaln.js";

const MAX_ITERATIONS = 200;
const EPSILON = 3e-12;
// Smallest positive value that keeps the continued fraction away from a
// division by zero without perturbing the result.
const TINY = 1e-300;

/**
 * Evaluate the continued fraction used by the regularized incomplete beta
 * function, with the modified Lentz algorithm.
 *
 * @private
 * @param {number} a first shape parameter
 * @param {number} b second shape parameter
 * @param {number} x point at which to evaluate, in [0, 1]
 * @returns {number} the value of the continued fraction
 */
function betaContinuedFraction(a, b, x) {
    const qab = a + b;
    const qap = a + 1;
    const qam = a - 1;

    let c = 1;
    let d = 1 - (qab * x) / qap;
    if (Math.abs(d) < TINY) {
        d = TINY;
    }
    d = 1 / d;
    let h = d;

    for (let m = 1; m <= MAX_ITERATIONS; m++) {
        const m2 = 2 * m;

        // even step of the recurrence
        let numerator = (m * (b - m) * x) / ((qam + m2) * (a + m2));
        d = 1 + numerator * d;
        if (Math.abs(d) < TINY) {
            d = TINY;
        }
        c = 1 + numerator / c;
        if (Math.abs(c) < TINY) {
            c = TINY;
        }
        d = 1 / d;
        h *= d * c;

        // odd step of the recurrence
        numerator = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
        d = 1 + numerator * d;
        if (Math.abs(d) < TINY) {
            d = TINY;
        }
        c = 1 + numerator / c;
        if (Math.abs(c) < TINY) {
            c = TINY;
        }
        d = 1 / d;

        const delta = d * c;
        h *= delta;

        if (Math.abs(delta - 1) < EPSILON) {
            return h;
        }
    }

    return h;
}

/**
 * The [regularized incomplete beta function](https://en.wikipedia.org/wiki/Beta_function#Incomplete_beta_function),
 * `I_x(a, b)`.
 *
 * This is an internal helper: it exists so that Student's t probabilities can
 * be computed exactly rather than read off a table. The continued fraction
 * converges quickly on the side where `x` is small, so the identity
 * `I_x(a, b) = 1 - I_{1-x}(b, a)` is used to pick that side.
 *
 * @private
 * @param {number} a first shape parameter, greater than zero
 * @param {number} b second shape parameter, greater than zero
 * @param {number} x point at which to evaluate, in [0, 1]
 * @returns {number} the regularized incomplete beta function at x
 */
function incompleteBeta(a, b, x) {
    if (x <= 0) {
        return 0;
    }
    if (x >= 1) {
        return 1;
    }

    // Computed in log space: the factorial-like terms overflow well before
    // the result itself does.
    const front = Math.exp(
        gammaln(a + b) -
            gammaln(a) -
            gammaln(b) +
            a * Math.log(x) +
            b * Math.log(1 - x)
    );

    return x < (a + 1) / (a + b + 2)
        ? (front * betaContinuedFraction(a, b, x)) / a
        : 1 - (front * betaContinuedFraction(b, a, 1 - x)) / b;
}

export default incompleteBeta;
