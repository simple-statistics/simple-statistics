---
"simple-statistics": patch
---

Correct two JSDoc example values that the implementation does not produce: `interquartileRange([0, 1, 2, 3])` returns 1.5 under the type-7 quantile interpolation the library switched to, not the documented 2, and `weightedQuantile([1, 2, 3], [1, 1, 2], 0.5)` returns 2 — the value its own tests assert — not the documented 3. Documentation-only; runtime behavior is untouched.
