/**
 * Discrete distributions are tabulated cell by cell, and the Poisson
 * distribution has no upper bound at all, so their tables need a length we can
 * still allocate. Past this, `binomialDistribution` and `poissonDistribution`
 * report a distribution they cannot produce rather than a partial one.
 */
const maxDistributionCells = 1e6;

export default maxDistributionCells;
