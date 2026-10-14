---
"simple-statistics": minor
---

Add `reservoirSample`, which draws `k` items uniformly at random from an iterable of unknown length in a single pass using O(k) memory. It implements Algorithm L (Li, Kim-Hung, 1994), which skips ahead to the next item that will replace one in the reservoir instead of considering every item. Unlike `sample` and `sampleWithReplacement`, it works over streams and generators, not just arrays.
