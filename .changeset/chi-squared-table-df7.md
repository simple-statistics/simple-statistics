---
"simple-statistics": patch
---

Correct the chi-squared critical value at 7 degrees of freedom and an upper tail of 0.99. `chiSquaredDistributionTable[7][0.99]` carried 1.25, where the exact value is 1.23904 and rounds to 1.24 at the table's two decimal places. At 1.25 the tabulated upper tail is 0.98973 rather than 0.99. `chiSquaredGoodnessOfFit` compares its statistic against this cell, so a statistic in [1.24, 1.25) was reported as not significant at that level when the correct conclusion is the opposite.
