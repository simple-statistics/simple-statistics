---
"simple-statistics": patch
---

Correct what `mode`, `modeSorted` and `modeFast` say about ties. All three promised "in the event of a tie, this algorithm will return the most recently seen mode", which none of them does, and they do not agree with each other either. `mode` and `modeSorted` sort their input, so the order values arrived in cannot matter and a tie resolves to the smallest tied value. `modeFast` walks the input keeping a strict maximum, so a tie resolves to whichever value reaches the highest count first: `mode([5, 5, 2, 2])` is `2` while `modeFast([5, 5, 2, 2])` is `5`. Each docstring now states its own rule and points at the difference, since the three are presented as interchangeable. Tests pin all three behaviours; no behaviour changed.
