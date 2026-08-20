---
"simple-statistics": patch
---

Fix `geometricMean` returning `Infinity` or `0` for inputs whose geometric mean is perfectly representable. The running product left floating-point range long before the mean did, so 500 values of `1e10` overflowed the product to `Infinity` and returned `Infinity` instead of `1e10`, and 500 values of `1e-10` underflowed it to `0` and returned `0` instead of `1e-10`. The product is now only used when it stays in range; when it overflows or underflows the mean is computed in log space instead, matching the approach `logAverage` already uses for the same quantity. Inputs whose product is representable keep their exact previous result, and an input containing a zero still returns `0`.
