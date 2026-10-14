---
"simple-statistics": patch
---

Refine `inverseErrorFunction` with Newton's method. It returned only the Winitzki approximation, whose round-trip error through `errorFunction` reaches 3.3e-4 against a test tolerance of 4e-4. `probit`, which is built on it, was correspondingly coarse: `probit(0.975)` returned 1.9572 where the standard normal quantile is 1.9600, and the error grew to 1.0e-2 at `probit(0.999)`. Two Newton steps against `errorFunction` bring the round trip to 8.3e-8 and `probit` to within 5.7e-8 of the published quantiles.
