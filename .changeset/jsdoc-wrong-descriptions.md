---
"simple-statistics": patch
---

Fix JSDoc that describes the wrong thing. `chiSquaredGoodnessOfFit` said it returned a number, but it actually returns a boolean. `combinations` and `combinationsReplacement` said they returned permutations, and the replacement version said _without_ replacement. This is not a functional change, just fixing incorrect docstrings.
