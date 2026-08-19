---
"simple-statistics": patch
---

Repair JSDoc that misrenders on the documentation site: `quantileRank` and `quantileRankSorted` now document their `value` parameter (it was missing, and the `@returns` description read "value value"), `jenks`'s example is tagged `@example` so it renders as an example instead of leaking into the `@returns` description, and `kMeansCluster`'s documented example output gets the missing comma that made it invalid JavaScript. Documentation-only; runtime behavior is untouched.
