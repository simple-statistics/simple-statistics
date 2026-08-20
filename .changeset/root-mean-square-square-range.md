---
"simple-statistics": patch
---

Fix `rootMeanSquare` returning `Infinity` or `0` for inputs whose root mean square is perfectly representable. Squaring leaves floating-point range well before the result does, so `[1e200]` squared to `Infinity` and returned `Infinity` instead of `1e200`, and `[1e-200]` squared to `0` and returned `0` instead of `1e-200`. When the sum of squares overflows or underflows, the values are now divided through by the largest magnitude before squaring and the result scaled back, so the answer stays in range. Inputs whose squares are representable keep their exact previous result, and an all-zero input still returns `0`.
