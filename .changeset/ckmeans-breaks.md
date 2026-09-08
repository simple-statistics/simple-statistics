---
"simple-statistics": minor
---

Add `ckmeansBreaks(x, nClasses)`, returning Ckmeans clustering results as class breaks in the same `[min, ...breaks, max]` shape `equalIntervalBreaks` uses, so the two are easy to compare. Requested in #273: `ckmeans` itself returns clusters, which is inconvenient when the caller only wants break positions for choropleth-style classification.
