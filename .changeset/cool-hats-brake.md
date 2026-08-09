---
"simple-statistics": patch
---

Fix wilcoxon rank-sum test behavior

This fixes a bug in which the tie averaging in `wilcoxonRankSum` was
incorrect and would return an unrelated position.
