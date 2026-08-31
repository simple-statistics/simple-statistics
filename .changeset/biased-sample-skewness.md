---
"simple-statistics": minor
---

`sampleSkewness` accepts a `biased` flag. Passing `true` returns the biased coefficient, the population moment ratio `m3 / m2^(3/2)`, which is what R reports and what `scipy.stats.skew` returns by default. The existing adjusted Fisher-Pearson coefficient stays the default and is unchanged, so this is opt-in. Closes #167.
