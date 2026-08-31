---
"simple-statistics": patch
---

Correct `gamma` for small arguments. Nemes' approximation is asymptotic, dividing its terms by powers of `n - 3/4`, so the series stops converging once the argument is small. Applied directly it returned 2.8 for `gamma(1.01)` against a true value of 0.994, and 1.2128 for `gamma(1.1)` against 0.951. Arguments in `(0, 1)` were already lifted by a two-step recurrence; that lift now runs generally, raising the argument until the expansion converges. Worst relative error over `(0, 30]` goes from 1.8 to 1.9e-13, and over `[-11, 0)` from 0.64 to 2.8e-13, since negative arguments reach the expansion through Euler's reflection formula. The two `@example` values for `gamma(11.5)` and `gamma(-11.5)` recorded the old error and have been updated.
