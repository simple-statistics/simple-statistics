---
"simple-statistics": minor
---

`tTest` now divides by the sample standard deviation (Bessel's correction), matching the one-sample t statistic in the linked reference, R's `t.test()` and `scipy.stats.ttest_1samp`. Returned statistics are smaller in magnitude than before by `sqrt(n / (n - 1))`, and a sample with fewer than two data points now throws instead of returning `Infinity`.
