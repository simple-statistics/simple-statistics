---
"simple-statistics": patch
---

Declare that `PerceptronModel#predict` and `PerceptronModel#train` can return `null`. `predict` returns `null` when the feature array's length differs from what the model was trained on, and `train` returns `null` when the label is not 0 or 1 — both since their introduction — but the type declarations promised plain `number` and `PerceptronModel`, so TypeScript consumers under `strictNullChecks` got no warning before dereferencing the result. Runtime behavior is unchanged; only the declarations and docstrings now state the `null` cases.
