---
"simple-statistics": minor
---

Add `tTestPValue` and `tTestTwoSamplePValue`, which return the two-sided p-value for the one-sample and two-sample t-tests. `tTest` and `tTestTwoSample` return the t statistic, which until now had to be looked up in an external table. Both new functions take the same arguments as the test they correspond to, and return `null` when the samples leave no degrees of freedom. The probability comes from the regularized incomplete beta function, `p = I_v/(v+t^2)(v/2, 1/2)`, computed with a continued fraction over the library's existing `gammaln`, so it is exact for any degrees of freedom rather than interpolated from a table. No existing behavior changes.
