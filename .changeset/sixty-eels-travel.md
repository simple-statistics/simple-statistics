---
"simple-statistics": patch
---

Quantiles were incorrect when they were interpolating between two elements in the input. They now match type=7, which is the default in numpy.percentile and R's quantile.
