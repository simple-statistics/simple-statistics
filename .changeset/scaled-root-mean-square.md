---
"simple-statistics": minor
---

Add `scaledRootMeanSquare`, an equivalent way of computing the root mean square for values whose squares leave floating point range. `rootMeanSquare` sums the squares directly, so it returns `Infinity` above roughly 1e154 and `0` below roughly 1e-162. The new function divides through by the largest magnitude first. `rootMeanSquare` is unchanged, following the same split as `geometricMean` and `logAverage`.
