---
"simple-statistics": patch
---

Return `NaN` from `min`, `max` and `extent` whenever the input contains `NaN`. Every comparison with `NaN` is false, so the loops skipped a `NaN` unless it was the first value: `max([NaN, 1, 2])` was `NaN` while `max([1, NaN, 2])` was `2`. The result no longer depends on where the `NaN` sits, and it matches `sum`, `mean` and `scaledRootMeanSquare`, which already return `NaN` for such input.
