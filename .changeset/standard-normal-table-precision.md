---
"simple-statistics": patch
---

Correct six entries at the top of `standardNormalTable`. The table is built from a Taylor series truncated at 15 terms, which falls short of four-decimal precision above z = 2.9: `cumulativeStdNormalProbability(3)` returned 0.9986 where the published value is 0.9987, and z = 2.94, 2.96, 2.98, 3.05 and 3.08 were each low by one in the fourth decimal. Thirty terms converge across the whole domain of the table.
