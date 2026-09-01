---
"simple-statistics": patch
---

Fix `linearRegression` losing precision when the x values share a large offset. The one-pass normal equations subtract two large and nearly equal quantities, so cancellation destroys the variance: on a perfect line the slope came back 22% low for x near 1e8, changed sign at 1e9, and was `Infinity` at 1e10. Timestamps reach this in ordinary use, and with `Date.now()` as x the slope was 69% wrong. The cross products are now accumulated from deviations about the means, which is what `weightedLinearRegression` and `sampleVariance` already do, at the cost of a second pass over the data. `weightedLinearRegression` documents `linearRegression` as the special case where every weight is equal; the two disagreed at large x and now agree.
