---
"simple-statistics": patch
---

Updated min, max and extent to return NaN if the input contains NaN. This also fixes the result changing depending on where the NaN is in the array.
