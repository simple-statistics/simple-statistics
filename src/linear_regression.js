/**
 * [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
 * is a simple way to find a fitted line
 * between a set of coordinates. This algorithm finds the slope and y-intercept of a regression line
 * using the least sum of squares.
 *
 * @param {Array<Array<number>>} data an array of two-element of arrays,
 * like `[[0, 1], [2, 3]]`
 * @returns {Object} object containing slope, y-intercept, and Pearson correlation coefficient of regression line
 * @example
 * linearRegression([[0, 0], [1, 1]]); // => { m: 1, b: 0, r: 1 }
 */
function linearRegression(data) {
    let m;
    let b;
    let r;

    // Store data length in a local variable to reduce
    // repeated object property lookups
    const dataLength = data.length;

    // if there's only one point, arbitrarily choose a slope of 0,
    // a y-intercept of whatever the y of the initial point is, and r of 0
    if (dataLength === 1) {
        m = 0;
        b = data[0][1];
        r = 0;
    } else {
        // Initialize our sums and scope the `m`, `b`, and `r`
        // variables that define the line and correlation.
        let sumX = 0;
        let sumY = 0;
        let sumXX = 0;
        let sumYY = 0;
        let sumXY = 0;

        // Use local variables to grab point values
        // with minimal object property lookups
        let point;
        let x;
        let y;

        // Gather the sum of all x values, the sum of all
        // y values, and the sum of x^2, y^2, and (x*y) for each
        // value.
        for (let i = 0; i < dataLength; i++) {
            point = data[i];
            x = point[0];
            y = point[1];

            sumX += x;
            sumY += y;

            sumXX += x * x;
            sumYY += y * y;
            sumXY += x * y;
        }

        // `m` is the slope of the regression line
        m =
            (dataLength * sumXY - sumX * sumY) /
            (dataLength * sumXX - sumX * sumX);

        // `b` is the y-intercept of the line.
        b = sumY / dataLength - (m * sumX) / dataLength;

        // `r` is the Pearson correlation coefficient
        const denominator = Math.sqrt(
            (dataLength * sumXX - sumX * sumX) *
                (dataLength * sumYY - sumY * sumY)
        );

        // Prevent division by zero if all x or y values are identical
        r =
            denominator === 0
                ? 0
                : (dataLength * sumXY - sumX * sumY) / denominator;
    }

    // Return values as an object.
    return {
        m: m,
        b: b,
        r: r
    };
}

export default linearRegression;
