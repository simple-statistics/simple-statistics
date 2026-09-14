---
"simple-statistics": patch
---

Fix `jenks` putting the same data in different classes when every value is shifted by a constant. `jenksMatrices` accumulated over raw values and computed variance as `sumSquares - (sum * sum) / w`, which cancels away almost all significance at timestamp magnitudes; some combinations came out negative, which a sum of squared deviations cannot be. On 12 consecutive millisecond timestamps `jenks` split 7/3/2 where the same values with the offset removed split 4/4/4. Values are now shifted by the median and negatives clamped to zero, as `ckmeans` already does.
