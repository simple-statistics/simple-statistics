---
"simple-statistics": patch
---

Fix `sampleRankCorrelation` returning different results for the same data depending on the order the pairs are listed in. Tied values were given distinct consecutive ranks broken by original array position, rather than sharing the average of the ranks they span as Spearman's rho requires. Reordering rows could change the magnitude and even the sign of the result. Tied values now receive midranks, so the correlation depends only on the paired data. As a consequence an input with no rank variance — every value tied — now correctly returns `NaN` instead of reporting near-perfect correlation. Results for inputs with no ties are unchanged.
