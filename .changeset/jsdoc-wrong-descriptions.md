---
"simple-statistics": patch
---

Fix JSDoc that describes the wrong thing. `chiSquaredGoodnessOfFit` declared `@returns {number}` while it returns a boolean, which its own example (`//= false`) and its `.d.ts` already showed. `combinations` and `combinationsReplacement` both declared they return an array of permutations; they return combinations, and order does not matter in either. `combinationsReplacement` also described its `k` as being chosen without replacement, copied from `combinations`, contradicting its own first line. Documentation only.
