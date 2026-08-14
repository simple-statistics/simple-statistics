---
"simple-statistics": minor
---

Add `normalDistribution(x, mean, standardDeviation, cumulative)`, the equivalent of spreadsheet `NORM.DIST`. With `cumulative` false (the default) it returns the normal probability density, which the library previously had no function for; with `cumulative` true it returns the cumulative probability via `errorFunction`, avoiding the two-decimal z rounding and four-decimal table values that bound `cumulativeStdNormalProbability`'s precision.
