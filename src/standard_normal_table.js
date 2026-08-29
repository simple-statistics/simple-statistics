const SQRT_2PI = Math.sqrt(2 * Math.PI);

function cumulativeDistribution(z) {
    let sum = z;
    let tmp = z;

    // The series converges more slowly as z grows: 15 terms fall short of
    // 4-digit precision above z = 2.9. 30 terms converge across the whole
    // domain of the table below, which ends at z = 3.09.
    for (let i = 1; i < 30; i++) {
        tmp *= (z * z) / (2 * i + 1);
        sum += tmp;
    }
    return (
        Math.round((0.5 + (sum / SQRT_2PI) * Math.exp((-z * z) / 2)) * 1e4) /
        1e4
    );
}

/**
 * A standard normal table, also called the unit normal table or Z table,
 * is a mathematical table for the values of Φ (phi), which are the values of
 * the [cumulative distribution function](https://en.wikipedia.org/wiki/Normal_distribution#Cumulative_distribution_function)
 * of the normal distribution. It is used to find the probability that a
 * statistic is observed below, above, or between values on the standard
 * normal distribution, and by extension, any normal distribution.
 */
const standardNormalTable = [];

for (let z = 0; z <= 3.09; z += 0.01) {
    standardNormalTable.push(cumulativeDistribution(z));
}

export default standardNormalTable;
