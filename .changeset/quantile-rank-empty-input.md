---
"simple-statistics": major
---

fix: `quantileRank` and `quantileRankSorted` now throw on empty input instead of returning `NaN`. Every other function in the library rejects empty input with an error, so the `NaN` propagated silently through downstream arithmetic rather than surfacing at the call site. This is breaking for callers that relied on the `NaN` return.
