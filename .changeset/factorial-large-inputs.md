---
"simple-statistics": patch
---

Return `Infinity` right away from `factorial` for inputs above 170, so `factorial(1e300)`, `factorial(Infinity)` and `gamma(1e300)` no longer run forever.
