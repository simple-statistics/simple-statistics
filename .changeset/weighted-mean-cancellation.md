---
"simple-statistics": patch
---

Fix `weightedMean` losing precision that `mean` already corrects for. `mean` computes its sum through the Kahan-Babuska algorithm in `sum.js`, but `weightedMean` accumulated `x[i] * weights[i]` in a plain loop with no compensation, so the two disagreed whenever the weighted values suffered catastrophic cancellation: `mean([1e16, 1, -1e16])` is `0.3333333333333333`, the correct value, while `weightedMean([1e16, 1, -1e16], [1, 1, 1])` returned `0`. `weightedMean` now builds the array of weighted values and passes it through the existing `sum`, so equal-weight input matches `mean` exactly, including under cancellation. `weightedVariance` has the same unguarded accumulation and is not addressed here.
