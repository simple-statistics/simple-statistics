---
"simple-statistics": patch
---

Fix `poissonDistribution()` and `binomialDistribution()` returning a truncated table ending in `Infinity` or `NaN`. Both built each cell from a power and a factorial (or a binomial coefficient) that leave floating-point range long before their product does, so the cumulative-probability stopping rule was satisfied by a non-finite sum instead of by the distribution: `poissonDistribution(200)` returned 135 cells covering 0.000045% of the distribution, and `binomialDistribution(10000, 0.5)` returned 135 cells covering none of it. Cells are now taken through `gammaln`, and a table that cannot be completed returns `undefined` rather than a partial one.
