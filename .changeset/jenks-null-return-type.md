---
"simple-statistics": patch
---

Declare that `jenks` can return `null`. The implementation returns `null` whenever `nClasses` is greater than the number of data points — since the function's introduction — but the type declaration promised a plain `number[]`, so TypeScript consumers under `strictNullChecks` got no warning before dereferencing the result. Runtime behavior is unchanged; only the declaration and docstring now state the `null` case.
