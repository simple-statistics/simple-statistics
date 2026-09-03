/**
 * [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
 * is a simple way to find a fitted line
 * between a set of coordinates. This algorithm finds the slope and y-intercept of a regression line
 * using the least sum of squares.
 *
 * @param {Array<Array<number>>} data an array of two-element of arrays,
 * like `[[0, 1], [2, 3]]`
 * @returns {Object} object containing slope and intersect of regression line
 * @example
 * linearRegression([[0, 0], [1, 1]]); // => { m: 1, b: 0 }
 */
function linearRegression(data) {
    let m;
    let b;

    // Store data length in a local variable to reduce
    // repeated object property lookups
    const dataLength = data.length;

    //if there's only one point, arbitrarily choose a slope of 0
    //and a y-intercept of whatever the y of the initial point is
    if (dataLength === 1) {
        m = 0;
        b = data[0][1];
    } else {
        // The means of x and y. Centering on them before accumulating the
        // cross products keeps the sums small when the coordinates are not,
        // which is what `weightedLinearRegression` already does.
        let sumX = 0;
        let sumY = 0;
        for (let i = 0; i < dataLength; i++) {
            sumX += data[i][0];
            sumY += data[i][1];
        }
        const meanX = sumX / dataLength;
        const meanY = sumY / dataLength;

        let sumXY = 0;
        let sumXX = 0;
        for (let i = 0; i < dataLength; i++) {
            const deviationX = data[i][0] - meanX;
            sumXY += deviationX * (data[i][1] - meanY);
            sumXX += deviationX * deviationX;
        }

        // `m` is the slope of the regression line, `b` its y-intercept.
        m = sumXY / sumXX;
        b = meanY - m * meanX;
    }

    // Return both values as an object.
    return {
        m: m,
        b: b
    };
}

export default linearRegression;
