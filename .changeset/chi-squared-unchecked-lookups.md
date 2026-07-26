---
"simple-statistics": patch
---

Fix `chiSquaredGoodnessOfFit()` reporting a fit it never measured. Collapsing a sparse class dropped the last class instead of the one that had just been merged, so observations were discarded and others double counted; an observation past the end of the hypothesized distribution had no expected frequency at all, which made the statistic `NaN`; and `criticalValue < NaN` is `false`, the same answer the function gives for a good fit. Degrees of freedom and significance levels the table does not cover now raise a descriptive error instead of a `TypeError` or a silent `false`.
