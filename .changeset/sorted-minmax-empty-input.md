---
"simple-statistics": major
---

Fix `minSorted`, `maxSorted` and `extentSorted` silently returning `undefined` (or `[undefined, undefined]`) for empty input, instead of throwing like every other sample-size-sensitive function in the library. `min([])`, `max([])` and `extent([])` already throw `"... requires at least one data point"`, and so do the other sorted-input functions, `modeSorted([])` and `medianSorted([])`; the three fixed here were the only ones that did not. Their `.d.ts` declarations already promised `number` and `[number, number]`, never `undefined`, so the old behavior also contradicted the shipped types. This is breaking for any caller relying on the old `undefined` return.
