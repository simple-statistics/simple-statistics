---
"simple-statistics": minor
---

Fix `poissonDistribution()` and `binomialDistribution()` returning a truncated table ending in `Infinity` or `NaN`. Both built each cell from a power and a factorial (or a binomial coefficient) that leave floating-point range long before their product does, so the cumulative-probability stopping rule was satisfied by a non-finite sum instead of by the distribution: `poissonDistribution(200)` returned 135 cells covering 0.000045% of the distribution, and `binomialDistribution(10000, 0.5)` returned 135 cells covering none of it. Cells are now taken through `gammaln`, and a table that cannot be completed returns `undefined` rather than a partial one.

NOTE: this is tagged as a minor change but you should be aware that it does change behavior
for `binomialDistribution`. For most users this won't be a big deal.

1. Both functions now return `undefined` in cases where they used to return an array of non-finite cells. `binomialDistribution(5, NaN)` returned `[NaN]` and now returns `undefined`. Their TypeScript declarations widen to `number[] | undefined`.
2. Evaluating cells through logarithms costs a precision where the old product form was exact: `binomialDistribution(2, 0.5)` returns `[0.25000000000000006, 0.5000000000000006, 0.25000000000000006]` rather than `[0.25, 0.5, 0.25]`. This precision loss is small but if you're comparing exact results, it may require updates or rounding.
