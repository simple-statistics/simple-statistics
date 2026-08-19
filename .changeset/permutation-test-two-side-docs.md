---
"simple-statistics": patch
---

Correct `permutationTest`'s JSDoc to name the `alternative` value the implementation accepts. The docs described the two-sided test as `two_tail` and `'two_sided' (default)`, but passing either throws `` `alternative` must be either 'two_side', 'greater', or 'less'. `` — only `'two_side'` is accepted. Documentation-only change; runtime behavior is untouched.
