---
"simple-statistics": minor
---

Add `weightedLinearRegression`, which fits a line by [weighted least squares](https://en.wikipedia.org/wiki/Weighted_least_squares), the same thing R's `lm()` does when given a `weights` argument. `linearRegression` is the special case where every weight is equal, and it is unchanged. Validation reuses the same helper as the other weighted functions. Closes #48.
