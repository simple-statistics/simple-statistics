---
"simple-statistics": patch
---

`kMeansCluster`'s documented `@example` calls the function without a `randomSource`, so it falls back to `Math.random` and picks its initial centroids from a random shuffle of the input points. Running the exact example as written matches the documented `{labels: [0, 1], ...}` output only about half the time; the other half it comes back as `{labels: [1, 0], ...}` with the centroids swapped to match. The example now passes a fixed `randomSource`, the same technique the test suite already uses for this function, so it reproduces its documented output every time. Runtime behavior of `kMeansCluster` itself is untouched.
