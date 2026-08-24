---
"simple-statistics": patch
---

Correct the chi-squared critical value at 25 degrees of freedom and the 0.10 significance level. `chiSquaredDistributionTable[25][0.1]` carried 34.28 where the exact upper 10% quantile is 34.3816, which rounds to 34.38 at the table's two decimal places. `chiSquaredGoodnessOfFit` compares its statistic against that cell, so a statistic falling between 34.28 and 34.3816 was reported as significant at the 0.10 level when the correct conclusion is that the null hypothesis cannot be rejected. Checking all 407 entries against exact quantiles found this to be the only cell out of step; the neighbouring rows, 33.20 at 24 degrees of freedom and 35.56 at 26, already matched.
