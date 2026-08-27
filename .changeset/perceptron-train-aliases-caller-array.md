---
"simple-statistics": patch
---

Fix `PerceptronModel.train` writing through to the caller's feature array. When the feature length did not match the current weight length, `train` assigned the caller's array to `this.weights` directly, so the weight-update loop mutated the caller's data in place and the model kept sharing identity with that array. `train([1, 2, 3], 0)` left the caller holding `[0, 0, 0]`, and a later write to the caller's array silently rewrote the trained weights. `train` now copies the array, matching the defensive copying already used in `shuffle` and `numericSort`.
